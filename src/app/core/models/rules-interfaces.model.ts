export class Rule{
  name: string = '';
  id?: number;
  created_at?: Date;
  tardiness_rules_attributes?:TradinessRule[];
  leave_type_id?: number;
  is_half_day?: boolean;
  }

 export class TradinessRule{
    constructor(
      public start_time: string = '' ,
      public end_time: string = '',
      public leave_type_id: number = 1,
      public is_half_day: boolean = false,
      public invalidTime:boolean = false
    )
    {}
  }
export interface LeaveType{
  id?: number,
  name: string,
  code?: number
}  
