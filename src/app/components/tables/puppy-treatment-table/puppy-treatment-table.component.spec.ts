import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyTreatmentTableComponent } from './puppy-treatment-table.component';

describe('PuppyTreatmentTableComponent', () => {
  let component: PuppyTreatmentTableComponent;
  let fixture: ComponentFixture<PuppyTreatmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyTreatmentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuppyTreatmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
