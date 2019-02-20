import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";

describe("AuthService", () => {
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
});
