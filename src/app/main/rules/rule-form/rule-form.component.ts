import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveType, Rule, TradinessRule } from '@core/models/rules-interfaces.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { RulesSerivce } from '@skolera/services/rules.services';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss']
})
export class RuleFormComponent implements OnInit {
  @ViewChild('ruleForm') announcementForm: NgForm;
  isFormSubmitted: boolean = false;
  ruleLoading: boolean = false;
  leaveTypes: LeaveType[] = [];
  rule: Rule;
  leaveTypesLoading: boolean = true;
  leaveTypesPagination: PaginationData;
  selectedLeaveType: number;
  inValidAllTradinessTime: boolean = false;
  leaveTypesPaginationParams = {
    page: 1,
    per_page: 10
  }
  lops = [{
    name: 0.5,
    value: true
  }, {
    name: 1,
    value: false
  }]

  private subscriptions: Subscription[] = [];
  private ruleId: number;
  constructor(
    public dialogRef: MatDialogRef<RuleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ruleService: RulesSerivce,
    private appNotificationService: AppNotificationService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    console.log("data", this.data);
    if (this.data.type == 'create') {
      this.rule = {
        name: '',
        leave_type_id: 1,
        tardiness_rules_attributes: [new TradinessRule()]

      }
    }
    else {
      this.ruleId = this.data.rule.id
      this.getRule()
    }


    this.getLeveTypes()

  }
  public addTradinessRule() {
    this.rule.tardiness_rules_attributes?.push(new TradinessRule())
  }
  public validateStartAndEndTime(tardinessRule: TradinessRule) {
    if (tardinessRule.start_time == '' || tardinessRule.end_time == '') {
      return
    }
    let startTime = moment(tardinessRule.start_time, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    let endTime = moment(tardinessRule.end_time, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    tardinessRule.invalidTime = (startTime > endTime) ? true : false;
    this.inValidAllTradinessTime = this.rule.tardiness_rules_attributes!.filter(tardinessRule => (tardinessRule.invalidTime)).length > 0;
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
      this.rule.leave_type_id = response.absence_leave_type.id
    }, error => {
      this.appNotificationService.push(error.name, 'error');
      this.dialogRef.close('update');
      this.isFormSubmitted = false;
    }))
  }
  updateRule() {
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
