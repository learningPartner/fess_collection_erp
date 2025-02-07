import { Component, ElementRef, inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { interval } from 'rxjs';
import { Constant } from '../../../Constant/Constant';
import { ConstPipe } from '../../../pipes/const.pipe';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, DatePipe, NgIf,FormsModule],

  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent implements OnInit {
  batchService = inject(BatchService);
  totalBatches: IBatch[] = [];
  isLoading = false;
  isEditMode: boolean = false
  isLoadingData: boolean = false;
  formBuilder = inject(FormBuilder);
  requiredMessage: string = 'This Is Required';
  validationConstant: any;
  searchQuery: string = '';
  ngOnInit(): void {

    this.getAllBatches();

  }
  constructor(private datePipe: DatePipe) {
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

  editBatch(data: any) {
    this.openModel();
    this.isEditMode = true;
    const formattedStartDate = this.datePipe.transform(data.startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(data.endDate, 'yyyy-MM-dd');
    this.batchForm.setValue({
      batchName: data.batchName,
      teacher: data.teacher,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      batchId: data.batchId
    });

  }
  saveBatch() {
    if (this.batchForm.invalid) {
      alert("Form is invalid. Please correct the errors.");
      return;
    }
    this.isLoading = true;
    const formValue = this.batchForm.value;
    console.log("FormData", formValue);

    if (this.isEditMode) {
      this.batchService.updateBatch(formValue.batchId, formValue).subscribe({
        next: (res: any) => {
          console.log("Batch updated successfully", res);
          alert("Batch updated successfully");
          const index = this.totalBatches.findIndex(batch => batch.batchId === formValue.batchId);
          if (index !== -1) {
            this.totalBatches[index] = { ...this.totalBatches[index], ...formValue };
          }
          this.batchForm.reset();
          this.isLoading = false;
          this.isEditMode = false;
          this.closeModal();
        },
        error: (error: any) => {
          console.error("Error updating batch", error);
          this.isLoading = false;
        },
        complete() {
          console.log("REsponsive completed");
        },
      })
    }
    else {
      delete formValue.batchId;
      this.batchService.createBatches(formValue).subscribe({
        next: (res: any) => {
          console.log("Batch saved successfully", res);
          alert("Batch screated successfully");
          this.batchForm.reset();
          this.isLoading = false;
          this.totalBatches.push(formValue);
          this.closeModal();
        },
        error: (error: any) => {
          console.error("Error saving batch", error);
          this.isLoading = false;
        },
      });
    }
  }
  deleteBatch(batchId: number) {
    if (confirm("Are you sure you want to delete this batch?")) {
      this.batchService.deleteBatch(batchId).subscribe({
        next: () => {
          alert("Batch deleted successfully!");
          this.totalBatches = this.totalBatches.filter(batch => batch.batchId !== batchId);
        },
        error: (error) => {
          console.error("Error deleting batch", error);
          alert(`Error deleting batch: ${error.message}`);

        }
      });
    }
  }

  initializeForm(data?: any) {
    this.batchForm = this.formBuilder.group({
      batchId: new FormControl(data?.data.batchId ?? 0),
      batchName: new FormControl(data ? data.batchName : '', Validators.required),
      startDate: new FormControl(data ? data.startDate : '', Validators.required),
      teacher: new FormControl(data ? data.teacher : '', Validators.required),
      endDate: new FormControl(data ? data.endDate : '', Validators.required)
    })
  }

  getAllBatches() {
    this.isLoadingData = true;

    this.batchService.loadBatches().subscribe({
      next: (data: IBatch[]) => {
        if (data) {
          this.totalBatches = data;
        }
        this.isLoadingData = false;
      },
      error: (error) => {
        console.error("Error fetching batches", error);
        this.isLoadingData = false;
        alert("Failed to load batches. Please try again.");
      }
    });
  }
  openModel() {
    this.isEditMode = false;
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
