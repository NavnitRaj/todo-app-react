import { Component } from "react";
import { withRouter } from "react-router";

class FooterComponent extends Component{
    render(){
        return(
            <div>
                <footer className="footer">
                    <span className="text-muted">All rights reserved 2021 &copy;copyright</span>
                </footer>
            </div>
        )
    }
}
export default withRouter(FooterComponent)