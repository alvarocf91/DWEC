const express = require('express');
const mysql = require('mysql2');
const md5 = require('md5');
const session = require('cookie-session');
const app = express();

const db = mysql.createConnection({
    host: 'portafolios.cbx2fk7rwusr.us-east-1.rds.amazonaws.com',
    user: 'alvarocf91',
    password: 'macarrones', 
    database: 'Portfolio'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos RDS');
    }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    name: 'session', 
    keys: ['secreto-ejer-19'],
    maxAge: 24 * 60 * 60 * 1000 
}));

app.use((req, res, next) => {
    res.locals.userSession = req.session;
    next();
});

app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});


app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
    [username, email, md5(password)], (err) => {
        if (err) return res.status(500).send("Error al registrar usuario");
        res.redirect('/login');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
    [username, md5(password)], (err, results) => {
        if (err) return res.status(500).send("Error en el servidor");
        if (results.length > 0) {
            req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/dashboard');
        } else { 
            res.send("Usuario o contraseña incorrectos"); 
        }
    });
});


app.get('/portfolio/:username', (req, res) => {
    db.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, users) => {
        if (err || users.length === 0) return res.status(404).send("Usuario no encontrado");
        
        const user = users[0];
        db.query('SELECT * FROM projects WHERE user_id = ?', [user.id], (err, projects) => {
            db.query('SELECT * FROM social_links WHERE user_id = ?', [user.id], (err, links) => {
                res.render('public_portfolio', { 
                    user, 
                    projects: projects || [], 
                    links: links || [] 
                });
            });
        });
    });
});


app.get('/dashboard', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');

    db.query('SELECT * FROM users WHERE id = ?', [req.session.userId], (err, users) => {
        if (err || users.length === 0) return res.redirect('/logout');
        
        db.query('SELECT * FROM projects WHERE user_id = ?', [req.session.userId], (err, projects) => {
            db.query('SELECT * FROM social_links WHERE user_id = ?', [req.session.userId], (err, links) => {
                res.render('dashboard', { 
                    user: users[0], 
                    projects: projects || [], 
                    links: links || [] 
                });
            });
        });
    });
});

app.post('/update-profile', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const { email, bio, photo } = req.body;
    db.query('UPDATE users SET email = ?, bio = ?, photo = ? WHERE id = ?', 
    [email, bio, photo, req.session.userId], (err) => {
        res.redirect('/dashboard');
    });
});

app.post('/add-link', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    db.query('INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)', 
    [req.body.platform, req.body.url, req.session.userId], (err) => {
        res.redirect('/dashboard');
    });
});

app.post('/delete-link', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    db.query('DELETE FROM social_links WHERE id = ? AND user_id = ?', 
    [req.body.id, req.session.userId], (err) => {
        res.redirect('/dashboard');
    });
});

app.post('/add-project', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const { title, description, repo_url, live_url } = req.body;
    db.query('INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?,?,?,?,?)', 
    [title, description, repo_url, live_url, req.session.userId], (err) => {
        res.redirect('/dashboard');
    });
});

app.post('/delete-project', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    db.query('DELETE FROM projects WHERE id = ? AND user_id = ?', 
    [req.body.id, req.session.userId], (err) => {
        res.redirect('/dashboard');
    });
});

app.get('/logout', (req, res) => { 
    req.session = null; 
    res.redirect('/login'); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento: http://localhost:${PORT}`);
});