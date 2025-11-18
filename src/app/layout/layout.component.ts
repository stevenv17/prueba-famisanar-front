import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  opened = false;
  toggleSidenav() {
    this.opened = !this.opened;
  }
}
