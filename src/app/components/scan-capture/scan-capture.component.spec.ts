import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanCaptureComponent } from './scan-capture.component';

describe('ScanCaptureComponent', () => {
  let component: ScanCaptureComponent;
  let fixture: ComponentFixture<ScanCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanCaptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
