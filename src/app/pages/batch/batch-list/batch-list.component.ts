import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs';
import { Constant } from '../../../Constant/Constant';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, DatePipe],

  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent {
  batchService = inject(BatchService);

  totalBatches: IBatch[] = [];

  formBuilder = inject(FormBuilder);

  requiredMessage: string = 'This Is Required';

  validationConstant: any;

  timer = interval(5000);

  constructor() {
    this.validationConstant = Constant.VALIDATION_MESSAGE;
    this.initializeForm();
    this.getAllBatches();
    /*     this.timer.subscribe((res=>{
      alert("from interval")
    })) */
    setTimeout(() => {
      this.onEdit();
    }, 8000);

    /* setInterval(() => {
      const date  = new Date();
      alert(date.getTime())
    }, 4000); */
  }

  batchForm: FormGroup = this.formBuilder.group({
    batchId: ['', [Validators.required]],
    batchName: new FormControl(''),
    startDate: new FormControl(''),
    teacher: new FormControl(''),
    endDate: new FormControl(''),
  });

  onEdit(data?: any) {
    data = {
      batchId: 1,
      batchName: 'string',
      startDate: '2025-01-13T15:26:35.228Z',
      teacher: 'string',
      endDate: '2025-01-13T15:26:35.228Z',
    };
    this.initializeForm(data);
  }

  onSave() {
    this.batchForm.reset();
    this.batchForm = this.formBuilder.group({
      batchId: ['', [Validators.required]],
      batchName: new FormControl(''),
      startDate: new FormControl(''),
      teacher: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  initializeForm(data?: any) {
    this.batchForm = this.formBuilder.group({
      batchId: new FormControl(data !== undefined ? data.batchId : 0),
      batchName: new FormControl(data ? data.batchName : ''),
      startDate: new FormControl(''),
      teacher: new FormControl(''),
      endDate: new FormControl(''),
    });

    const form = this.batchForm.value;
  }

  getAllBatches() {
    this.batchService.loadBatches().subscribe((data: IBatch[]) => {
      if (data) {
        this.totalBatches = data;
      }
    });
  }

  openModal() {
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
