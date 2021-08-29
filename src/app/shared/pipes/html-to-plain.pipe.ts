import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlToPlain'
})

export class htmlToPlain implements PipeTransform {
    transform(value: string): any {
        value = value.replace(/<.*?>/g, ''); // replace tags
        value = value.replace(/&.*;/g, ''); // replace tags
        return value;
        
    }
}