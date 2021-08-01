import { Component, Input } from '@angular/core';

@Component({
  selector: 'smitestats-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {

  @Input() pageTitle = '';
  @Input() imageUrl = '';

}
