import { render } from "@testing-library/react";
import React from "react";
import {Button, Form, FormGroup, Label, Input, FormText} from "reactstrap";


class AddComments extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event){
        this.
    }

render(){
      return (
    <React.Fragment>
      <Form>
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="addedComment"
            placeholder="Add A Comment"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </React.Fragment>
  );
}

}


export default AddComments;