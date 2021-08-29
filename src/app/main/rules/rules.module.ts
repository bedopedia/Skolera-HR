import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesListComponent } from './rules-list/rules-list.component';

@NgModule({
  declarations: [RulesListComponent],
  imports: [
    CommonModule,
    RulesRoutingModule
  ]
})
export class RulesModule { }
