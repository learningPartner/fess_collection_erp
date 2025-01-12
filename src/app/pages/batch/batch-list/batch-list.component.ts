import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import{ interval } from 'rxjs'
@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule],
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss'
})
export class BatchListComponent {

 

  formBuilder =  inject(FormBuilder);

  timer = interval(5000);

  constructor() {
    this.initializeForm();
    this.timer.subscribe((res=>{
      alert("from interval")
    }))
    setTimeout(() => {
      this.onEdit()
    }, 8000);

    setInterval(() => {
      const date  = new Date();
      alert(date.getTime())
    }, 4000);

  }

  batchForm: FormGroup = this.formBuilder.group({ 
    batchId: ['',[Validators.required]],
    batchName:new FormControl(""),
    startDate:new FormControl(""),
    teacher:new FormControl(""),
    endDate:new FormControl("")
  })

  onEdit(data?: any) {
    debugger;
    data=  {
      "batchId": 1,
      "batchName": "string",
      "startDate": "2025-01-13T15:26:35.228Z",
      "teacher": "string",
      "endDate": "2025-01-13T15:26:35.228Z"
    } 
    this.initializeForm(data)
  }

  onSave() {
    this.batchForm.reset();
    this.batchForm= this.formBuilder.group({ 
      batchId: ["",[Validators.required]],
      batchName:new FormControl(""),
      startDate:new FormControl(""),
      teacher:new FormControl(""),
      endDate:new FormControl("")
    })
  }

  initializeForm(data?: any) {
    debugger;
    this.batchForm = this.formBuilder.group({ 
        batchId: new FormControl(data !== undefined ? data.batchId: 0),
        batchName:new FormControl(data? data.batchName: ''),
        startDate:new FormControl(""),
        teacher:new FormControl(""),
        endDate:new FormControl("")
    })

    const form= this.batchForm.value;
  }

}
