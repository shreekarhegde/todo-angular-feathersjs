import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBar } from "@angular/material";
import { Overlay } from "@angular/cdk/overlay";
import { HttpClientModule, HttpClient } from "@angular/common/http";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [MatSnackBar, Overlay, HttpClient],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("length of email should be greater than 2", () => {
    component["email"] = "test@gmail.com";
    expect(component.email.length).toBeGreaterThan(2);
  });
});
