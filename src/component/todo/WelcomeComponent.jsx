import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import HelloWordService from "../../api/todo/HelloWordService";

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            welcomeMsg: ""
        }
        this.retriveWelcomeMsg = this.retriveWelcomeMsg.bind(this)
        this.handleSuccefullResponse = this.handleSuccefullResponse.bind(this)
    }
    render(){
        return(
            <>
                <div className="container mt-2">
                    <h1>Welcome</h1>
                    Welcome {this.props.match.params.name}. You can manage you todos <Link to="/todos">here</Link>
                </div>
                <div className="container mt-2">
                    Click Here
                    <button className="btn btn-success" onClick={this.retriveWelcomeMsg}>Get Msg</button>
                </div>
                <div className="container">
                    {this.state.welcomeMsg}
                </div>
            </>
        )
    }
    retriveWelcomeMsg(){
        HelloWordService.executeHellloWordService()
        .then(response => {
            console.log(response)
            this.handleSuccefullResponse(response)
        })
        .catch(error=>{
            console.log(error.response)
            let errorMessage = ''
            if(error.message) errorMessage += error.message
            if(error.response && error.response.data){
                errorMessage += error.response.data.message
            }
            this.setState({
                welcomeMsg:errorMessage
            })
        })
    }
    handleSuccefullResponse(response){
        this.setState({
            welcomeMsg:response.data.msg
        })
    }
}
export default withRouter(WelcomeComponent)