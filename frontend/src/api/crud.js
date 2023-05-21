import axios from 'axios';

const API_URL = "http://localhost:8080";

//create function to post data to api
export const createTodo = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/todos`, data);
        //log
    } catch (error) {
        throw error;
    }
}

//create function to get data from api
export const readTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//create function to update data to api
export const updateTodo = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/todos/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//create function to delete data from api
export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/todos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


