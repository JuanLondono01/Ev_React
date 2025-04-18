import axios from 'axios';
const url = 'http://localhost:3030/categories';

export async function getCategories() {
    try {
        const response = await axios.get(url, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addCategory(data) {
    try {
        const response = await axios.post(url, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getCategory(id) {
    try {
        const response = axios.get(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateCategory(id, data) {
    try {
        const response = axios.put(`${url}/${id}`, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function deleteCategory(id) {
    try {
        const response = await axios.delete(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
