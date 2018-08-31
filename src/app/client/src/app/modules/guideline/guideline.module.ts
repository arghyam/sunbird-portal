import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidelineRoutingModule } from './guideline-routing.module';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { TermsOfUserComponent } from './component/terms-of-user/terms-of-user.component';
import { DataPrivacyPolicyComponent } from './component/data-privacy-policy/data-privacy-policy.component';

@NgModule({
  imports: [
    SuiModule,
    CommonModule,
    GuidelineRoutingModule
  ],
  declarations: [TermsOfUserComponent, DataPrivacyPolicyComponent]
})
export class GuidelineModule { }
