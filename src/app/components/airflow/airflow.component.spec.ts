import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirflowComponent } from './airflow.component';

describe('AirflowComponent', () => {
  let component: AirflowComponent;
  let fixture: ComponentFixture<AirflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
