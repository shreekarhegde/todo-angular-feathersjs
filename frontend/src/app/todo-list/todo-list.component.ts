import { Component, OnInit, NgModule } from "@angular/core";
import { Todo } from "../interfaces/todo";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todos: Array<any>;
  //todos: Todo[] ?
  todoTitle: string;
  filter: string;
  userID: string;
  accessToken: string;
  headerParams: object;
  url: string;
  query: string;
  private loading: boolean;
  private visible: boolean;
  private show: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.visible = false;
    this.show = true;
    this.todoTitle = "";
    this.todos = [];
    this.filter = "all";
    this.userID = this.authService.userID;
    this.accessToken = this.authService.accessToken;

    console.log("todo init: accessToken -->", this.accessToken);
    console.log("todo init: userID -->", this.userID);

    this.query = "/?userID=" + this.userID;
    this.url = "http://localhost:3030/todos";

    console.log("todo init: final url -->", this.url + this.query);

    this.headerParams = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.accessToken
      })
    };
    setTimeout(() => {
      this.loading = false;
      this.visible = true;
      this.show = false;
    }, 3000);

    let response = this.http.get(this.url + this.query, this.headerParams);
    response.subscribe(
      todos => {
        console.log("from get api", todos);
        this.todos = this.todos.concat(todos["data"]);
      },
      err => {
        console.log("todolist: ngOniniterr---->", err);
      }
    );
  }

  addTodo(): void {
    if (this.todoTitle !== " ") {
      const data = {
        caption: this.todoTitle,
        isCompleted: false,
        editing: false
      };
      let response = this.http.post(this.url, data, this.headerParams);
      response.subscribe(
        todos => {
          console.log(todos, "from post api");
          this.todos = this.todos.concat(todos);
        },
        err => {
          console.log("todolist: addTodo---->", err);
        }
      );
    }
  }

  deleteTodo(id: number): void {
    console.log(id);
    let response = this.http.delete(`${this.url}/${id}`, this.headerParams);
    response.subscribe(
      todos => {
        console.log(todos, "from delete api");
        this.todos = this.todos.filter(todo => todo._id !== id);
      },
      err => {
        console.log("todolist: deleteTodoerr---->", err);
      }
    );
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  doneEdit(todo: Todo) {
    todo.editing = false;
    console.log(todo._id, todo.caption, "todo");
    let response = this.http.patch(
      `${this.url}/${todo._id}`,
      todo,
      this.headerParams
    );
    response.subscribe(
      todos => {
        console.log(todos, "from edit api");
      },
      err => {
        console.log("todolist: doneEdit---->", err);
      }
    );
  }

  remaining(): number {
    return this.todos.filter(todo => todo.isCompleted == false).length;
  }

  todosFiltered(): Todo[] {
    if (this.filter == "all") {
      return this.todos;
    } else if (this.filter == "active") {
      return this.todos.filter(todo => !todo.isCompleted);
    } else if (this.filter == "completed") {
      return this.todos.filter(todo => todo.isCompleted);
    }
  }

  delteAll(): void {
    let response = this.http
      .delete(this.url + this.query, this.headerParams)
      .subscribe(
        res => {
          this.todos = [];
        },
        err => {
          console.log("todolist: deleteAll---->", err);
        }
      );
  }
  markAllasComplete(): any {
    this.todos = this.todos.map(todo => {
      console.log(todo);
      // todo.isCompleted = true;
    });
  }
}
