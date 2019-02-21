import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  inject
} from "@angular/core/testing";
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
      schemas: [NO_ERRORS_SCHEMA], //to remove template parse errors
      imports: [MatSnackBarModule, HttpClientModule], //declaring third party module to remove template parse errors
      providers: [HttpClient, MatSnackBar, MatSnackBarModule]
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

  it("should call the ngOnInit method only once", () => {
    fixture.detectChanges();
    spyOn(component, "ngOnInit");
    fixture.componentInstance.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  });

  it("value of the variables loading,visible and show should be true,false and true respectively after 3 seconds", fakeAsync(() => {
    expect(fixture.componentInstance.loading).toBe(true);
    expect(fixture.componentInstance.visible).toBe(false);
    expect(fixture.componentInstance.show).toBe(true);

    setTimeout(() => {
      fixture.componentInstance.loading = false;
      fixture.componentInstance.visible = true;
      fixture.componentInstance.show = false;
    }, 3000);

    tick(3000); //triggers setTimeout

    expect(fixture.componentInstance.loading).toBe(false);
    expect(fixture.componentInstance.visible).toBe(true);
    expect(fixture.componentInstance.show).toBe(false);
  }));

  //use spy on method to test the parameters passed to a function
});
