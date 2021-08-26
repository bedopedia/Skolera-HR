import { Injectable } from '@angular/core';

@Injectable()
export class AgeService {

    constructor() { }
    calculateAge(dob) {
        let dateOnOctober: any = new Date();
        dateOnOctober.setDate(1);
        dateOnOctober.setMonth(9);
        let difference = dateOnOctober - dob;
        let ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
