import React, {Component} from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil"></i>
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label>Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label>Author</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Can not exceed 15 characters",
                  }}
                />
              </div>
              <div className="form-group">
                <Label>Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  placeholder="Add a comment here"
                  rows="6"
                  className="form-control"
                />
              </div>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}



function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
                  <p>{comment.text}</p>
                  <p>
                    {comment.author}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function CampsiteInfo(props) {
  if(props.isLoading){
    return (
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    );
  }
  if(props.errMess){
    return (
      <div className = "contianer">
        <div className = "row">
          <div className= "col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    )
  }
  if (props.campsite) {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/directory">Directory</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
              </Breadcrumb>
              <h2>{props.campsite.name}</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments
              comments={props.comments} 
              postComment={props.postComment}
              campsiteId={props.campsite.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;

/* Show Comments Button (Bonus Challenge)
            <p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.setState({ showComments: !this.state.showComments })
                }
              >
                Toggle Comments
              </button>
            </p>
*/
