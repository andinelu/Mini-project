import {Component} from "react-simplified";
import {Article, articleService} from "../services";
import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Alert, Column, Row} from "../widgets";
import {NavLink} from "react-router-dom";

export class EditList extends Component {
    articles: Article[] = [];

    render() {
        return(
            <div className="container">

                <h3>Velg den artikkelen du vil redigere eller slette</h3>
                <div className="content-container">
                    {this.articles.map(article => (
                        <Row key={article.id}>
                            <Column width={8}>
                                <NavLink activeStyle={{ color: 'black' }} exact to={'/edit/' + article.id}>
                                        {article.overskrift}, {article.registrert_tidspunkt}
                                </NavLink>
                            </Column>
                        </Row>
                    ))}
                </div>
            </div>
        );
    }

    mounted() {
        articleService
            .editArticles()
            .then(articles => (this.articles = articles))
            .catch((error: Error) => Alert.danger(error.message));
    }
}


export class EditDetails extends Component<{ match: { params: { id: number } } }> {
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

    article = null;
    render() {
        if (!this.article) return null;

        return (
            <div className="container">
                <h2>Endre eller slett artikkel</h2>
                <Form className="mt-10" onSubmit={this.onSubmit}>
                    <Button variant="primary" type="button" onClick={this.updateState}>
                        UpdateState
                    </Button>
                    <Form.Group>
                        <Form.Label>Tittel</Form.Label>
                        <Form.Control defaultValue={this.article.overskrift} onChange={this.onChange} name="overskrift" type="text" placeholder="Enter title..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control defaultValue={this.article.kategori} onChange={this.onChange}  name="kategori" as="select">
                            <option>Nyheter</option>
                            <option>Sport</option>
                            <option>Kultur</option>
                            <option>Teknologi</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check name="viktig" defaultValue={this.article.viktighet} onChange={this.onChange}  type="checkbox" label="Viktig" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bilde-url</Form.Label>
                        <Form.Control defaultValue={this.article.bilde} onChange={this.onChange} name="bilde" type="text" placeholder="Enter url..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Innhold</Form.Label>
                        <Form.Control defaultValue={this.article.innhold} onChange={this.onChange}  name="innhold" as="textarea" rows="4" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="primary" type="button" onClick={this.onDelete}>
                        Delete
                    </Button>
                </Form>
            </div>

        );
    }

    mounted() {
        articleService
            .getArticle(this.props.match.params.id)
            .then(article => (this.article = article))
            .catch((error: Error) => Alert.danger(error.message));
    }

    onSubmit = (event) => {
        console.log(this.state);
        console.log("Endring blir utført");
        event.preventDefault();
        articleService.editArticle(this.state)
            .then(data => console.log(data));
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onDelete = (event) => {
        event.preventDefault();
        articleService.deleteArticle(this.props.match.params.id)
            .then(data => console.log(data));
        console.log(this.state);
    }

    updateState(){
        console.log("Kommer hit");
        this.setState({
            overskrift: this.article.overskrift,
            innhold: this.article.innhold,
            kategori: this.article.kategori,
            bilde: this.article.bilde,
            viktighet: 1
        })

    }
}