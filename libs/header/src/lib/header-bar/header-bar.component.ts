import { Component, Input } from '@angular/core';

@Component({
  selector: 'smitestats-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent{
  @Input() title = '';
}
