import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../Constant/Constant';
import { GenericService } from './generic.service';
import { Student } from '../Model/interface/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  http = inject(HttpClient);
  constructor(private generic: GenericService<Student>) {}

  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(
      environment.API_URL + Constant.API_METHOD.STUDENT.GET_ALL_STUDENT
    );
  }
}
