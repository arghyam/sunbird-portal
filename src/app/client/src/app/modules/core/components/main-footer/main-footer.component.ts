import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ResourceService } from '@sunbird/shared';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  /**
   * reference of resourceService service.
   */
  public resourceService: ResourceService;
  /**
  * content is used to render IContents value on the view
  */
  @Input() instanceName: string;
  /**
  * to show the footer bar
  */
  appFooter = true;
  /**
   * reference of Router.
   */
  private router: Router;

  /*
  * constructor
  */
  constructor(resourceService: ResourceService, router: Router) {
    this.resourceService = resourceService;
    this.router = router;
   }

  ngOnInit() {
  }

}
