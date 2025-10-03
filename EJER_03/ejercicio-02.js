const playlist = [
  { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
  { titulo: "Billie Jean", artista: "Michael Jackson", duracion: 294 },
  { titulo: "Shape of You", artista: "Ed Sheeran", duracion: 263 },
  { titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: 301 },
  { titulo: "Rolling in the Deep", artista: "Adele", duracion: 228 },
  { titulo: "Lose Yourself", artista: "Eminem", duracion: 326 },
  { titulo: "Blinding Lights", artista: "The Weeknd", duracion: 200 },
  { titulo: "Hotel California", artista: "Eagles", duracion: 391 },
  { titulo: "Hey Jude", artista: "The Beatles", duracion: 431 },
  { titulo: "Uptown Funk", artista: "Mark Ronson ft. Bruno Mars", duracion: 269 }
];

const cancionesLargas = playlist.filter(cancion =>cancion.duracion>180);
const mensajes = cancionesLargas.map(cancion => `La canción '${cancion.titulo}' de ${cancion.artista} dura ${cancion.duracion} segundos.`);
console.log(mensajes);