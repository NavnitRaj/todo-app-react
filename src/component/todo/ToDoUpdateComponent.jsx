import { Form, Formik, Field, ErrorMessage } from "formik";
import moment from "moment";
import { Component } from "react";
import { withRouter } from "react-router";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";


class ToDoUpdateComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "ABC ml",
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            done: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }


    onSubmit(values){
        if(this.state.id===-1){
            TodoDataService.createTodo(AuthenticationService.getUser(),{
                description: values.description,
                targetDate: values.targetDate
            }).then(res=>{
                this.props.history.push(`/todos/`)
            }).catch(err=>console.log(err))
        }else{
            TodoDataService.updateTodo(AuthenticationService.getUser(),this.state.id,{
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(res=>{
                this.props.history.push(`/todos/`)
            }).catch(err=>console.log(err))
        }
    }
    

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = "Enter Description"
        }else if(values.description.length<5){
            errors.description = "Description length atleast 5char"
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date"
        }
        return errors
    }


    componentDidMount(){
        if(this.state.id===-1){
            return
        }
        TodoDataService.retriveTodo(AuthenticationService.getUser(),this.state.id)
        .then(res=>{
            console.log(res)
            this.setState({
                description: res.data.description,
                targetDate: moment(new Date()).format('YYYY-MM-DD')
            })
        })
    }


    render(){
        let {description, targetDate} = this.state
        return(
            <div>
                <h1>
                    Todo
                </h1>
                <div className="container">
                    <Formik initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props)=>(
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-danger"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-danger"/>
                                    <fieldset className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    
                                    <fieldset className="form-group">
                                        <label htmlFor="targetDate">TargetDate</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                
            </div>

        )
    }

}
export default withRouter(ToDoUpdateComponent)