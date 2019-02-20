import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
// import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
// import { AuthService } from "../auth.service";

import { MatSnackBar, MatSnackBarModule } from "@angular/material";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      schemas: [NO_ERRORS_SCHEMA], //trying to remove template parse errors-> not working
      imports: [MatSnackBarModule, HttpClientModule], //declaring third party module to remove template parse errors-> not working
      providers: [
        HttpClient,
        // ActivatedRoute,
        MatSnackBar,
        MatSnackBarModule
        // RouterModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
