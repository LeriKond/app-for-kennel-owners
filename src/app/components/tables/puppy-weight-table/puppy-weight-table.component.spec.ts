import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyWeightTableComponent } from './puppy-weight-table.component';

describe('PuppyWeightTableComponent', () => {
  let component: PuppyWeightTableComponent;
  let fixture: ComponentFixture<PuppyWeightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyWeightTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuppyWeightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
