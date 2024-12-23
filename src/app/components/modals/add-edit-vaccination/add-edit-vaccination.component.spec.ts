import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVaccinationComponent } from './add-edit-vaccination.component';

describe('AddEditVaccinationComponent', () => {
  let component: AddEditVaccinationComponent;
  let fixture: ComponentFixture<AddEditVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditVaccinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
