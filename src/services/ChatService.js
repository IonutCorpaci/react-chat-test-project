import {useHttp} from "../hooks/http.hook";

const ChatService = () => {

    const {request, loading, error} = useHttp();

    const getAllUsers = async () => {
        const res = await request(`http://localhost:3000/data`);
        return res;
    }

    const getUser = async (id) => {
        const res = await request('http://localhost:3000/data');
        return res.find(user => user.id === id);
    }

    return {
        loading,
        error,
        getAllUsers,
        getUser
    }
}

export default ChatService;