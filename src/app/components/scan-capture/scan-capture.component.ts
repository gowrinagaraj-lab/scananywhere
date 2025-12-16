import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScanInputDirective } from '../../directives/scan-input.directive';
import { ScannerService } from '../../scanner.service';

@Component({
  selector: 'app-scan-capture',
  standalone: true,
  imports: [],
  templateUrl: './scan-capture.component.html',
  styleUrl: './scan-capture.component.scss'
})
export class ScanCaptureComponent {
  lastScanned = '';
  private sub!: Subscription;
  barcodeValues: any=[];

  constructor(private scanner: ScannerService) {}

  ngOnInit() {
    this.sub = this.scanner.scan$.subscribe(code => {
      this.lastScanned = code;
      alert(this.lastScanned)
      this.handleScan(code);
    });
  }

  handleScan(barcode: string) {
    // 🔥 Your app logic
    // - Load product
    // - Add to batch
    // - Call API
    console.log('Handling scan:', barcode);
    this.barcodeValues.push(barcode)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
