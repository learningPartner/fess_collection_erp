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

  initializeForm() {
    debugger;
    this.studentForm = new FormGroup({
      studid: new FormControl(0),
      name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      address: new FormControl(""),
      city: new FormControl(""),
      pinCode: new FormControl("")
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
