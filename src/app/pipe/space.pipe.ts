import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space'
})
export class SpacePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]) {
      if (value != null) {
        let str = value.toString();
        value = str.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      }
      return value;
  }

}
