import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.renderComments = this.renderComments.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderComments() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }

    handleSubmit(values) {
        this.renderComments();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary" onClick={this.renderComments}>
                    <span className='fa fa-sign-in fa-lg'></span>
                                Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.renderComments}>
                    <ModalHeader toggle={this.renderComments}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label sm={12} htmlFor="rating">Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label sm={12} htmlFor="author">Your Name</Label>
                                <Col sm={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className='text-danger'
                                        model='.author'
                                        show="touched"
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label sm={12} htmlFor="comment">Comment</Label>
                                <Col sm={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle heading>{dish.name}</CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments }) {

    const commentList = comments.map((comment) => {
        return (
            <Fade in>
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            </Fade >
        )
    })

    return (
        <React.Fragment>
            <CardTitle>
                Comments
            </CardTitle>
            {/* <div key={comments.id}>
                <CardText>{comments.comment}</CardText>
                <CardText>-- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</CardText>
            </div> */}
            <div className="mb-3">
                <Stagger in>
                    {commentList}
                </Stagger>
            </div>
        </React.Fragment>
    )
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className="col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                </div>
            </div>
        </div>
    )
}

export default DishDetail;