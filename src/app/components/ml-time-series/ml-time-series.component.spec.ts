import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlTimeSeriesComponent } from './ml-time-series.component';

describe('MlTimeSeriesComponent', () => {
  let component: MlTimeSeriesComponent;
  let fixture: ComponentFixture<MlTimeSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MlTimeSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
