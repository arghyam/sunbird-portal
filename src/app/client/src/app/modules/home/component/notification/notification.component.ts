import { Component } from '@angular/core';
import { RssfeedService } from './../../services';
/**
 * Shows notification
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  rssFeedResearchPapers:any;
  constructor(public rssfeedService: RssfeedService) { }

  ngOnInit() {
    this.getResearchRssFeed();
  }
 
  getResearchRssFeed(){
    this.rssfeedService.getReasearchPapersRssFeed().subscribe(
      (data) => {
          //console.log('notification rss feed', data.result)
          this.rssFeedResearchPapers = data.result
       });
  }
}
