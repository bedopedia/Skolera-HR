import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesListComponent } from './rules-list/rules-list.component';
import { RulesSerivce } from '@skolera/services/rules.services';
import { SharedModule } from '@shared/shared.module';
import { RuleFormComponent } from './rule-form/rule-form.component';


@NgModule({
  declarations: [
    RulesListComponent,
    RuleFormComponent
  ],
  imports: [
    CommonModule,
    RulesRoutingModule,
    SharedModule
  ],
  entryComponents: [RuleFormComponent],
  providers: [RulesSerivce]
})
export class RulesModule { }
