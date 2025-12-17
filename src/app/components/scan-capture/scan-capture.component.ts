import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScannerService } from '../../scanner.service';

@Component({
  selector: 'app-scan-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scan-capture.component.html',
  styleUrl: './scan-capture.component.scss'
})
export class ScanCaptureComponent {

  @ViewChild('scanInput', { static: true }) scanInput!: ElementRef<HTMLInputElement>;

  private focusTimer: any;

  constructor(public scannerService: ScannerService) {}

  ngAfterViewInit() {
    this.forceFocus();

    // iPad Safari loses focus often → re-focus every 700ms
    this.focusTimer = setInterval(() => {
 
      const el = this.scanInput.nativeElement;
      if (document.activeElement !== el) {
        el.focus();
      }
    }, 700);
  }

  forceFocus() {
    const el = this.scanInput.nativeElement;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }

  onKeyDown(e: KeyboardEvent) {
    this.scannerService.handleKeyEvent(e);
  }

  ngOnDestroy() {
    clearInterval(this.focusTimer);
  }
}
