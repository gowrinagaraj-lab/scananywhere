import { Directive, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScannerService } from '../scanner.service';


@Directive({
  selector: '[appScanInput]',
  standalone: true
})
export class ScanInputDirective {

 @Input('scanInput') mode: 'fill' | 'focus' = 'fill';

  private sub?: Subscription;

  constructor(private el: ElementRef<HTMLInputElement>, private scanner: ScannerService) {}

  ngOnInit() {
    this.sub = this.scanner.scan$.subscribe(code => {
      if (this.mode === 'fill') {
        this.el.nativeElement.value = code;
        this.el.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (this.mode === 'focus') {
        this.el.nativeElement.focus();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
