import axios from "axios";
import { API_URL } from "../../constant";

class TodoDataService{
    retriveAllTodos(name){
        return axios.get(`${API_URL}/users/${name}/todos`)
    }
    retriveTodo(name,id){
        return axios.get(`${API_URL}/users/${name}/todos/${id}`)
    }
    delteTodo(name,id){
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`)
    }
    updateTodo(name,id,todo){
        return axios.put(`${API_URL}/users/${name}/todos/${id}`,todo)
    }
    createTodo(name,todo){
        return axios.post(`${API_URL}/users/${name}/todos`,todo)
    }
}
useH
export default new TodoDataService()