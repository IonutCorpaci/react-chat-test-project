import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: "30% auto 0"}} src={img} alt="Error"/>
    )
}

export default ErrorMessage;