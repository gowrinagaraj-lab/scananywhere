import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScanCaptureComponent } from './components/scan-capture/scan-capture.component';
import { HeaderComponent } from './header/header.component';
import { ScannerService } from './scanner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ScanCaptureComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  barcode: string='';
  scanHistory: any=[];
  constructor(private scanner: ScannerService) {}
  ngOnInit(): void {
  this.scanner.scan$.subscribe(code => {
    this.barcode= code
     this.scanHistory.unshift(code); 
    console.log("SCAN RECEIVED:", code);
    
  });
    }
  title = 'pos';
}
