import {useHttp} from "../hooks/http.hook";

const ChatService = () => {

    const {request, loading, error} = useHttp();

    const getAllUsers = async () => {
        const res = await request(`http://localhost:3000/data`);
        return res;
    }

    return {
        loading,
        error,
        getAllUsers
    }
}

export default ChatService;