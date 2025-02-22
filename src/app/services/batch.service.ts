import { inject, Injectable } from '@angular/core';
import { IBatch } from '../Model/interface/batch';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../Constant/Constant';
import { Batch } from '../Model/class/batch';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  generic = inject(GenericService<IBatch>);
  http = inject(HttpClient);
  private apiUrl = environment.API_URL;
  constructor() {
    this.loadBatches();
  }

  loadBatches(): Observable<IBatch[]> {
    return this.http.get<IBatch[]>(Constant.API_METHOD.BATCH.GET_BATCH);
  }
 

  createBatches(batch:Batch): Observable<Batch[]> {
    return this.http.post<Batch[]>(environment.API_URL + Constant.API_METHOD.BATCHES.CREATE_BATCHES, batch);
  }

  updateBatch(batchId: number, batchData: Batch): Observable<Batch[]> {
    return this.http.put<Batch[]>(
      `${environment.API_URL}${Constant.API_METHOD.BATCHES.UPDATE_BATCHES}?id=${batchId}`,
      batchData
    );
  }
  
  deleteBatch(batchid: number) {
    return this.http.delete(environment.API_URL + Constant.API_METHOD.BATCHES.DELETE_BATCHES +'?id='+batchid)
  }
  getBatchById(batchId: number): Observable<Batch[]> {
    const url = `${this.apiUrl}/${Constant.API_METHOD.BATCHES.GETBATCHBYID}?id=${batchId}`;
    return this.http.get<Batch[]>(url);
  }
}
