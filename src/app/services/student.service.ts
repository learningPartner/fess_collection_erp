import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../Constant/Constant';
import { GenericService } from './generic.service';
import { Student } from '../Model/interface/Student';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  http = inject(HttpClient);

  studentForm: FormGroup = new FormGroup({});


  constructor(private generic: GenericService<Student>) {
    debugger;
    this.initializeForm();
  }

  initializeForm(data?: Student) {
    debugger;
    this.studentForm = new FormGroup({
      studid: new FormControl(data == undefined? 0: data.studid),
      name: new FormControl(data == undefined? "": data.name),
      email: new FormControl(data == undefined? "": data.email),
      phone: new FormControl(data == undefined? "": data.phone),
      address: new FormControl(data == undefined? "": data.address),
      city: new FormControl(data == undefined? "": data.city),
      pinCode: new FormControl(data == undefined? "": data.pinCode)
    })
  }

  createStudent() {
    const formValue=  this.studentForm.value;
    return this.http.post("https://projectapi.gerasim.in/api/InstituteManagement/CreateStudent",formValue);
  
  }


  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(
      environment.API_URL + Constant.API_METHOD.STUDENT.GET_ALL_STUDENT
    );
  }
}
