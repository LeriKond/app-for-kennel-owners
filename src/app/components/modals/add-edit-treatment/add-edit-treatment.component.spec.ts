import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTreatmentComponent } from './add-edit-treatment.component';

describe('AddEditTreatmentComponent', () => {
  let component: AddEditTreatmentComponent;
  let fixture: ComponentFixture<AddEditTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
