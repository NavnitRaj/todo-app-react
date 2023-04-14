import { Component } from "react";
import { Redirect, Route, withRouter } from "react-router";
import AuthenticationService from "./AuthenticationService";

class AuthenticatedRoute extends Component{
    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return <Route {...this.props}/>
        }
        return(
            <Redirect to="/login" />
        )
    }
}

export default withRouter(AuthenticatedRoute)