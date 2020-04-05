const express = require('express');
const cors = require('cors')
const http = require('http');
const socket = require('socket.io');
const app = express();
const PORT  = process.env.PORT || 3332;
const messages = [];

app.use(cors())
app.use(express.json());

const server = http.createServer(app);

const io = socket(server)

io.on('connection', client => {
    console.log("new connection");
    client.on('message',(message)=>{
        messages.push({...JSON.parse(message),id:Date.now()})
        io.emit('new_message',messages[messages.length-1])
    })

});

const responses = {}

app.get('/subscribe',(req,res)=>{
    const id = Math.floor(Math.random() * 100000000);
    req.on('close',()=>{
        delete responses[id]
    })
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    res.write('\n');
    responses[id] = res

})

app.post('/messagesSubscribe',(req,res)=>{
    const {body} = req;
    body.id = Date.now()
    messages.push(body);
    Object.keys(responses).forEach((subId) => {
        responses[subId].write(`data: ${JSON.stringify(body)}\n\n`)
        // delete responses[subId]
    })
    res.status(200).end();
})

server.listen(PORT,() => {
    console.log(`listen on port ${PORT}`);
})
