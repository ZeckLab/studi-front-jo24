import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header-admin.component.html',
  styleUrl: '/src/scss/components/header-admin.scss'
})
export class HeaderAdminComponent {
  userIsAuthenticated = false;
  isAdmin = false;
  private authListenerSubs: any;

  isCRUD = false;

  constructor(private authService: AuthenticateService, private router: Router) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated;
    this.isAdmin = this.authService.getIsAdmin;
    // listen to the status of the authentication
    this.authListenerSubs = this.authService.getStatusAuthListener.subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
    });

    // listen to the status of the authentication
    this.authListenerSubs = this.authService.getAdminAuthListener.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.authService.logoutUser();
  }

  toggle() {
    if (this.isCRUD) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/admin/offers']);
    }

    this.isCRUD = !this.isCRUD;
  }
}
