import { Pipe, PipeTransform } from '@angular/core';
import { Constant, VALIDATION_MESSAGE } from '../Constant/Constant';

@Pipe({
  name: 'const'
})
export class ConstPipe implements PipeTransform {

  student: any = {
    name:'',
    mobvile:''
  };


  transform(keyName: string): string {
    this.student['city'] = "pune";

    const dsfsd =  this.student[keyName];

    return VALIDATION_MESSAGE[keyName] || 'Invalid key'
  }

}
