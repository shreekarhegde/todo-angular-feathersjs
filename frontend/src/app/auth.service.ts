import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { map, catchError } from "rxjs/operators";
import { Observable, of, Subject, throwError } from "rxjs";
import { User } from "./interfaces/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  private _userID: string;
  private _accessToken: string;

  serveHttpPost(url, data) {
    return this.http
      .post(`http://localhost:3030/${url}`, data)
      .pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("client side error---->", errorResponse.error.message);
    } else {
      console.log("server side error---->", errorResponse);
    }
    return throwError("there is a problem with this service");
  }

  get userID() {
    this._userID = JSON.parse(localStorage.getItem("user")).token.id;
    return this._userID;
  }

  get accessToken() {
    this._accessToken = JSON.parse(
      localStorage.getItem("user")
    ).token.accessToken;
    return this._accessToken;
  }
}
