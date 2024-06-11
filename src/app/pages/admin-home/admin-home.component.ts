import { Component } from '@angular/core';
import { ConstantsInfo } from '../../constantsInfo';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: '/src/scss/pages/admin-home.scss'
})
export class AdminHomeComponent {
  limit = ConstantsInfo.LIMIT_DISPLAY_ORDERS;
}
