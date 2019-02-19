import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { TodoListComponent } from "./todo-list.component";
import { By } from "@angular/platform-browser";
describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css("p"));
    htmlElement = debugElement.nativeElement;
  });

  it("length of the todoTitle should be greater than 1 and less than 20 characters", () => {
    component.addTodo();
    const value = component.todoTitle.length;
    expect(value).toBeGreaterThan(1);
    expect(value).toBeLessThan(20);
  });
});
