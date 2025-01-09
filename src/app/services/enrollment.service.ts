import { inject, Injectable } from '@angular/core';
import { IEnrollments } from '../Model/dashboardData';
import { GenericService } from './generic.service';
import { Constant } from '../Constant/Constant';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  generic = inject(GenericService<IEnrollments>);
  http = inject(HttpClient);

  constructor() {
    this.loadEnrollments();
  }

  loadEnrollments(): Observable<IEnrollments[]> {
    return this.http.get<IEnrollments[]>(
      Constant.API_METHOD.ENROLLMENT.GET_ENROLLMENTS
    );
  }
}
