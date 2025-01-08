import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IDashboarddata } from '../Model/dashboardData';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../Constant/Constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  generic = inject(GenericService<IDashboarddata>);
  http = inject(HttpClient);
  constructor() {}

  loadDashboardData(): Observable<IDashboarddata[]> {
    return this.http.get<IDashboarddata[]>(
      Constant.API_METHOD.DASHBOARD_DATA.GET_DASHBOARD_DATA
    );
  }
}