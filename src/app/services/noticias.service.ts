import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    this.headlinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    // tslint:disable-next-line: max-line-length
    /*return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3e97c47e99d2421a92425d72786c451a`); */
  }

  getTopHeadlinesCategoria(categoria: string) {
    /* return this.http.get(`http://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=3e97c47e99d2421a92425d72786c451a`); */
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);
  }
}
