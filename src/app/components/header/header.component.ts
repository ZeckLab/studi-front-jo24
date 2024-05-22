import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: '/src/scss/components/header.scss',
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(protected modalService: ModalService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
