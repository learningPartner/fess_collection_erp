import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs';
import { Constant } from '../../../Constant/Constant';
import { ConstPipe } from '../../../pipes/const.pipe';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { DatePipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, DatePipe, NgIf],

  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent implements OnInit {
  batchService = inject(BatchService);

  totalBatches: IBatch[] = [];
  isLoading = false;
  isLoadingData: boolean = true;

  formBuilder = inject(FormBuilder);

  requiredMessage: string = 'This Is Required';

  validationConstant: any;

  ngOnInit(): void {

    this.getAllBatches();

  }
  constructor() {
    this.validationConstant = Constant.VALIDATION_MESSAGE;
    this.initializeForm();
  }

  batchForm: FormGroup = this.formBuilder.group({
    batchId: ['', [Validators.required]],
    batchName: new FormControl(''),
    startDate: new FormControl(''),
    teacher: new FormControl(''),
    endDate: new FormControl(''),
  });

  onEdit(data?: any) {
    // data = {
    //   batchId: 1,
    //   batchName: 'string',
    //   startDate: '2025-01-13T15:26:35.228Z',
    //   teacher: 'string',
    //   endDate: '2025-01-13T15:26:35.228Z',
    // };
    // this.initializeForm(data);
  }

  saveBatch() {
    if (this.batchForm.invalid) {
      alert("Form is invalid. Please correct the errors.");
      return;
    }
    this.isLoading = true;
    const formValue = this.batchForm.value;
    console.log("FormData", formValue);
    this.batchService.createBatches(formValue).subscribe({
      next: (res: any) => {
        console.log("Batch saved successfully", res);
        alert("Batch screated successfully");
        this.closeModal();
        this.batchForm.reset();
        this.isLoading = false;
        this.getAllBatches();
      },
      error: (error: any) => {
        console.error("Error saving batch", error);
        this.isLoading = false;
      },
    });
  }


  initializeForm(data?: any) {
    this.batchForm = this.formBuilder.group({
      batchId: new FormControl(data?.data.batchId ?? 0, Validators.required),
      batchName: new FormControl(data ? data.batchName : '', Validators.required),
      startDate: new FormControl(data ? data.startDate : '', Validators.required),
      teacher: new FormControl(data ? data.teacher : '', Validators.required),
      endDate: new FormControl(data ? data.endDate : '', Validators.required)
    })
  }

  getAllBatches() {
    this.batchService.loadBatches().subscribe((data: IBatch[]) => {
      if (data) {
        this.totalBatches = data;
        this.isLoadingData = false;
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
