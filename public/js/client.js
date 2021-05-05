//Calling the Function of Socket
const socket = io();

//Creating the user who will write the message.
var userName;
var messageArea = document.querySelector('.message__area');
var text = document.querySelector('#textarea');

//The Prompt will not go unless and until the user types his name
do {
    userName = prompt("Kindly Enter your Name: ");
}
while (!userName);

//When enter is pressed, a new Function *SendMessage* will be triggered
$("#textarea").on("keyup", function (e) {
    if (e.key == "Enter") {
        sendMessage(e.target.value);
    }
});

//Function or Logic to send the message with the user name.
function sendMessage(msgSent) {
    let msg = {
        user: userName,
        message: msgSent.trim()
    }

    appendMessage(msg, "outgoing");
    text.value = "";
    scrollToBottom();

    //Socket
    socket.emit('message', msg)

}

//Logic to append the message in the message area
function appendMessage(msg, typeOfMessage) {
    let messageAreaDiv = document.createElement('div');
    let className = typeOfMessage;
    messageAreaDiv.classList.add(className, 'message');

    let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
`
    messageAreaDiv.innerHTML = markup;

    messageArea.appendChild(messageAreaDiv);

}


//Receiving the Message
socket.on('message', function (msg) {
    appendMessage(msg, "incoming");
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}