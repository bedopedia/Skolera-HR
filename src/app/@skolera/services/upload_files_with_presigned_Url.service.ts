import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../../environments/environment';


@Injectable()
export class UploadFilesWithPreSignedUrlService {
    constructor(
        private http: HttpClient,
    ) { }

    getPreSignedUrl(params:any) {
        return this.http.post(`${baseUrl}/api/presigned_url`, params);
    }
    putFileToS3(body: File, presignedUrl: string){
        return this.http.put(presignedUrl, body)
    }
    getFileFromS3(public_url: string){
        return this.http.get(public_url, {responseType: 'blob'})
    }
    saveUploadedFile(params:any) {
        return this.http.post(`${baseUrl}/api/upload_file`, params);
    }
};