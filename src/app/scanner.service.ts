import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  private buffer = '';
  private lastTime = Date.now();

  // 🔥 Adjusted for iPad + HID scanners
  private interCharTimeout = 80;        // scanner = <10ms, human ~120ms
  private scanCompleteTimeout = 120;     // wait for end-of-scan

  private timer: any;

  private scanSubject = new Subject<string>();
  scan$ = this.scanSubject.asObservable();


  public isConnected = false;

  public handleKeyEvent(e: KeyboardEvent) {

    this.isConnected = true;

    const now = Date.now();

   
    if (now - this.lastTime > this.interCharTimeout) {
      this.buffer = ''; 
    }
    this.lastTime = now;

    if (e.key.length === 1) {
      this.buffer += e.key;
    }

    if (e.key === 'Enter') {
      this.emitScan();
      return;
    }
   clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.emitScan();
    }, this.scanCompleteTimeout);
  }

  /** Emit cleaned barcode only if it is valid */
  private emitScan() {
    let scanned = this.buffer.trim();
    this.buffer = '';
   if (!scanned) return;
   if (scanned.length < 4) return;
    if (!/^\d+$/.test(scanned)) return;
    console.log("📦 Barcode:", scanned);
    this.scanSubject.next(scanned);
  }
}
