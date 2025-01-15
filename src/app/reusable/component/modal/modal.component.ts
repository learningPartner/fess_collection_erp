import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Constant } from '../../../Constant/Constant';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isEditMode: boolean = false;
  @Input() itemData: any = {};
  @Output() onSave = new EventEmitter<any>();

  form: FormGroup;
  modalFormInputs = Constant.modalForm;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
    });
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
