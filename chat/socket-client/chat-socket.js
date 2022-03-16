const socket = io('http://localhost:3000');

const messages = document.getElementById('messages');
const message = document.getElementById('message');

const handleSubmitNewMessage = () => {
    socket.emit('message', { data: message.value });
}

socket.on('message', ({ data }) => {
    handleNewMessage(data);
});

const handleNewMessage = (message) => {
    messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
    const li = createElement("li");
    li.appendChild(document.createTextNode(message));
    return li;
}