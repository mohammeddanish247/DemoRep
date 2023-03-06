import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cap'
})
export class CapPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]) {
    return value.split("-").join(" ");
  }

}
