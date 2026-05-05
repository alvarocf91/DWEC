const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

const db = mysql.createConnection({
    host: 'biblioteca.cbx2fk7rwusr.us-east-1.rds.amazonaws.com',
    user: 'alvarocf91',
    password: 'Biblioteca123',
    database: 'Biblioteca', 
});

db.connect(err => {
    if (err) {
        console.error('ERROR DE CONEXIÓN A MYSQL:', err.message);
        process.exit(1);
    }
    console.log('Conectado a MySQL con éxito');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    db.query('SELECT * FROM libros', (err, libros) => {
        if (err) {
            console.error("Error en SELECT /:", err.message);
            return res.status(500).send("Error al cargar libros: " + err.message);
        }
        res.render('index', { libros });
    });
});

app.get('/prestados', (req, res) => {
    const sql = `
        SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
        FROM libros l
        JOIN prestamos p ON l.id = p.libro_id
        WHERE l.estado = 'Prestado' AND p.fecha_entrega IS NULL
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en consulta /prestados: ' + err.message);
        res.render('prestados', { libros: result });
    });
});

app.get('/prestamos/usuario', (req, res) => {
    const nombre = req.query.nombre;
    if (!nombre) return res.status(400).send('Nombre requerido');

    const sql = `
        SELECT l.titulo, l.autor, p.fecha_devolucion
        FROM prestamos p
        JOIN libros l ON l.id = p.libro_id
        WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL
    `;

    db.query(sql, [nombre], (err, result) => {
        if (err) return res.status(500).send('Error DB Usuario: ' + err.message);
        res.render('usuario', { prestamos: result, nombre });
    });
});

app.get('/libro/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM libros WHERE id = ?', [id], (err, libroResult) => {
        if (err) return res.status(500).send('Error al buscar libro: ' + err.message);
        if (libroResult.length === 0) return res.status(404).send('Libro no encontrado');

        const libro = libroResult[0];

        db.query('SELECT * FROM prestamos WHERE libro_id = ?', [id], (err, historial) => {
            if (err) return res.status(500).send('Error historial: ' + err.message);

            db.query(
                'SELECT * FROM prestamos WHERE libro_id = ? AND fecha_entrega IS NULL',
                [id],
                (err, activo) => {
                    if (err) return res.status(500).send('Error préstamo activo: ' + err.message);

                    res.render('libro', {
                        libro,
                        historial,
                        prestamoActivo: activo[0]
                    });
                }
            );
        });
    });
});

app.get('/prestamo/formulario/:libro_id', (req, res) => {
    res.render('prestamo_form', { libro_id: req.params.libro_id });
});

app.post('/prestamo/nuevo', (req, res) => {
    const { libro_id, nombre, fecha_devolucion } = req.body;

    if (!nombre || !fecha_devolucion) return res.send('Datos incompletos');

    const sql = `
        INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
        VALUES (?, ?, CURDATE(), ?)
    `;

    db.query(sql, [libro_id, nombre, fecha_devolucion], err => {
        if (err) return res.status(500).send('Error al crear préstamo: ' + err.message);

        db.query(
            "UPDATE libros SET estado='Prestado' WHERE id=?",
            [libro_id],
            err => {
                if (err) return res.status(500).send('Error al actualizar estado: ' + err.message);
                res.redirect(`/libro/${libro_id}`);
            }
        );
    });
});

app.post('/prestamo/devolver/:libro_id', (req, res) => {
    const libro_id = req.params.libro_id;

    db.query(
        `UPDATE prestamos 
         SET fecha_entrega = CURDATE()
         WHERE libro_id = ? AND fecha_entrega IS NULL`,
        [libro_id],
        err => {
            if (err) return res.status(500).send('Error al registrar entrega: ' + err.message);

            db.query(
                "UPDATE libros SET estado='Disponible' WHERE id=?",
                [libro_id],
                err => {
                    if (err) return res.status(500).send('Error al liberar libro: ' + err.message);
                    res.redirect(`/libro/${libro_id}`);
                }
            );
        }
    );
});

// 7. Vista de Libros Vencidos
app.get('/vencidos', (req, res) => {
    const sql = `
        SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
        FROM prestamos p
        JOIN libros l ON l.id = p.libro_id
        WHERE p.fecha_devolucion < CURDATE() AND p.fecha_entrega IS NULL
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error en consulta /vencidos: ' + err.message);
        res.render('vencidos', { libros: result });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});