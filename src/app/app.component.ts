import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScanCaptureComponent } from './components/scan-capture/scan-capture.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ScanCaptureComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
  console.log('app starts');
    }
  title = 'pos';
}
