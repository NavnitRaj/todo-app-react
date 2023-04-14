import { Component } from "react";

export default class FirstComponent extends Component{
    render(){
      return(
        <div className="App">
          <h1>FirstComponent</h1>
        </div>
      );
    }
}

export  class SecondComponent extends Component{
    render(){
      return(
        <div className="App">
          <h1>SecondComponent</h1>
        </div>
      );
    }
}
