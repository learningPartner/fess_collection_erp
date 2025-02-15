import { inject, Injectable } from '@angular/core';
import { IBatch } from '../Model/interface/batch';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../Constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  generic = inject(GenericService<IBatch>);
  http = inject(HttpClient);

  constructor() {
    this.loadBatches();
  }

  loadBatches(): Observable<IBatch[]> {
    return this.http.get<IBatch[]>(Constant.API_METHOD.BATCH.GET_BATCH);
  }
}
