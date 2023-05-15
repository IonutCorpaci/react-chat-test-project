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
            .then(chatList => {
                setChat(chatList)
                props.getDataFromChild(chatList);
            });
    }, [])

    const chatsRef = useRef([]);

    const focusOnChat = (id) => {
        chatsRef.current.forEach(item => item.classList.remove('message-active'));
        chatsRef.current[id].classList.add('message-active');
        chatsRef.current[id].focus();
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const messageArr = item.messages[item.messages.length - 1].message;
            return (
                <div
                    className="discussion d-flex align-items-center"
                    ref={el => chatsRef.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onUserSelected(item.id);
                        focusOnChat(i);
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