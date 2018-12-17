import { Component } from '@angular/core';
import { MediaService } from './media.service';
import { HttpClient } from '@angular/common/http';
interface Media{
  title: string;
  type: string;
  author: string;
  end: string;
  start: string;
  user: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'media-front';
  medias : Media[] = [];
  user: string = '';
  types = ['Livre', 'Film', 'Audio'];
  selectedType: string;

 constructor(private mediaService: MediaService, private http: HttpClient) {
    this.mediaService
      .getMedias()
      .subscribe((res: Media[]) => {
        this.medias = res;
      })
  }

  saveLoaning(media_id: number, index: number) {
    // envoyer requête d'enregistrement
    this.mediaService
      .newMediaLoaning(media_id, this.user)
      .subscribe((res: string) => {
        console.log(res);

        // mettre le DOM à jour (en mettant à jour this.medias)
        // index permet de récupérer le positionnement du media
        // dans le tableau this.medias
        this.medias[index].end = res;
        this.medias[index].user = this.user;
      })
  }

  nbLoanings(): number {
    if (this.user.length > 3) {
      let loanings: Media[] = [];
      loanings = this.medias
        .filter((media: Media) => media.user == this.user);
      return loanings.length;
    } else {
      return 0;
    }
  }

   // filterType(){
   //   this.mediaService
   //   .filterByType()
   //   .subscribe((res: Media[])=> {
   //     console.log(res);
   //   })
   // }
filter(){

  //console.log(this.selectedType.value);
 let url: string = 'http://127.0.0.1:8000/media/type/json';
  url += `?type=${this.selectedType}`;
  //console.log(this.selectedType);
  this.http.get(url).subscribe((res: Media[]) => {
    console.log(res);
     this.medias = res;
      //console.log(res.length);

 });
}//fin de filter
}
