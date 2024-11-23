let clients = [];

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            ws.username = data.username;
            clients.push(ws);

            const welcomeMessage = clients.length === 1
                ? `Добро пожаловать. Вы первый в чате.`
                : `Добро пожаловать. В чате уже присутствуют: ${clients.map(client => client.username).join(', ')}`;
            
            ws.send(JSON.stringify({ type: 'info', message: welcomeMessage }));
            broadcast({ type: 'info', message: `К нам присоединился ${data.username}` }, ws);
        } else if (data.type === 'message') {
            broadcast({ type: 'message', username: ws.username, message: data.message });
        }
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        broadcast({ type: 'info', message: `${ws.username} нас покинул.` });
    });
});

function broadcast(data, sender) {
    clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

server.on('connection', (ws) => {
    ws.color = getRandomColor();
    
});
