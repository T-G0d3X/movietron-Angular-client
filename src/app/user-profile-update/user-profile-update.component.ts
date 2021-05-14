import { Component, OnInit, Input } from '@angular/core';
//////////////////////////////////////////////////
import { EditUserService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserProfileUpdateComponent allows users to edit their profile information
 */

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss'],
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchEditUserData: EditUserService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Sends updated user information to the database and refreshes the page so the user can check updated information
   */
  editUser(): void {
    this.fetchEditUserData.editUser(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();
        localStorage.setItem('user', res.Username);
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (res) => {
        console.log(res);
        this.snackBar.open(res, 'OK', {
          duration: 2000,
        });
      }
    );
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}
