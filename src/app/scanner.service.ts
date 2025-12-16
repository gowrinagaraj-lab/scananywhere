import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  private buffer = '';
  private lastTime = Date.now();
  private interCharTimeout = 40;
  private scanCompleteTimeout = 120;

  private timer: any;

  private scanSubject = new Subject<string>();
  scan$ = this.scanSubject.asObservable();

  /** Called by <app-scan-capture> input keydown */
  public handleKeyEvent(e: KeyboardEvent) {
    const now = Date.now();

    if (now - this.lastTime > this.interCharTimeout) {
      this.buffer = '';
    }
    this.lastTime = now;

    // Add chars
    if (e.key.length === 1) {
      this.buffer += e.key;
    }

    // Enter = end of scan
    if (e.key === 'Enter') {
      this.emitScan();
      return;
    }

    // Auto complete
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.buffer.length >= 3) {
        this.emitScan();
      }
    }, this.scanCompleteTimeout);
  }

  private emitScan() {
    const scanned = this.buffer.trim();
    this.buffer = '';

    if (scanned) {
      this.scanSubject.next(scanned);
      console.log("📦 Scanned:", scanned);
    }
  }
}
