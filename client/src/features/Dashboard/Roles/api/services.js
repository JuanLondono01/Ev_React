import axios from 'axios';
const url = 'http://localhost:3030/Roles';

export async function getRoles() {
    try {
        const response = await axios.get(url, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addRole(data) {
    try {
        const response = await axios.post(url, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getRole(id) {
    try {
        const response = axios.get(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateRole(id, data) {
    try {
        const response = axios.put(`${url}/${id}`, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function deleteRole(id) {
    try {
        const response = await axios.delete(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
