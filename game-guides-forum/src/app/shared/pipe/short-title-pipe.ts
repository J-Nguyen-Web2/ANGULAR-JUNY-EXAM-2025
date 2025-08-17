import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ // ние слагаме директивата, за да си е имплементира от ANgular
    name: 'shortTitle' // ние задаваме name
})
export class    ShortTitlePipe implements PipeTransform {
    transform(value: string, maxLenght: number = 15): string {
        if (!value) {
            return '';
        }

        return value.length > maxLenght ? value.slice(0, maxLenght) + '...' : value;
    }
}
