import { Component } from '@angular/core';
import { ScannerService } from '../../scanner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
 last = '';

  constructor(private scanner: ScannerService) {}

  ngOnInit() {
    this.scanner.scan$.subscribe(code => this.last = code);
  }
}
