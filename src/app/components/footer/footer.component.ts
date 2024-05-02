import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: '/src/scss/components/footer.scss'
})
export class FooterComponent implements OnInit {

  partnersData:any;
  url: string = "../../../assets/data/official-partners-list.json";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.partnersData = data;
    });
  }

}
