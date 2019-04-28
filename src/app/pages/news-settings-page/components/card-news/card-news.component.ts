import {Component, Input, OnInit} from '@angular/core';
import {PostItem} from '../../models/post-item';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss']
})
export class CardNewsComponent implements OnInit {

  @Input() data: PostItem;

  constructor() { }

  ngOnInit() {
  }
}
