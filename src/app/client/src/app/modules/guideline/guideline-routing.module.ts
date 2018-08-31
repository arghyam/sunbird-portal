// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataPrivacyPolicyComponent } from './component/index';
import { TermsOfUserComponent } from './component/index';
// Import component

const telemetryEnv = 'guideline';
const objectType = 'guideline';
const routes: Routes = [
  {
     path: 'guideline/data-privacy-policy', data: {
      telemetry: {
        env: telemetryEnv, pageid: 'guideline', uri: '/guideline', subtype: 'guideline',
        type: 'view', object: { type: objectType, ver: '1.0' }
      }
    },
    component: DataPrivacyPolicyComponent
  },
  {
    path: 'guideline/terms-of-user', data: {
      telemetry: {
        env: telemetryEnv, pageid: 'guideline', uri: '/guideline', subtype: 'guideline',
        type: 'view', object: { type: objectType, ver: '1.0' }
      }
    },
    component: TermsOfUserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GuidelineRoutingModule { }
