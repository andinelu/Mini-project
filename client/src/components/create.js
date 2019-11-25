import {Component} from "react-simplified";
import {articleService} from "../services";
import {Button, Form} from "react-bootstrap";
import * as React from "react";
import {Alert, Column} from "../widgets";

export class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            overskrift: "",
            innhold: "",
            kategori: "None",
            bilde: "",
            viktighet: 0 //"checked"
        }
    }

    render() {
        return(
            <div className="container">
                <div className="m-5">
                    <h3>Opprett en nyhetsartikkel</h3>
                    <Editor values={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                </div>
            </div>
        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        articleService.createArticle(this.state)
            .then(Alert.success("Artikkelen ble lagt til"))
            .then(data => console.log(data))
            .catch((error: Error) => Alert.danger(error.message));
        console.log(this.state);
        this.setState({
            overskrift: "",
            innhold: "",
            kategori: "None",
            bilde: "",
            viktighet: 0
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export class Editor extends Component {
    render() {
        return (
            <div className="m-2">
                <Form className="mt-5" onSubmit={this.props.onSubmit}>
                    <Form.Group >
                        <Form.Label>Tittel</Form.Label>
                        <Form.Control className="form-control" required value={this.props.values.overskrift} onChange={this.props.onChange} name="overskrift" type="text" placeholder="Enter title..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control required value={this.props.values.kategori} onChange={this.props.onChange}  name="kategori" as="select">
                            <option>Nyheter</option>
                            <option>Sport</option>
                            <option>Kultur</option>
                            <option>Teknologi</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artikkelens viktighet (kun viktige artikler kommer på forsiden)</Form.Label>
                        <Form.Control required value={this.props.values.viktighet} onChange={this.props.onChange}  name="viktighet" as="select">
                            <option value={1}>Viktig</option>
                            <option value={0}>Uviktig</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bilde-url</Form.Label>
                        <Form.Control className="form-control" required value={this.props.values.bilde} onChange={this.props.onChange} name="bilde" type="text" placeholder="Enter url..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Innhold</Form.Label>
                        <Form.Control className="form-control" required value={this.props.values.innhold} onChange={this.props.onChange}  name="innhold" as="textarea" rows="10" />
                        </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}