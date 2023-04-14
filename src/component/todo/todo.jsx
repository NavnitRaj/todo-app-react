import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LoginComponent from './LoginComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import ToDoComponent from './ToDoComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import ToDoUpdateComponent from './ToDoUpdateComponent.jsx'

export default class TodoApp extends Component{
    render = () =>{
        return (
            <div className="App">
                <Router>
                    <>
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={ToDoUpdateComponent}/>
                            <AuthenticatedRoute path="/todos" component={ToDoComponent}/>
                            <Route path="" component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                    {/* <LoginComponent/>
                    <WelcomeComponent/> */}
            </div>
        )
    }
}
function ErrorComponent(){
    return <div>An Error Occured</div>
}