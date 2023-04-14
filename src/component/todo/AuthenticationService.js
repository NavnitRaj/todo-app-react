import axios from "axios"
import { API_URL, USER_NAME_SESSION_ATTR_NAME } from "../../constant"



class AuthenticationService{

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicauth`,{
            headers:{
                authorization: this.createBasicAuthToken(username,password)
            }
        })
    }

    executeJWTAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`,{
            username: username,
            password: password
        })
    }

    createBasicAuthToken(username,password){
        return 'Basic '+ window.btoa(username+":"+password)
    }

    registerSuccessfullLogin(username,password){
        console.log("Added")
        sessionStorage.setItem(USER_NAME_SESSION_ATTR_NAME,username)
        this.setupAxiosInterceptor(this.createBasicAuthToken(username,password))
    }
    registerSuccessfullLoginJWT(username,token){
        console.log("Added")
        sessionStorage.setItem(USER_NAME_SESSION_ATTR_NAME,username)
        this.setupAxiosInterceptor(this.createJWTToken(token))
    }
    createJWTToken(token){
        return 'Bearer '+ token
    }
    logout(){
        console.log("Removed")
        sessionStorage.removeItem(USER_NAME_SESSION_ATTR_NAME)
        return axios.get(`${API_URL}/logout`)
    }
    isUserLoggedIn(){
        let user= sessionStorage.getItem(USER_NAME_SESSION_ATTR_NAME)
        if(user === null){
            return false
        }
        return true
    }
    getUser(){
        let user= sessionStorage.getItem(USER_NAME_SESSION_ATTR_NAME)
        return user;
    }

    setupAxiosInterceptor(basicAuthHeader){
        console.log("Auth: "+basicAuthHeader)
        axios.interceptors.request.use((config)=>{
            if(this.isUserLoggedIn){
                config.headers.authorization = basicAuthHeader
            }
            return config
        })
    }
}

export default new AuthenticationService()