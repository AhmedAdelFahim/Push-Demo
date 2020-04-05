import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3332/');
function WS() {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [inputName, setInputName] = useState('')

    useEffect(() => {

        socket.on('new_message',(newMessage)=> {
            setMessages(oldMessages => oldMessages.concat(newMessage))
        })


    }, [])

    const handleChangeMessage = (e) => {
        const {target:{value}} = e
        setInputMessage(value)
    }
    const handleChangeName = (e) => {
        const {target:{value}} = e
        setInputName(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('message',JSON.stringify({name:inputName,content:inputMessage}))
        setInputName('')
        setInputMessage('')
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="name" type="text" id="name" name="name" onChange={handleChangeName}
                       value={inputName}/>
                <input placeholder="message" type="text" id="message" name="message" onChange={handleChangeMessage}
                       value={inputMessage}/>
                <input type="submit" value="Submit"/>
            </form>
            {messages.map((msg)=>{
                return (<div key={msg.id}>{<p><b>{msg.name}: </b> {msg.content}</p>}</div>)
            })}

            <Link to="/sse">SSE Demo</Link>
        </div>
    );
}

export default WS;
