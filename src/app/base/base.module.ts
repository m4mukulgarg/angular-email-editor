import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { EmailEditorModule } from 'src/app/email-editor/public_api';

import { BaseComponent } from './base.component';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    EmailEditorModule
  ]
})
export class BaseModule { }
