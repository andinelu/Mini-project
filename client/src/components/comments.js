import {Component} from "react-simplified";
import {Comment, commentService} from "../services";
import {Button, Form} from "react-bootstrap";
import * as React from "react";
import {Alert, Column, Row} from "../widgets";

export class CommentList extends Component{
comments: Comment[] = [];

render() {
    return (
        <div className="container">
            <h3> Kommentarer </h3>
            <div className="comment-container">
                {this.comments.map(comment => (
                    <Row key={comment.kommentar_id}>
                        <Column width={6}>
                            <h5 className="block-name">Brukernavn: {comment.brukernavn},</h5>
                            <h6> {comment.registrert}</h6>
                            <div className="comment-block">
                                    {comment.innhold}
                                </div>
                        </Column>
                    </Row>

                ))}
            </div>
        </div>
    );
}

mounted() {
    console.log(this.props.id);
    commentService
        .getComments(this.props.id)
        .then(comments => (this.comments = comments))
        .catch((error: Error) => Alert.danger(error.message));
}



}


/*_____________________________________________________ */


export class CreateComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            nyhetssak_id: this.props.id,
            brukernavn: "",
            innhold: ""
        }
    }

    render() {
        return(
            <div className="container">
                <div className="m-5">
                    <h3>Legg til en kommentar</h3>
                    <CommentEditor values={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                    <CommentList id={this.props.id}/>
                </div>
            </div>
        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        commentService.createComment(this.state, this.props.id)
            .then(data => console.log(data));
        console.log(this.state);
        this.setState({
            brukernavn: "",
            innhold: ""
        })
        window.location.reload();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export class CommentEditor extends Component {
    render() {
        return (
            <div className="m-2">
                <Form className="mt-5" onSubmit={this.props.onSubmit}>
                    <Form.Group>
                        <Form.Label>Brukernavn</Form.Label>
                        <Form.Control required value={this.props.values.brukernavn} onChange={this.props.onChange} name="brukernavn" type="text" placeholder="Enter username..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Innhold</Form.Label>
                        <Form.Control required value={this.props.values.innhold} onChange={this.props.onChange}  name="innhold" as="textarea" rows="4" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

