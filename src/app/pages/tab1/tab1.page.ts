import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor( private noticiasservices: NoticiasService ) {}

  ngOnInit() {
   this.cargarNoticias();
  }

  loadData(event) {
   /*  console.log(event); */
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasservices.getTopHeadlines()
    .subscribe( (resp: any) => {
      /* console.log('noticias', resp); */
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      /* this.noticias = resp.articles; */
      this.noticias.push(...resp.articles);

      if ( event ) {
        event.target.complete();
      }
    });
  }
}  