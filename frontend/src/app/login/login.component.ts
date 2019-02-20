import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None //removes default properties of set by angular for external packages like snackbar and spinner
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public users: Array<any>;
  //public users: Array<User> ??
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.email = "";
    this.password = "";
    this.users = [];
  }
  loginUser(f: NgForm): void {
    this.email = f.value.email ? f.value.email : " ";
    this.password = f.value.password ? f.value.password : " ";

    if (this.email !== " " && this.password !== " ") {
      const login_credentials = {
        strategy: "local",
        email: this.email,
        password: this.password
      };
      this.authService
        .serveHttpPost("authentication", login_credentials)
        .subscribe(
          token => {
            console.log("login user: first response------>", token);
            if (token["accessToken"].length !== 0) {
              localStorage.setItem("user", JSON.stringify({ token: token }));
              const snackbarRef = this.snackbar.open("Login successfull!", "", {
                duration: 2000,
                verticalPosition: "top",
                panelClass: "login-snackbar"
              });
              this.router.navigate(["/todos"]);
            }
          },
          err => {
            console.log("loginUser------>", err);
            const snackbarRef = this.snackbar.open(
              "login failed",
              "Try again",
              {
                duration: 2000,
                verticalPosition: "top",
                panelClass: "login-snackbar"
              }
            );
          }
        );
    } else {
      const snackbarRef = this.snackbar.open(
        "Please enter valid user name and password",
        "OK",
        {
          duration: 2000,
          verticalPosition: "top",
          panelClass: "login-snackbar"
        }
      );
    }
  }
}
