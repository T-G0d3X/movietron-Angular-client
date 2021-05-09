import { Component, OnInit, Input } from '@angular/core';
////////////////////////////////////////////////////
// to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// bring the API calls already created
import { UserLoginService } from '../fetch-api-data.service';

// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
/////////////////////////////////////////////////////////
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  // method that is called once the component has received all its inputs(data-bound properties) from real-life user
  ngOnInit(): void {}

  // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userLogIn(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        // adding current user and token to localStorage
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.snackBar.open('Logged In!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
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
