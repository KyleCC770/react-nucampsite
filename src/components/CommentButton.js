import React, { Component } from "react";
import { Button } from "reactstrap";
class CommentButton extends Component {
  render() {
    return (
      <div>
        <Button color="primary">Toggle Comments</Button>
      </div>
    );
  }
}

export default CommentButton;
