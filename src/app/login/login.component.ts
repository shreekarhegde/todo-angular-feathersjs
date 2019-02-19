import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";

// import { User } from "../interfaces/user";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule]
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None
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
    private http: HttpClient,
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

    // this.authService.getToken("/todos", token).subscribe(res => {
    //   console.log("get: token-------->third response", res);
    //   if (res) {
    //     this.router.navigate(["/todos"]);
    //   }
    // });

    // user_auth.subscribe(token => {
    //   console.log(token, "res from auth api");
    //   if (token["accessToken"]) {
    //     this.router.navigate(["/users/:id/todos"]);
    //   } else if (
    //     f.value.email.trim().length == 0 &&
    //     f.value.password.trim().length == 0
    //   ) {
    //     const snackbarRef = this.snackbar.open(
    //       "Please enter user name and password",
    //       "OK"
    //     );
    //   } else {
    //     const snackbarRef = this.snackbar.open("login failed!", "Try again");
    //   }
    // });
  }
}
