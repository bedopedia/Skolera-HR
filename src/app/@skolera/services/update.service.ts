import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class UpdateService {

    orderUpdate: Subject<string> = new Subject<string>();
   

    constructor() {
    }


    updateOrder(event:any) {
        this.orderUpdate.next(event);
    }

};