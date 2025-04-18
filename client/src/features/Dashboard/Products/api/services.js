import axios from 'axios';
const url = 'http://localhost:3030/products';

export async function getProducts() {
    try {
        const response = await axios.get(url, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addProduct(data) {
    try {
        const response = await axios.post(url, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getProduct(id) {
    try {
        const response = axios.get(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateProduct(id, data) {
    try {
        const response = axios.put(`${url}/${id}`, data, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`${url}/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getProdsCategory(id) {
    try {
        const response = await axios.get(`${url}/category/${id}`,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
