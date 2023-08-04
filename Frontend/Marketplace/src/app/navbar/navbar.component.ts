import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
showMe :boolean =true
ngOnInit(){}
toogleTag(){
  this.showMe =!this.showMe;
}
}
