import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: '/src/scss/components/header.scss',
})
export class HeaderComponent {
  isMenuOpen = false;
  userIsAuthenticated = false;
  private authListenerSubs: any;

  isAdmin = false;
  private adminListenerSubs: any;

  constructor(protected modalService: ModalService, private authService: AuthenticateService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // logout the user
  logout() {
    this.authService.logoutUser();
  }

  login() {
    this.modalService.open('login');
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated;
    // listen to the status of the authentication
    this.authListenerSubs = this.authService.getStatusAuthListener.subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.isAdmin = this.authService.getIsAdmin;
    // listen to the status of the authentication
    this.adminListenerSubs = this.authService.getAdminAuthListener.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
