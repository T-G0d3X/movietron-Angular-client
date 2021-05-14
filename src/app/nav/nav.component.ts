import { Component, OnInit } from '@angular/core';
/////////////////////////////////////////////////
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The NavComponent provides the navigtation for the app with links to profile page, sign out
 */

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit(): void {}

  /**
   * Logs the user out, removes their data from local storage, and returns them to login screen
   */
  logOut(): void {
    localStorage.clear;
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out', 'OK', {
      duration: 2000,
    });
  }
}
