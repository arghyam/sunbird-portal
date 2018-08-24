import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchService, ContentService, SearchParam } from '@sunbird/core';
import { Observable } from 'rxjs/Observable';
import { ServerResponse, ConfigService } from '@sunbird/shared';

@Component({
  selector: 'app-org-dropdown',
  templateUrl: './org-dropdown.component.html',
  styleUrls: ['./org-dropdown.component.css']
})
export class OrgDropdownComponent implements OnInit {

  private searchService: SearchService;
  orgData: any;
  @Output() selectedOrg = new EventEmitter<string>();
  @Input() queryParams: any; 
  selectedOrganization: any;
  
  constructor(searchService: SearchService, public content: ContentService,
    public config: ConfigService) {
    this.searchService = searchService;
    
  }
  ngOnInit() {
    this.getOrgslist();
  }
      /**
   * Org Search without offset.
  */
 orgSearch(): Observable<ServerResponse> {
  const option = {
    url: this.config.urlConFig.URLS.ADMIN.ORG_SEARCH,
    data: {
      request: {
        filters: {}
      }
    }
  };
  return this.content.post(option);
}

onChange(event) {
  this.selectedOrg.emit(this.selectedOrganization);
}

  getOrgslist(){
    this.orgSearch().subscribe((orgresults) => {
      this.orgData = orgresults.result && orgresults.result.response && orgresults.result.response.content || []
    });

  }

}
