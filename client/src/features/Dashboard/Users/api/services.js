import axios from 'axios';
const url = 'http://localhost:3030/users';

export async function getUsers() {
    try {
        const response = await axios.get(url, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addUser(data) {
    try {
        const response = await axios.post(url, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getUser(id) {
    try {
        const response = axios.get(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateUser(id, data) {
    try {
        const response = axios.put(`${url}/${id}`, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function deleteUser(id) {
    try {
        const response = await axios.delete(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
