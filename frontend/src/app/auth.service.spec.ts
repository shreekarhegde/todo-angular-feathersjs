import { TestBed, fakeAsync, ComponentFixture } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
describe("AuthService", () => {
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [MatSnackBar, HttpClient, MatSnackBarModule]
    })
  );

  it("should be created", () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it("should set the value of token to string", fakeAsync(() => {
    const service: AuthService = TestBed.get(AuthService);
    service._accessToken = "a";
    expect(typeof service._accessToken).toBe(typeof "a");
  }));
});
