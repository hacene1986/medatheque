import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private urlServer: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getMedias() {
    // on renvoie l'observable (phase 1 du traitement asynchrone)
    // le subcribe (phase 2) sera traité côté composant
    return this.http.get(this.urlServer + 'media/json');
  }

  // Enregisrement d'un emprunt
  newMediaLoaning(media_id: number, user: string) {
    return this.http.post(
      this.urlServer + 'loaning/api',
      {media_id: media_id, user: user}
    );
  }

  // Anciens emprunts
  getPastLoanings() {
    return this.http.get(this.urlServer + 'loaning/history');
  }
}
