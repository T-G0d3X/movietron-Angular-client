import { Component, Inject, Input, OnInit } from '@angular/core';
//////////////////////////////////////////////////
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  GetAllMoviesService,
  GetUserService,
  DeleteUserService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // variable movies is declared as an array. movies returned from the API call will be kept here
  movies: any = [];
  favoriteMovies: any = [];
  user: any = {};

  constructor(
    public fetchApiDataAllMovies: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public fetchApiDataDeleteFav: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiDataUser.getUser().subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  // function used to fetch the movies from the GetAllMoviesService
  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavMovies();
    });
  }

  filterFavMovies(): void {
    this.favoriteMovies = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favoriteMovies;
  }

  removeFavMovie(id: string, title: string) {
    this.fetchApiDataDeleteFav.deleteFavMovie(id).subscribe(() => {
      this.snackbar.open(`${title} has been removed!`, 'OK', {
        duration: 2000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  deleteUser(): void {
    let confirmed = confirm('You sure you want to delete profile');
    if (confirmed) {
      this.fetchApiDataDeleteUser.deleteUser().subscribe(
        (result) => {
          console.log(result);
          this.snackbar.open('Your profile has been deleted.', 'OK', {
            duration: 3000,
          });
        },
        (result) => {
          this.snackbar.open(result, 'OK', {
            duration: 3000,
          });
        }
      );
      localStorage.clear();
      this.router.navigate(['welcome']);
    }
  }

  profileUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px',
    });
  }
}
