import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadService {
    constructor(private http: HttpClient) { }
    upload(method, url, object, headers = {}) {
        let formData = this.jsonToFormData(object);
        if (method == 'PUT') {
            return this.http.put(url, formData, headers);
        }
        return this.http.post(url, formData, headers);
    }
    buildFormData(formData, data, parentKey?) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                if (data.hasOwnProperty('dubplicatedItems')) {
                    for (let iter = 0; iter < data.dubplicatedItems.length; iter++) {
                      for (let j = 0; j < data.dubplicatedItems[iter].itemValue.length; j++) {
                        const element = data.dubplicatedItems[iter].itemValue[j];
                        formData.append(`${parentKey == undefined ? '' : parentKey}${data.dubplicatedItems[iter].itemKey}`, element);
                      }
                    }
                    delete data.dubplicatedItems;
                }
                this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }
    jsonToFormData(data) {
        const formData = new FormData();
        this.buildFormData(formData, data);
        return formData;
    }
}
