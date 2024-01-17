import { Component } from '@angular/core';
import { imports, providers } from '../Constants/Imports.utils'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports,
  providers
})

export class AppComponent {
  title = 'home';
}
