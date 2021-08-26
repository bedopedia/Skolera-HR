import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable()
export class StatusesService {

    constructor(
        private http: HttpClient
    ) { }
    getStatuses() {
        return this.http.get(`${baseUrl}/api/statuses`);
    }
    getStatus(id) {
        return this.http.get(`${baseUrl}/api/statuses/${id}`);
    }
    addStatus(status) {
        return this.http.post(`${baseUrl}/api/statuses`, status);
    }
    deleteStatus(id) {
        return this.http.delete(`${baseUrl}/api/statuses/${id}`);
    }
    editStatus(id, status) {
        return this.http.put(`${baseUrl}/api/statuses/${id}`, status);
    }
}
