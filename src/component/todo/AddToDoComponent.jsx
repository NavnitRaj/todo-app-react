import { Component } from "react";
import { withRouter } from "react-router";

class AddToDoComponent extends Component{
    
    render(){
        let l = ['a','b']

        {l.map(i=>i)}
        return <div id="body">Hii</div>
    }
}
export default withRouter(AddToDoComponent)