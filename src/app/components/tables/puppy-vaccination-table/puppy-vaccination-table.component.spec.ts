import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyVaccinationTableComponent } from './puppy-vaccination-table.component';

describe('PuppyVaccinationTableComponent', () => {
  let component: PuppyVaccinationTableComponent;
  let fixture: ComponentFixture<PuppyVaccinationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyVaccinationTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuppyVaccinationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
