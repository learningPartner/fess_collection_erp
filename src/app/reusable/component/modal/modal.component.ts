import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Constant } from '../../../Constant/Constant';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() isEditMode: boolean = false;
  @Input() isOpenModal: boolean = false;
  @Input() itemData: any = {};
  @Output() onSave = new EventEmitter<any>();

  studentService = inject(StudentService);

  form: FormGroup;
  modalFormInputs = Constant.modalForm;

  constructor(private fb: FormBuilder) {
    this.form = this.studentService.studentForm;
  }

  ngOnChanges() {}

  save() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }
  }

  closeModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
