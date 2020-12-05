import { render } from "@testing-library/react";
import React from "react";



class AddComments extends React.Component {

    constructor(props){
      super(props);

      // this.handleChange = this.props.handleChange.bind(this);
      // this.handleSubmit = this.props.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }

  /*  handleSubmit(event){
        alert('A comment was submitted: ' + this.state.value);
        event.preventDefault();
    }
*/
render(){
      return (
        <form onSubmit={this.props.handleSubmit}>
            <label>
                Comment:
                <input type="text" value={this.props.value} onChange={this.props.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
  );
}

}


export default AddComments;