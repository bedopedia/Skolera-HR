import { TimeGroupSchedule } from "./time-groups-interface.model";

export interface Department {
    name: string,
    id: number,
    code: string
}
export interface Employee {
    id?: number
    number: string;
    name: string;
    department_name: number;
    biometric_id: number;
    isSelected?: boolean
    time_group_schedule?: TimeGroupSchedule[]

}
export interface EmployeesAttributes {
    id: number,
    time_group_schedule_attributes: {
        schedule_days_attributes: TimeGroupSchedule[]
    }
}
