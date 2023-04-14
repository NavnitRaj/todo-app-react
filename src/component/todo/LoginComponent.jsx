import { Component } from "react"
import { withRouter } from "react-router"
import AuthenticationService from "./AuthenticationService"

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : 'asc',
            password : '',
            success : false,
            fail: false
        }
        this.handlefieldChange = this.handlefieldChange.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }
    
    handlefieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    loginClick(){
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(()=>{
        //     AuthenticationService.registerSuccessfullLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // })
        // .catch(()=>{
        //     this.setState({fail: true,success: false})
        // })
        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then((response)=>{
            AuthenticationService.registerSuccessfullLoginJWT(this.state.username,response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        })
        .catch(()=>{
            this.setState({fail: true,success: false})
        })
    }
    
    render(){
        return (
            <>
                {/* <ShowMessage message={this.state}/> */}
                <h1>Login</h1>
                <div className="container mt-3">
                    {this.state.success && <div>Login success</div>}
                    {this.state.fail && <div className="alert alert-warning">Login fail</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handlefieldChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handlefieldChange}/>
                    <button className="btn btn-success ml-2" onClick={this.loginClick}>Login</button>
                </div>
            </>
        )
    };

}
export default withRouter(LoginComponent)