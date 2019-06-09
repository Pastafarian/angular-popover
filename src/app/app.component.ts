import { Component, OnInit } from '@angular/core';

export class Item {
  Name: string;
  Logo: string;
  Investment: string;
  Value: string;
  ROI: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-popover';

  item: Item;

  ngOnInit(): void {
    this.item = new Item();
    this.item.Name = 'IBM';
    this.item.Logo = 'https://cdn.iconscout.com/icon/free/png-128/spotify-26-569222.png';
    this.item.Investment = '£1345,000';
    this.item.Value = '£24545,000';
    this.item.ROI = '6%';
  }
}
