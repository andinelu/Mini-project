// @flow
import axios from 'axios';



export class Article {
  id: number;
  overskrift: string;
  innhold: string;
  kategori: string;
  bilde: string;
  registrert_tidspunkt: string;
  viktighet: boolean;
}


class ArticleService {
  getArticles(kategori: string, page: number) {
    return axios.get<Article[]>('/' + kategori + '?page=' + page).then(response => response.data);
  }
  /*getArticles(kategori: string) {
    return axios.get<Article[]>('/' + kategori).then(response => response.data);
  } */
  getNewsFeed(){
    return axios.get<Article[]>('/live').then(response => response.data);
  }
  getArticle(id: number) {
    return axios.get<Article>('/nyhetssaker/' + id).then(response => response.data);
  }
  createArticle(article: Article){
    //article.viktighet = (article.viktighet === 'on'); //(article.viktighet === 'on' ? true : false);
    return axios.post<Article, void>('/opprett', article).then(response => response.data);
  }

}
export let articleService = new ArticleService();


export class Comment {
  kommentar_id: number;
  nyhetssak_id: number;
  brukernavn: string;
  innhold: string;
  registrert: string;
}
class CommentService {
  getComments(nyhetssak_id: number) {
    return axios.get<Comment[]>("/nyhetssaker/" + nyhetssak_id + "/kommentar").then(response => response.data);
  }
  getCommentsTest(nyhetssak_id: number) {
    return axios.get<Comment[]>("/kommentar/" + nyhetssak_id ).then(response => response.data);
  }
  createCommentTest(comment: Comment){
    return axios.post<Comment, void>("/kommentar", comment).then(response => response.data);
  }
  createComment(comment: Comment, nyhetssak_id: number){
    return axios.post<Comment, void>("/kommentar/" + nyhetssak_id, comment).then(response => response.data);
  }

}

export let commentService = new CommentService();