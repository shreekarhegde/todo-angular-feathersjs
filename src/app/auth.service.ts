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
    return this._userID;
  }

  set userID(userId: string) {
    this._userID = userId;
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(token: string) {
    this._accessToken = token;
  }

  setAuthVars(token) {
    const accessToken = token.accessToken;
    const userId = token.id;
    console.log("getToken: accessToken -->second response", accessToken);
    console.log("getToken: userID -->second response", userId);
    this.userID = userId;
    this.accessToken = accessToken;

    // return this.http
    //   .get(`http://localhost:3030${url}`, {
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/json",
    //       Authorization: accessToken
    //     })
    //   })
    //   .pipe(catchError(this.handleError));
  }
}
