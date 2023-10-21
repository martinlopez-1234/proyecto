/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//Este archivo representa el código JAVASCRIPT que se ejecuta del lado del CLIENTE
////////////////////////////////////////////////////////////////////////////////////
//En esta sección creo una instancia de un objeto del tipo socket que es el que 
//mantiene abierta de manera constante el servidor

//Esta línea establece una conexión de WebSocket con el servidor.
//io() es una función proporcionada por la biblioteca Socket.IO
//que se conecta automáticamente al servidor que sirve a la página HTML con la que 
//se conecta
const socket = io()//Socket que mantiene la coexion abierta al servidor

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//Funciones del Dom(Document Object model) Con estas funciones JavaScript, me permite interactuar con el archivo HTML

//Funciones que me permite capturar datos de un id de HTML y aplicarles la función getElementById('message')
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//Operaciones de envío y recepción de mensajes con el servidor


//Evento que captura el click, cuando el usuario hace clik en el boton
btn.addEventListener('click',function (){
    //Esta sentencia emite los datos al servidor por parte del cliente
    socket.emit('chat:message',{//chat:message es el nombre del evento creado
        message: message.value,//mensaje enviado al servidor
        username: username.value//nombre de usuario enviado al servidor
    })         
})

//Agrego mensaje que registra evento que muestra si el usuario esta tipeando
message.addEventListener('keypress',function(){
    socket.emit('chat:typing',username.value)//Con esto paso el nombre del usuario tipeando
})




//Con socket.on, puedo escuchar los datos que vienen del servidor
socket.on('chat:message', function (data){
    //Limpio el mensaje dentro del cliente, para que este más limpio el chat
    actions.innerHTML = ''
    //Selecciono la variable output que es la que me va a permitir enviar mensajes del 
    //lado del cliente
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})
//Escucho datos del evento que se genera cuando el usuario tipea 
socket.on('chat:typing', function (data){
    //Cuando escucho el evento, dentro de actions
    actions.innerHTML= `<p><em>${data} is typing a message.</em>
    </p>`

})
