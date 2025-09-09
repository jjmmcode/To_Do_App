import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getTasks = async () =>
    axios.get(`${API_URL}/api/task`, getAuthHeaders());

export const createTask = async (task) =>
    axios.post(`${API_URL}/api/task`, task, getAuthHeaders());

export const updateTask = async (id, task) =>
    axios.put(`${API_URL}/api/task/${id}`, task, getAuthHeaders());

export const deleteTask = async (id) =>
    axios.delete(`${API_URL}/api/task/${id}`, getAuthHeaders());
