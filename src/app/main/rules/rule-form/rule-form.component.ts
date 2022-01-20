import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveType, Rule, TardinessRule } from '@core/models/rules-interfaces.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TranslateService } from '@ngx-translate/core';
import { SkoleraConfirmationComponent } from '@shared/components/skolera-confirmation/skolera-confirmation.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { RulesSerivce } from '@skolera/services/rules.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss']
})
export class RuleFormComponent implements OnInit {
  @ViewChild('ruleForm') ruleForm: NgForm;
  isFormSubmitted: boolean = false;
  ruleLoading: boolean = true;
  leaveTypes: LeaveType[] = [];
  rule: Rule;
  leaveTypesLoading: boolean = true;
  leaveTypesPagination: PaginationData;
  selectedLeaveType: number;
  invalidAllTardinessTime: boolean = false;
  errorMessage: string;
  leaveTypesPaginationParams = {
    page: 1,
    per_page: 10
  }
  lops = [1, 0.5]

  private subscriptions: Subscription[] = [];
  private ruleId: number;
  constructor(
    public dialogRef: MatDialogRef<RuleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ruleService: RulesSerivce,
    private appNotificationService: AppNotificationService,
    public translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.data.type == 'create') {
      this.ruleLoading = false;
      this.rule = {
        name: '',
        leave_type_id: 1,
        tardiness_rules_attributes: [],
        time_groups: []
      }
    }
    else {
      this.ruleId = this.data.rule.id
      this.getRule()
    }
    this.getLeveTypes()

  }
  public addTardinessRule() {
    if (!this.rule.tardiness_rules_attributes!) {
      this.rule.tardiness_rules_attributes! = [new TardinessRule()]
    }
    else {
      this.rule.tardiness_rules_attributes?.push(new TardinessRule());
    }
  }
  public validateStartAndEndTime(tardinessRule: TardinessRule) {
    const isFindStartAndEndTime = this.rule.tardiness_rules_attributes?.filter((selectedTardinessRule,index) => (selectedTardinessRule.start_time == tardinessRule.start_time && selectedTardinessRule.end_time == tardinessRule.end_time) && index != this.rule.tardiness_rules_attributes?.indexOf(tardinessRule) ).length;
    if ((!tardinessRule.start_time || !tardinessRule.end_time || tardinessRule.start_time == '' || tardinessRule.end_time == '') && this.isFormSubmitted) {
      this.invalidAllTardinessTime = true;
      tardinessRule.invalidTime = true;
    } 
    else if(isFindStartAndEndTime){
      tardinessRule.invalidTime = true;
      this.errorMessage = this.translate.instant('tr_unique_start_and_end')
    }
    else if (!this.isFormSubmitted && (!tardinessRule.start_time || !tardinessRule.end_time || tardinessRule.start_time == '' || tardinessRule.end_time == '')) {
      return
    } else {
      tardinessRule.invalidTime = (tardinessRule.start_time >= tardinessRule.end_time) ? true : false;
      this.invalidAllTardinessTime = this.rule.tardiness_rules_attributes!.filter(tardinessRule => (tardinessRule.invalidTime)).length > 0;
      this.errorMessage = ''
    }

  }
  public closeModal() {
    this.dialogRef.close();
  }
  getRule() {
    this.ruleLoading = true;
    this.subscriptions.push(this.ruleService.getRule(this.ruleId).subscribe((response: any) => {
      this.ruleLoading = false;
      this.rule = response;
      this.rule.tardiness_rules_attributes = response.tardiness_rules;
      this.rule.deleted_tardiness_rules! = [];
      this.rule.tardiness_rules_attributes?.forEach(tardinessRule => {
        tardinessRule.lop = tardinessRule.is_half_day ? 0.5 : 1
      })
      this.rule.leave_type_id = response.absence_leave_type.id
    }, error => {
      this.appNotificationService.push(error.name, 'error');
      this.dialogRef.close('update');
      this.isFormSubmitted = false;
    }))
  }
  submitFrorm() {
   
    this.isFormSubmitted = true;
    if (this.getIsInValidRule() || this.rule.name == '' || this.invalidAllTardinessTime) {
      this.isFormSubmitted = false;
      return
    }
    this.rule.tardiness_rules_attributes?.forEach(tardinessRule => tardinessRule.is_half_day = tardinessRule.lop == 0.5 ? true : false)
    this.data.type == 'create' ? this.createRule() : this.updateRule();
  }
  updateRule() {
    this.rule.tardiness_rules_attributes = this.rule.tardiness_rules_attributes?.concat(this.rule.deleted_tardiness_rules!)
    let ruleParams = {
      rules: this.rule
    }
    this.subscriptions.push(this.ruleService.updateRule(ruleParams, this.rule.id!).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_rule_updated_successfully'), 'success');
      this.dialogRef.close('update');
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
      this.isFormSubmitted = false;
    }))
  }
  private getIsInValidRule(): boolean {

    let invalidRuleForm = false;
    if (this.rule.tardiness_rules_attributes!.length > 0) {
      this.rule.tardiness_rules_attributes?.forEach(tardinessRule => {
        this.validateStartAndEndTime(tardinessRule);
        if (tardinessRule.end_time == '' || tardinessRule.start_time == '' || tardinessRule.invalidTime || !tardinessRule.leave_type_id || !tardinessRule.lop) {
          invalidRuleForm = true;
        }    
        else invalidRuleForm = false;
      })
    }
    else {
      if (this.rule.leave_type_id == null) {
        this.errorMessage = this.translate.instant('tr_at_least_one_rule')
        invalidRuleForm = true;
      }
      else {
        invalidRuleForm = false;
      }
    }
    return invalidRuleForm;
  }
  deleteTardinessRule(deletedTardinessRule: TardinessRule) {
    const data = {
      title: this.translate.instant("tr_sure_message"),
      buttons: [
        {
          label: this.translate.instant("tr_action.cancel"),
          actionCallback: 'cancel',
          type: 'btn-secondary'
        },
        {
          label: this.translate.instant("tr_action.delete"),
          actionCallback: 'delete',
          type: 'btn-danger'
        }
      ]
    }

    const dialogRef = this.dialog.open(SkoleraConfirmationComponent, {
      width: '300px',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.rule.tardiness_rules_attributes?.forEach((tardinessRule, index) => {
          if (tardinessRule == deletedTardinessRule) {
            if (deletedTardinessRule.id!) {
              tardinessRule._destroy = true;
              this.rule.deleted_tardiness_rules?.push(tardinessRule)
            }
            this.rule.tardiness_rules_attributes = this.rule.tardiness_rules_attributes?.filter(tardinessRule => tardinessRule != deletedTardinessRule)
          }
          if (this.rule.tardiness_rules_attributes?.length == 0) {
            this.invalidAllTardinessTime = false;
          }
          else {
            this.rule.tardiness_rules_attributes?.forEach(tardinessRule => {
              this.validateStartAndEndTime(tardinessRule);
            })

          }



        })

      }
    })


  }
  createRule() {

    let ruleParams = {
      rules: this.rule
    }
    this.subscriptions.push(this.ruleService.createRule(ruleParams).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_rule_created_successfully'), 'success');
      this.dialogRef.close('update');
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
      this.isFormSubmitted = false;
    }))


  }
  getLeveTypes() {
    this.leaveTypesLoading = true
    this.subscriptions.push(this.ruleService.getLeaveTypes(this.leaveTypesPaginationParams).subscribe((response: any) => {
      this.leaveTypes = this.leaveTypes.concat(response.leave_types);
      this.leaveTypesPagination = response.meta;
      this.leaveTypesLoading = false;
    }))
  }
  nextBatch() {
    if (this.leaveTypesPagination.next_page) {
      this.leaveTypesLoading = true;
      this.leaveTypesPaginationParams.page = this.leaveTypesPagination.next_page;
      this.getLeveTypes();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }

}
