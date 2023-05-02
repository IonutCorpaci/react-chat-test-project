import './Messages.css';
import {useEffect, useState} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import ChatService from "../../services/ChatService";
import {Col, Container, Row} from "react-bootstrap";


const Messages = (props) => {
    const [user, setUser] = useState(null);

    const {getUser, error, loading} = ChatService();

    useEffect(() => {
        updateChat();
    }, [props.userId])

    const updateChat = () => {
        const {userId} = props;

        if (!userId) {
            return;
        }

        getUser(userId)
            .then(onUserLoaded);
    };

    const onUserLoaded = (user) => {
        setUser(user);
    };

    const addSms = (messageText) => {

        const newMessage = {
            message: messageText,
            isMy: true
        };

        user.messages.push(newMessage);
    };

    const content = user ? <View user={user} addSms={addSms}/> : <h2 style={{textAlign: 'center', paddingTop: '50%'}}>Select a chat</h2>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <Container className="messagesFirst" style={{height: '100%'}}>
            {errorMessage}
            {spinner}
            {!errorMessage && !spinner ? content : null}
        </Container>
    )
}

const View = (props) => {
    const [sms, setSms] = useState('');
    const [isBtnDisabled, setBtnActive] = useState(true);
    const {user, addSms} = props;
    const {name, image, messages} = user;

    const renderMessages = (arr) => {
        const showMessages = arr.map((item, i) => {
            return (
                <div
                    className={ i === 0 ? 'message' : 'message text-only'}
                    key={i}
                    style={{color: 'black'}}
                >
                    <div className={item.isMy === false ? 'resp' : 'response'}>
                        {i === 0 ? <img src={image} className="photo" alt="user"/> : null}
                        <p className="text" style={{whiteSpace: 'pre-wrap', wordWrap: "break-word"}}>{item.message}</p>
                    </div>
                </div>
            )
        })

        return (
            <Col xs={6} className="messages-chat">
                {showMessages}
            </Col>
        )
    };

    const onSmsChange = (e) => {
        setSms(e.target.value);
    };

    const onSubmitSms = () => {
        if (sms === '') return;
        addSms(sms);
        setSms('');
    };

    const onEnterClick = (e) => {
        if (e.key === 'Enter') {
            onSubmitSms();
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (sms.length > 0) {
            setBtnActive(false);
        } else {
            setBtnActive(true);
        }
    }, [sms]);

    const msg = renderMessages(messages);

    return (
        <Row className="chat flex-column" style={{height: '100%'}}>
            <Col xs={2} className="header-chat">
                <img src={image} style={{
                    marginLeft: '20px',
                    display: 'block',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50px'
                }} alt="USER"/>
                <p className="name">{name}</p>
            </Col>
            {msg}
            <Col xs={4} className="footer-chat">
                <textarea
                    type="text"
                    className="write-message"
                    placeholder="Type your message here"
                    value={sms}
                    onChange={onSmsChange}
                    onKeyDown={onEnterClick}
                >
                </textarea>
                <button disabled={isBtnDisabled} onClick={onSubmitSms} style={{backgroundColor: '#fff', border: 'none'}}>
                    Send
                </button>
            </Col>
        </Row>
    )
}

export default Messages;