import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'studi-front-jo24';

  constructor(protected modalService: ModalService) {}
}
