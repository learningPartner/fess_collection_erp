import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Model/Student';
import { environment } from '../../environments/environment.development';
import { Constant } from '../Constant/Constant';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private generic: GenericService<Student>) { 
    
  }


  getAllStudent(): Observable<Student[]> {
    return this.generic.get(environment.API_URL + Constant.API_METHOD.STUDENT.GET_ALL_STUDENT);
  }

}