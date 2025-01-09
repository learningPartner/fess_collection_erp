import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Constant } from '../Constant/Constant';
import { HttpClient } from '@angular/common/http';
import { IFeeDetail } from '../Model/interface/fees';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  generic = inject(GenericService<IFeeDetail>);
  http = inject(HttpClient);

  constructor() {
    this.loadFees();
  }

  loadFees(): Observable<IFeeDetail[]> {
    return this.http.get<IFeeDetail[]>(Constant.API_METHOD.PAYMENTS.GET_FEES);
  }
}
