import { Component, ElementRef, Inject, inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { interval } from 'rxjs';
import { Constant } from '../../../Constant/Constant';
import { ConstPipe } from '../../../pipes/const.pipe';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { DatePipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, DatePipe, NgIf,FormsModule,RouterLink],

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
  constructor(private datePipe: DatePipe,private router:Router) {
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
  editBatch(batchId: number): void {
    console.log('Editing user:', batchId);
    this.router.navigate(['/admin/enrollments',batchId ]); // Pass the ID in the route
  }
}
