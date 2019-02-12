import { Input, Component, OnInit} from '@angular/core';

import { ArticlesDetailHeaderService } from './articles-detail-header.service';

import { Vote } from './articles-detail-header';

@Component({
  selector: 'app-articles-detail-header',
  templateUrl: './articles-detail-header.component.html',
  styleUrls: ['./articles-detail-header.component.scss'],
  providers: [ArticlesDetailHeaderService]
})

export class ArticlesDetailHeaderComponent implements OnInit {

  @Input() public showHeader: boolean = false;
  @Input() public interactId: number;
  @Input() public userId: string;
  @Input() public vote: any;
  @Input() public backFrom : string;
  @Input() public voteAmount: number = 0;

  joinsed: boolean = false;

  constructor(
    private articlesDetailHeaderService: ArticlesDetailHeaderService
  ) { }


  ngOnInit(): void {

  }

  toComment(interactId: number, joinId: any) {
    if(window['WebAppInterface']) {
      if(window['WebAppInterface'].getAccessToken() == '') {
        window['WebAppInterface'].toLogin();
        return;
      }
      if(joinId == null) {
        joinId = '';
      }
      window['WebAppInterface'].toComment(interactId.toString(),joinId.toString());
    }
  }

  back() {
    if(this.backFrom == 'review') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].reviewBack();
      }
    } else if(this.backFrom == 'blog') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].blogBack();
      }
    }
  }

  toVote() {
    if(window['WebAppInterface']) {
      if(window['WebAppInterface'].getAccessToken() == '') {
        window['WebAppInterface'].toLogin();
        return;
      }
    }
    if(this.vote.vote == null) {
      if(!this.joinsed) {
        this.joinsed = true;
        if(!this.vote.id) {
          this.articlesDetailHeaderService.joins(this.interactId).then(Vote => {

            this.vote = Vote;

            let self = this;

            self.vote.vote = this.vote.vote == true? null: true;

            if(self.vote.vote == true) {
              self.voteAmount++;
            } else {
              self.voteAmount--;
            }

            self.articlesDetailHeaderService.vote(self.vote.id,self.vote.vote).then(Vote => {
              self.joinsed = false;
              return self;
            });

          });
        } else {
          let self = this;

          self.vote.vote = this.vote.vote == true? null: true;

          if(self.vote.vote == true) {
            self.voteAmount++;
          } else {
            self.voteAmount--;
          }

          self.articlesDetailHeaderService.vote(self.vote.id,self.vote.vote).then(Vote => {
            self.joinsed = false;

            return self;
          });
        }

      }
    } else {
      if(!this.joinsed) {
        this.joinsed = true;

        this.vote.vote = this.vote.vote == true? null: true;

        if(this.vote.vote == true) {
          this.voteAmount++;
        } else {
          this.voteAmount--;
        }
        this.articlesDetailHeaderService.vote(this.vote.id, this.vote.vote).then(Vote => {
          this.joinsed = false;

          return this;
        });
      }
    }

  }
}
