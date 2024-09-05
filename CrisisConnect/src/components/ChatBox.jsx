import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

const ChatBox = ( title ) => {
    const messageBoxRef = useRef();
    const isadmin = useRef(false);
    const [message, setMessage] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    useEffect(() => {
            getAllMessages();
            setMessage(false);
    }, [message]);
        setInterval(() => {
            setMessage(true);
        }, 1000);
    const buttonHide = () => {
        setIsVisible(true);
        setBtnVisible(false);
    };

    const handleHideAlert = () => {
        setIsVisible(false);
        setBtnVisible(true);
    };

    const handleMessage = async () => {
        const msgBox = document.querySelector('.sendmsg');
        const obj = { sender: title.sender, messege: msgBox.value };
        const res = await fetch('http://localhost:5000/chat-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const r = await res.json();
        if (r.chat) {
            messageBoxRef.innerHTML+=`<p class='sending'>${msgBox.value}</p>`
            msgBox.value = ''
        }
    };

    const getAllMessages = async () => {
        const obj = { sender: title.sender};
        const res = await fetch('http://localhost:5000/chat-get',{method:"POST",headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(obj)});
        const mes = await res.json();
        const sending = messageBoxRef.current;
        if(sending!=undefined){
        sending.innerHTML=''
        if (mes.chat) {
            for (let i = 0; i < mes.messege.length; i++) {
                if(title.sender==='user'){
                if (mes.messege[i].sender === 'user') {
                    sending.innerHTML += `<p class='sending'>${mes.messege[i].messege}</p>`;
                } else {
                    sending.innerHTML += `<p class='reply'>${mes.messege[i].messege}</p>`;
                }
            }
            else{
                if (mes.messege[i].sender === 'user') {
                    sending.innerHTML += `<p class='reply'>${mes.messege[i].messege}</p>`;
                } else {
                    sending.innerHTML += `<p class='sending'>${mes.messege[i].messege}</p>`;
                }
            }
            }
        }
    }
    };
   if(title.sender==='admin'){
    isadmin.current=true
   }
   const back_to_selection=()=>{
    title.selection(false)
   }
    return (
        <>
                <div className="absolute bottom-10 right-10">
                    {isVisible && (
                        <div className="chatbox h-96 w-80 bg-white">
                            <div className="chatbox-header flex items-center justify-between px-4 py-2 mb-2 border-b bg-blue-300">
                              {isadmin.current && <button onClick={back_to_selection} className="backbtn">
                              back
                                </button>}
                                <h3>Chat</h3>
                                <button onClick={handleHideAlert} className="text-red-700 chatbtn">
                                    X
                                </button>
                            </div>
                            <div className="messages flex" ref={messageBoxRef}></div>
                            <div className="send flex gap-4">
                                <input className="sendmsg" placeholder="Enter Message" />
                                <button className="sndbtn" onClick={handleMessage}>
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                    {btnVisible && (
                        <button onClick={buttonHide} className="bg-blue-300 chat border-none rounded-xl w-24 h-12 shadow-xl shadow-slate-800 cursor-pointer">
                            <h3>Chat Now</h3>
                        </button>
                    )}
                </div>
        </>
    );
};

export default ChatBox;
