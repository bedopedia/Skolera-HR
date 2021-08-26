import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable()
export class ApplicationService {

    constructor(
        private http: HttpClient
    ) { }
    addStudent(student) {
        return this.http.post(`${baseUrl}/api/applications`,student);
    }
    editStudent(id, student) {
        return this.http.put(`${baseUrl}/api/applications/${id}`,student);
    }
    getStudent(id) {
        return this.http.get(`${baseUrl}/api/applications/${id}`);
    }
    getLevels() {
        return this.http.get(`${baseUrl}/api/levels`);
    }
    getLevelsReport() {
        return this.http.get(`${baseUrl}/api/applications/report`);
    }
    getLevelApplicants(levelId) {
        return this.http.get(`${baseUrl}/api/applications`, {
            params: {
                level_id: levelId
            }
        });
    }
}
