import { Component, OnInit, Input } from '@angular/core';
///////////////////////////////////////////////////////
// to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings the API calls already created
import { UserRegistrationService } from '../fetch-api-data.service';

// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//Component decorator to tell the Angular that the class UserRegistr... is a component,  The decorator contains instructions for wiring up the class with its stylesheet and template file
@Component({
  // selector property defines the custom HTML element, into which this component will render, This makes it possible to use it in another HTML template file
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  // Input decorator defines the component's input,
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // method that is called once the component has received all its inputs(data-bound properties) from real-life user
  ngOnInit(): void {}

  // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for successful user registration goes here
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
