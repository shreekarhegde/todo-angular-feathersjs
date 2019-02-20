import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes, ActivatedRoute } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthService } from "./auth.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterTestingModule } from "@angular/router/testing"; //
@NgModule({
  declarations: [AppComponent, TodoListComponent, LoginComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [RouterModule, RouterTestingModule], //router testing module is the ng-7 way of providing router module for testing
  providers: [AuthService, RouterTestingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
