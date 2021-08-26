// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
}