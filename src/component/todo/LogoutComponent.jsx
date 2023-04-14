import { Component } from "react";
import { withRouter } from "react-router";

class LogoutComponent extends Component{
    render(){
        return(
            <>
                <h1>Logged Out</h1>
                <div className="container">
                    Thank You
                </div>
            </>
        )
    }
}
export default withRouter(LogoutComponent)