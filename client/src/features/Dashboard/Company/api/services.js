import axios from 'axios';
const url = 'http://localhost:3030/companies';

export async function getCompanies() {
    try {
        const response = await axios.get(url,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addCompany(data) {
    try {
        const response = await axios.post(url, data,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getCompany(id) {
    try {
        const response = axios.get(`${url}/${id}`,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateCompany(id, data) {
    try {
        const response = axios.put(`${url}/${id}`, data,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export async function deleteCompany(id) {
    try {
        const response = await axios.delete(`${url}/${id}`,{withCredentials: true});
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
