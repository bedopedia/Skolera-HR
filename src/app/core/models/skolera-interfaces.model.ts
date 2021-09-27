export interface PaginationData {
    current_page: number,
    next_page: number,
    prev_page: number,
    total_count: number,
    total_pages: number
}
export interface Employee {
    number: string;
    name: string;
    department_name: number;
    biometric_id: number;
  
  }
export interface TimeGroup{
    name: string;
    id: number;
    group_type: string;
}  
  export interface CurrentUser {
    id: number;
    actable_id: number;
    actable_type: string;
    actions: [];
    avatar_url: string
    child_id?: number;
    children?: null;
    city?: string;
    country?: string;
    dateofbirth?: Date;
    email?: string
    firstname: string;
    gender: string;
    hide_grades?: boolean;
    home_address?: string;
    is_active?: boolean;
    last_sign_in_at?: Date;
    lastname: string;
    locale: string;
    middlename?: string;
    name: string;
    role: {};
    parent_id?: number;
    password: string;
    phone?: string;
    realtime_ip?: string;
    school_name?: string;
    secondary_address?: string;
    secondary_phone?: string;
    show_school_fees?: string;
    thumb_url?: string;
    unseen_notifications?: number;
    user_type?: string;
    username: string;
}