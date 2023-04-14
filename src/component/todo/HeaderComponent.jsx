import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const user = AuthenticationService.getUser();
        console.log(isUserLoggedIn)
        return(
            <header id="header">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><Link to="/todos" className="navbar-brand">Todo</Link></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link to={`/welcome/${user}`}  className="nav-link">Home</Link></li>}
                        {isUserLoggedIn && <li><Link to="/todos" className="nav-link">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link to="/"  className="nav-link">Login</Link></li>}
                        {isUserLoggedIn && <li><a href="/logout"  className="nav-link" onClick={AuthenticationService.logout}>Logout</a></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)