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

    article = null;
    render() {
        if (!this.article) return null;

        return (
            <div className="container">
                <h2>Endre eller slett artikkel</h2>
                <Form className="mt-10" onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Tittel</Form.Label>
                        <Form.Control defaultValue={this.article.overskrift} onChange={(event) => {
                            if (this.article) this.article.overskrift = event.target.value;
                        }} name="overskrift" type="text" placeholder="Enter title..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control defaultValue={this.article.kategori} onChange={(event) => {
                            if (this.article) this.article.kategori = event.target.value;
                        }}  name="kategori" as="select">
                            <option value="Nyheter">Nyheter</option>
                            <option value="Sport">Sport</option>
                            <option value="Kultur">Kultur</option>
                            <option value="Teknologi">Teknologi</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Viktighet</Form.Label>
                        <Form.Control defaultValue={this.article.viktighet} onChange={(event) => {
                            if (this.article) this.article.viktighet = event.target.value;
                        }}  name="viktighet" as="select">
                            <option value="1">Viktig</option>
                            <option value="0">Uviktig</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bilde-url</Form.Label>
                        <Form.Control defaultValue={this.article.bilde} onChange={(event) => {
                            if (this.article) this.article.bilde = event.target.value;
                        }} name="bilde" type="text" placeholder="Enter url..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Innhold</Form.Label>
                        <Form.Control defaultValue={this.article.innhold} onChange={(event) => {
                            if (this.article) this.article.innhold = event.target.value;
                        }}  name="innhold" as="textarea" rows="10" />
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
        console.log(this.article);
        event.preventDefault();
        articleService.editArticle(this.article)
            .then(Alert.success("Artikkelen ble endret"))
            .then(data => console.log(data))
            .catch((error: Error) => Alert.danger(error.message));
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onDelete = (event) => {
        event.preventDefault();
        articleService.deleteArticle(this.props.match.params.id)
            .then(Alert.success("Artikkelen ble slettet. Gå tilbake for å fortsette"))
            .then(data => console.log(data))
            .catch((error: Error) => Alert.danger(error.message));
    }

}