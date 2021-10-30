import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Rule } from '@core/models/rules-interfaces.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { RulesSerivce } from '@skolera/services/rules.services';
import { Subscription } from 'rxjs';
import { RuleFormComponent } from '../rule-form/rule-form.component';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.scss']
})
export class RulesListComponent implements OnInit {
  paginationPerPage: number = 10;
  paginationData: PaginationData;
  rulesLoading: boolean = true;
  rulesList: Rule [];
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  isFilterOpen: boolean = false;
  private subscriptions: Subscription[] = [];
  
  constructor(
    private rulesSerivce: RulesSerivce,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRules();
  }

  getRules(){
    this.rulesLoading = true;
    this.subscriptions.push(this.rulesSerivce.getRules(this.params).subscribe((response: any ) => {
      this.rulesList = response.rules;
      this.paginationData = response.meta;
      this.rulesLoading = false;
      
    }))
  }
  openRuleForm(type: string, rule?:Rule){
    const dialogRef = this.dialog.open(RuleFormComponent, {
      width: '650px',
      disableClose: true,
      data: {type: type, rule: rule}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'update'){
        this.getRules();
      }
    })
  }
  filterRules(term: any){
    term =  term.target.value
    this.params['by_name'] = term;
    this.getRules();
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getRules();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }

}
