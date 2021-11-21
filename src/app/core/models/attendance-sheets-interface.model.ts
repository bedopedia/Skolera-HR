
export interface NationalHoliday {
    day: string
}

export class AttendanceSheet {
    constructor(
      public start_date: string = '' ,
      public end_date: string = '',
      public state: any  = '',
      public national_holidays: NationalHoliday[] = [],
      public uploaded_file: any = {},
      public uploaded_file_attributes: any = {},
      public national_holidays_attributes: NationalHoliday[] = [],
      public logs?: any 
    )
    {}
  }