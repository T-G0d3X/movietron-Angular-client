import { Component, OnInit } from '@angular/core';
//////////////////////////////////////////////////
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
//////////////////////////////////////////////////
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
//////////////////////////////////////////////////

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  // passed the Angular Material dialog in the constructor as an argument so that it's available for use in this component
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  // function that will open the user registration dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
