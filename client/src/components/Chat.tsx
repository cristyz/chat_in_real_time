import React, { useState, useEffect, EffectCallback } from 'react';
import { useRef } from 'react';
import Particles from 'react-particles-js';
import { io } from 'socket.io-client'
import { v4 } from 'uuid'

// Interfaces 
import InterfaceMessages from '../interfaces/interface.msg'

// Socket Configuration
const socket = io('http://192.168.1.9:8888/', { transports: ['websocket'] })
socket.on('connect', () => {
    console.log('[IO] Connected!')
})

let myId: String | null = localStorage.getItem('myID') || ''

const Chat = () => {
    const [myName] = useState<any>(localStorage.getItem('myName'))
    const [myMessage, setMyMessage] = useState('')
    const [chatMessages, setChatMessages] = useState<Array<InterfaceMessages>>([])
    const [colorBubbles, setColorBubbles] = useState('#fff')

    const scrollUl = useRef<HTMLUListElement>(null)

    useEffect((): ReturnType<EffectCallback> => {
        const handleAllMessages = (msg: Array<InterfaceMessages>) => {
            setChatMessages([...msg])
            if (msg.length > 0) {
                if (msg[msg.length - 1].id === myId)
                    setColorBubbles('#5858fc')
                else
                    setColorBubbles('#378537')
            }
        }

        socket.on('chat.message', handleAllMessages)

        if (!myId)
            setMyID()

        return (): any => socket.off('chat.message', handleAllMessages)
    }, [chatMessages])

    const handleSentMyMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const mySendMessage: InterfaceMessages = {
            name: myName,
            message: myMessage,
            id: myId || null,
        }
        socket.emit('chat.message', mySendMessage)
        setMyMessage('')
    }
    const setMyID = () => {
        localStorage.setItem('myID', v4())
        myId = localStorage.getItem('myID')
    }

    const particlesConfig = {
        fullScreen: {
            enable: true,
            zIndex: 10
        },
        particles: {
            color: {
                value: colorBubbles
            },
            size: {
                value: 10,
                random: true,
            },
        },
    }

    return (
        <div className="container_all">
            <Particles params={particlesConfig} />
            <ul className='list_ul' ref={scrollUl}>
                {chatMessages.map((msg: InterfaceMessages) => (
                    <li className={msg.id === myId ? 'list_li_my' : 'list_li_outher'} key={Math.random()}>
                        <span>{msg.name}:</span>
                        <span>{msg.message}</span>
                    </li>
                ))}
            </ul>
            <form className='form_message' onSubmit={handleSentMyMessage}>
                <input
                    type="text"
                    value={myMessage}
                    onChange={e => setMyMessage(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Chat;
