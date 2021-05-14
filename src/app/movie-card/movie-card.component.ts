import { Component, OnInit } from '@angular/core';
/////////////////////////////////////////////////
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
} from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

/**
 * MovieCardComponent is the main view of the app.
 * It makes a call to the Movietron database API to populate
 * the list of movies
 */
export class MovieCardComponent implements OnInit {
  // variable movies is declared as an array. movies returned from the API call will be kept here
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiDataFavMovie: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * ngOnInit() is called when Angular is done creating the component.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Get a list of all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Adds the movie to the user's list of favorites
   * @param id
   * @param title
   */

  addFavorite(id: string, title: string): void {
    this.fetchApiDataFavMovie.addFavMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Opens a small dialog usint the DirectorComponent that defines the genre of
   * the specific movie
   *
   * @param name
   * @param bio
   */
  showDirectorView(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio },
      width: '350px',
    });
  }
  /**
   * Opens a small dialog using the GenreComponent that shows the genre info of
   * the specific movie
   *
   * @param name
   * @param description
   */
  showGenreView(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name, description },
      width: '350px',
    });
  }

  /**
   * Opens a small dialog with all details about movie
   * @param title
   * @param description
   * @param director
   * @param genre
   */
  showMovieInfo(
    title: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(MovieInfoComponent, {
      data: { title, description, director, genre },
      width: '350px',
    });
  }
}
