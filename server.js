const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

const PORT = 8080
const connectedServer = httpServer.listen(PORT, function() {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

//evento de conexion 
/*
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
}); */

io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});