import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ScannerConfig {
  interKeyDelayMs: number;
  terminatorKey: string | null;
  minLength: number;
}
@Injectable({
  providedIn: 'root'
})
export class ScannerService {


  private buffer = '';
  private lastTime = Date.now();

  private interCharTimeout = 40;     // ms between characters
  private scanCompleteTimeout = 120; // ms after last key

  private scanSubject = new Subject<string>();
  scan$ = this.scanSubject.asObservable();

  private timer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('keydown', this.onKeyDown, true);
    }
  }

  /** Global keydown handler */
  private onKeyDown = (e: KeyboardEvent) => {
    const now = Date.now();

    // If typing is slow, reset buffer (human typing)
    if (now - this.lastTime > this.interCharTimeout) {
      this.buffer = '';
    }

    this.lastTime = now;

    // Printable characters only
    if (e.key && e.key.length === 1) {
      this.buffer += e.key;
    }

    // ENTER → scan terminator (most scanners)
    else if (e.key === 'Enter') {
      this.emitScan();
      return;
    }

    // Auto-complete fallback (no Enter)
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.buffer.length > 2) {
        this.emitScan();
      }
    }, this.scanCompleteTimeout);
  };

  /** Emit scan and reset buffer */
  private emitScan() {
    const scannedValue = this.buffer.trim();
    this.buffer = '';

    if (scannedValue) {
      this.scanSubject.next(scannedValue);
      console.log('📦 Barcode scanned:', scannedValue);
    }
  }

  /** Optional cleanup */
  destroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('keydown', this.onKeyDown, true);
    }
  }
}
