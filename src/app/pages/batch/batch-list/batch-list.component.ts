import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { TableComponent } from '../../../reusable/component/table/table.component';
import { ITableData } from '../../../Model/interface/tableData';
@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, TableComponent],

  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent {
  batchService = inject(BatchService);

  totalBatches: IBatch[] = [];

  columnData: ITableData[] = [
    {
      fieldname: 'batchName',
      headername: 'Batch Name',
    },
    {
      fieldname: 'startDate',
      headername: 'Batch Start Date',
      isDate: true,
    },
    {
      fieldname: 'endDate',
      headername: 'Batch End Date',
      isDate: true,
    },
    {
      fieldname: 'teacher',
      headername: 'Teacher',
    },
  ];

  constructor() {
    this.initializeForm();
    this.getAllBatches();
  }

  batchForm: FormGroup = new FormGroup({});

  initializeForm(data?: any) {
    this.batchForm = new FormGroup({
      batchId: new FormControl(data?.batchId ?? 0, [Validators.required]),
      batchName: new FormControl(data?.batchName ?? ''),
      teacher: new FormControl(data?.teacher ?? ''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });

    const form = this.batchForm.value;
  }

  onSave() {
    let payload = this.batchForm.value;

    payload.startDate = new Date(payload.startDate).toISOString();
    payload.endDate = new Date(payload.endDate).toISOString();
    payload.batchId = 0;

    this.batchService.createBatches(payload).subscribe(() => {
      this.getAllBatches();
      this.closeModal();
    });
  }

  getAllBatches() {
    this.batchService.loadBatches().subscribe((data: IBatch[]) => {
      if (data) {
        this.totalBatches = data;
      }
    });
  }

  openModal() {
    this.batchForm.reset();
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
