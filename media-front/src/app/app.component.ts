import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';

interface Media {
  id: number;
  type: string;
  title: string;
  author: string;
  end: string;
  start: string;
  user: string;
}

interface PastLoaning {
  start: string;
  end: string;
  user: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private filterTypeValue: string = '';
  private filterAuthorValue: string = '';
  mediasInit: Media[] = [];
  medias: Media[] = [];
  user: string = '';
  showAvailable: boolean = false;
  pastLoanings: PastLoaning[] = [];

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {

    this.mediaService
      .getMedias()
      .subscribe((res: Media[]) => {
        this.mediasInit = res;
        this.medias = res;
      })

    this.mediaService
      .getPastLoanings()
      .subscribe((res: PastLoaning[]) => {
        this.pastLoanings = res;
        console.log(this.pastLoanings);
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

  filterType(val: string) {
    this.filterTypeValue = (val === '0')
      ? ''
      : val;
    this.filter();
  }

  filterAuthor(val: string) {
    if (val.length > 2) {
      this.filterAuthorValue = val;
    } else {
      this.filterAuthorValue = '';
    }
    this.filter();
  }

  private filter() {
    this.medias = this.mediasInit
      .filter((media: Media) => {

        let type: boolean = (this.filterTypeValue === '')
          ? true
          : media.type.toLowerCase() ===
            this.filterTypeValue.toLowerCase();

        let author: boolean = (this.filterAuthorValue === '')
          ? true
          : media.author.toLowerCase()
            .indexOf(this.filterAuthorValue.toLowerCase()) !== -1;

        return type && author;
      })
  }

  getPastLoaningsByUser(user: string): PastLoaning[] {
    let pastLoanings: PastLoaning[] =
      this.pastLoanings
        .filter((loaning: PastLoaning) => loaning.user === user);
    return pastLoanings;
  }

}
