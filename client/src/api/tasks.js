import axios from './axios'

export const getTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = (id) => axios.get(`/task/${id}`)
export const createTaskRequest = (task) => axios.post('/tasks', task)
export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`)
export const updateTaskRequest = (id, task) => axios.put(`/task/${id}`, task)