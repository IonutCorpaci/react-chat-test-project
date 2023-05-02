import './Chats.css'
import {useEffect, useState, useRef} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import ChatService from "../../services/ChatService";

const Chats = (props) => {

    const [chat, setChat] = useState([]);

    const {getAllUsers, loading, error} = ChatService();

    useEffect(() => {
        getAllUsers()
            .then(onChatsLoaded)
    }, [])

    const newUser = {
        name: "Man Grilish",
        messages: [
            {
                message: "Hi Johny",
                isMy: false
            },
            {
                message: "No Wanna do leg day?",
                isMy: false
            }
        ],
        image: "https://cdn.vox-cdn.com/thumbor/ocipv9cIDdXEdl4DyRM43hQRIKo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22781257/1333254883.jpg"

    }

    // useEffect(() => {
    //     fetch('http://localhost:3000/data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newUser),
    //     })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, [])

    const onChatsLoaded = (chatList) => {
        setChat(chatList)
    }

    const chatsRef = useRef([]);

    const focusOnChat = (id) => {
        chatsRef.current.forEach(item => item.classList.remove('message-active'));
        chatsRef.current[id].classList.add('message-active');
        chatsRef.current[id].focus();
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const messageArr = item.messages[item.messages.length - 1].message
            return (
                <div
                    className="discussion d-flex align-items-center"
                    ref={el => chatsRef.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onUserSelected(item.id);
                        focusOnChat(i)
                    }}
                >
                    <img src={item.image} alt="userLogo" className="photo"/>
                    <div className="desc-contact">
                        <p className="name">{item.name}</p>
                        <p className="message">
                            {
                                messageArr.length > 30 ? `${messageArr.slice(0, 30)}...` : messageArr
                            }
                        </p>
                    </div>
                </div>
            )
        })

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="chats">
                <h1 className="chat_title">Chats</h1>
                {errorMessage}
                {spinner}
                {items}
            </div>
        )
    }

    const items = renderItems(chat);

    return (
        <div style={{height: '100%'}}>
            {items}
        </div>
    )
}

export default Chats;