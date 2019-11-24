import {Component} from "react-simplified";
import {Article, articleService} from "../services";
import {Alert, Column, Row} from "../widgets";
import {NavLink} from "react-router-dom";
import Marquee from "react-smooth-marquee";
import {CommentList, CreateComment} from "./comments";
import * as React from "react";

export class ArticleList extends Component {
    articles: Article[] = [];

    render() {

        return (
            <div>
                <NewsFeed/>
            <div className="container">

                <h3> {this.props.match.params.kategori} </h3>
                <div className="content-container">
                    {this.articles.map(article => (
                        <Row key={article.id}>
                            <Column width={1}>
                                <NavLink activeStyle={{ color: 'black' }} exact to={'/nyhetssaker/' + article.id}>
                                    <div className="content-block">
                                        <h3 className="block-name">{article.overskrift} </h3>
                                        <div className="img-news">
                                            <img className="content-block-image" src={article.bilde} alt="Bilde" /> </div>
                                    </div>
                                </NavLink>
                            </Column>
                        </Row>
                    ))}
                </div>
            </div>
            </div>
        );
    }

    mounted() {
        console.log(this.props.match.params.kategori);
        articleService
            .getArticles(this.props.match.params.kategori, 1)
            .then(articles => (this.articles = articles))
            .catch((error: Error) => Alert.danger(error.message));
    }
}

export class NewsFeed extends Component {
    articles: Article[] = [];

    render() {
        return (
                <Marquee>
                    Siste nytt!
                    {this.articles.map(article => (
                        <ul key={article.id}>
                                <NavLink activeStyle={{ color: 'black' }} exact to={'/nyhetssaker/' + article.id}>
                                        {article.overskrift}, {article.registrert_tidspunkt}
                                </NavLink>
                        </ul>
                    ))}
                </Marquee>
        );
    }

    mounted() {
        articleService
            .getNewsFeed()
            .then(articles => (this.articles = articles))
            .catch((error: Error) => Alert.danger(error.message));
    }
}

export class ArticleDetails extends Component<{ match: { params: { id: number } } }> {
    article = null;
    render() {
        if (!this.article) return null;

        return (
            <div className="container">

                <Row>
                    <div className="article-title"><h1>{this.article.overskrift}</h1></div>
                </Row>
                <Row>
                    <img src={this.article.bilde} className="img-center"/>
                </Row>
                <Row>
                    <div className="content-description">
                        <Column>{this.article.innhold}</Column>
                    </div>
                </Row>
                <Row>
                    <p>________________________________________________________________________________________________________________________</p>
                </Row>
                <Row>
                    <CreateComment id={this.props.match.params.id}/>
                    <CommentList id={this.props.match.params.id}/>
                </Row>
            </div>

        );
    }

    mounted() {
        console.log(this.article);
        articleService
            .getArticle(this.props.match.params.id)
            .then(article => (this.article = article))
            .catch((error: Error) => Alert.danger(error.message));
    }
}
