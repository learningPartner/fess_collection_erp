import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesComponent } from './batches.component';

describe('BatchesComponent', () => {
  let component: BatchesComponent;
  let fixture: ComponentFixture<BatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
