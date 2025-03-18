import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlflowComponent } from './mlflow.component';

describe('MlflowComponent', () => {
  let component: MlflowComponent;
  let fixture: ComponentFixture<MlflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MlflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
