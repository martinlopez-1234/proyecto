/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//Esto es el código JAVASCRIPT del lado del SERVIDOR. Esto simula un server que se comunica con el cliente a traves del
//navegador.

//Sección que importa módulos

//Importo el modula path de node.js
const path = require('path')
//Importo el modulo express
const express = require('express')
//Importo el módulo fs
const fs = require('fs')
//Creo aplicación express
const app = express()


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

//Sección que configura e inicializa el servidor

//Configuro el puerto en el que la aplicación va a escuchar. Uso el valor de PORT por defecto.
//Si no hay nada en PORT, se escucha en el puerto 3000
app.set('port', process.env.PORT || 3000)

//Voy a enviar todos los archivos estaticos y le digo al servidor
//que todos los archivos los voy a enviar al navegador todo lo que este dentro de public
app.use(express.static(path.join(__dirname,'public')))

//Inicializo el servidor
const server = app.listen(app.get('port'),()=> {
    console.log('Servidor en puerto',app.get('port'))
})

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

//Sección que configura los webSockets

//Importo el modulo socket.io, que me permite crear objetos de tipo io que me facilitan
//el uso del websocket
const SocketIO = require('socket.io')
//Configo socketio que hace la comunicación bidireccional
const io = SocketIO(server)

//Uso y configuración del websocket
io.on('connection',(socket) => {//Lo que dice cuando alguien se conecte se ejecuta este codigo
    console.log('Nueva conexion',socket.id)
    //Ahora digo, escucha el evento que envia el servidor

    socket.on('chat:message', (data) => {//El servidor recibe los datos que le pasa el
        //parámetro chat:message
        console.log(data)//Imprime por pantalla lo que hay dentro de la variable data
        //a todos los clientes que estan conectados, les emito un evento
        io.sockets.emit('chat:message',data)//Envía al cliente lo que hay
        //dentro de la variable data
    })
    //Con esto le digo al servidor, cuando escuches este evento envialo a todos los usuarios
    //excepto el que esta del lado del servidor
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing',data)
    })


})




