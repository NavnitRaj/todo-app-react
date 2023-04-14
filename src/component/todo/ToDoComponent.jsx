import moment from "moment";
import { Component } from "react"
import { withRouter } from "react-router";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TODoComponent extends Component{
    
    constructor(props){
        console.log("constructor")
        super(props)
        this.state = {
            todos: [],
            message: ''
        }
        this.deleteTodoClick = this.deleteTodoClick.bind(this)
        this.updateTodoClick = this.updateTodoClick.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }
    componentDidMount(){
        console.log("componentDidMount")
        this.refreshTodos()
    }
    componentWillUnmount(){
        console.log("componentWillUnmount")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        return true
    }
    deleteTodoClick(id){
        TodoDataService.delteTodo(AuthenticationService.getUser(),id)
        .then(response=>{
            this.setState({message:`Delete of todo ${id} successfull.`})
            this.refreshTodos()
        })
    }
    updateTodoClick(id){
        this.props.history.push(`/todos/${id}`)
    }
    refreshTodos(){
        TodoDataService.retriveAllTodos(AuthenticationService.getUser())
        .then(response => {
            this.setState({
                todos: response.data
            })
        })
    }
    addTodo(){
        this.props.history.push('/todos/-1')
    }
    render(){
        console.log("render")
        return(
            <div id="body">
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Iscomplted</th>
                                <th>TargetDate</th>
                                <th>Delete/Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map( todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.updateTodoClick(todo.id)}>Update</button>
                                            <button className="btn btn-danger ml-2" onClick={() => this.deleteTodoClick(todo.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodo}>Add</button>
                    </div>
                </div> 
            </div>
        )
    }
}
export default withRouter(TODoComponent)