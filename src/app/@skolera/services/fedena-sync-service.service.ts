import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FedenaSyncService {
  constructor(
    private http: HttpClient
  ) {
  }
  
  hrSync() {
    return this.http.post(`${baseUrl}api/fedena_sync`, { "sync_type": "hr_sync" });
  }
  getSyncStatus() {
    return this.http.get(`${baseUrl}api/sync_stats?process_type=hr_sync`);
  }
  syncAttendanceSheet(params: any){
    return this.http.post(`${baseUrl}/api/fedena_sync/upload_attendance`, params)
  }
}
