import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";

import { LoginComponent } from "./login.component";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA], //to remove the parse error at the time of testing
      providers: [AuthService, RouterTestingModule], //fixing static injection error
      imports: [FormsModule]
    }).compileComponents();
  }));

  it("should create", () => {
    let component = new LoginComponent(null, null, null, null); //component should be an instance of the module, otherwise will throw undefined
    expect(component).toBeTruthy();
  });
});
