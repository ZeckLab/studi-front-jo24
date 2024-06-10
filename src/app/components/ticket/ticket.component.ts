import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: '/src/scss/components/ticket.scss'
})
export class TicketComponent {
  @Input() ticket: any = {};
  @Input() orderName!: string;
  @Input() loaded: boolean = true;

  constructor() {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit'+ this.orderName);
    console.log(this.loaded);
    if (this.loaded) {
      this.loadQrCode();
    }
  }

  loadQrCode() {
    let qrcode = this.ticket.qrcode;
    let id = 'img-qrcode'+this.orderName;
    let div = document.getElementById(id);

    if (div) {
      div.appendChild(new DOMParser().parseFromString(qrcode, 'image/svg+xml').documentElement);
    }
  }
  
}
