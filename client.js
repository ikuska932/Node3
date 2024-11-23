let username = prompt("Введите ваше имя:");
socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'join', username }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const messages = document.getElementById('messages');
    const message = document.createElement('div');

    if (data.type === 'info') {
        message.style.color = 'gray';
        message.textContent = data.message;
    } else if (data.type === 'message') {
        message.textContent = `${data.username}: ${data.message}`;
    }
    messages.appendChild(message);
};

function sendMessage() {
    const input = document.getElementById('input');
    if (input.value) {
        socket.send(JSON.stringify({ type: 'message', message: input.value }));
        input.value = '';
    }
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    
    if (data.type === 'info') {
        message.style.color = 'gray';
        message.textContent = data.message;
    } else if (data.type === 'message') {
        message.innerHTML = `<span style="color:${data.color}">${data.username}</span>: ${data.message}`;
    }
    messages.appendChild(message);
};
