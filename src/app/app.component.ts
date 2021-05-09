// root component - displayed as the home page
import { Component } from '@angular/core';
//////////////////////////////////////////////////

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Movietron-Angular-client';
}
