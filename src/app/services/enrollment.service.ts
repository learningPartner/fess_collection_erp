import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Constant } from '../Constant/Constant';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICreateEnrollment, IGetEnrollments } from '../Model/interface/enrollments';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  generic = inject(GenericService<IGetEnrollments>);
  http = inject(HttpClient);

  constructor() {
    this.loadEnrollments();
  }

  loadEnrollments(): Observable<IGetEnrollments[]> {
    return this.http.get<IGetEnrollments[]>(
      Constant.API_METHOD.ENROLLMENT.GET_ENROLLMENTS
    );
  }
  createEnrollment(enrollmentData: ICreateEnrollment[], batchId: number): Observable<ICreateEnrollment[]> {
    return this.http.post<ICreateEnrollment[]>(Constant.API_METHOD.ENROLLMENT.CREATE_ENROLLMENT, {
      batchId, 
      enrollmentData
    });
  }
}
