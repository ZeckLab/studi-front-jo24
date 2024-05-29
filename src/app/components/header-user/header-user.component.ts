import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header-user.component.html',
  styleUrl: '/src/scss/components/header-user.scss'
})
export class HeaderUserComponent {
  userIsAuthenticated = false;
  private authListenerSubs: any;

  constructor(private authService: AuthenticateService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated;
    // listen to the status of the authentication
    this.authListenerSubs = this.authService.getStatusAuthListener.subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
