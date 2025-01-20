import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from '../Constant/Constant';

@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  transform(keyValue: string, fieldName?: string): string {
    let message = Constant.VALIDATION_MESSAGE[keyValue];
    if (fieldName) {
      fieldName =
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();
      message = `${fieldName}${message}`;
    }
    return message;
  }
}
