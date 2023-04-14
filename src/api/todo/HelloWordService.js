import axios from "axios";
import { Component } from "react";
import { API_URL } from "../../constant";

class HelloWordService extends Component{
    executeHellloWordService(){
       
        return axios.get(`${API_URL}/basicauth`)
    }
}
export default new HelloWordService()