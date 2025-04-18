import axios from 'axios';

export async function login(data) {
    try {
        const response = await axios.post('http://localhost:3030/login', data, {withCredentials: true});
        return response;
    } catch (error) {
        console.error(error);
    }
}
