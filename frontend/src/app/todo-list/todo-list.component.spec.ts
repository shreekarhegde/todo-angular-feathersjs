import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthService } from "../auth.service";
describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthService] //fixing static injection error
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
