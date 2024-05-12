import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '../../../../../environments/environment';
import { IUserPayload, IUser } from './models';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule],
    });

    usersService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getUsers debe realizar una paticion GET a {apiUrl}/users', () => {
    usersService.getUsers().subscribe({
      next: (resp) => {
        expect(Array.isArray(resp)).toBeTrue();
      },
    });
    httpTestingController
      .expectOne({
        method: 'GET',
        url: environment.baseUrl + 'users',
      })
      .flush([]);
  });

  it('createUser debe ejecutar POST a {apiUrl}/users', () => {
    const payload: IUserPayload = {
        id: null,
        person: {
            id: 1,
            firstName: "Alejandro",
            lastName: "Dreyer",
            email: "alejandro.dreyer91@gmail.com",
            createdAt: new Date(),
            bornDate: new Date("1991-01-04"),
            idNumber: 28456123,
            schoolLevel: "Secondary",
            streetName: "Callao",
            streetNumber: "973",
            floor: 2,
            department: "B"
          },
          rol: {
            id: 1,
            name: "admin"
          },
          name: "adreyer",
          password: "ale123"
    };

    const mockResp: IUser = {
        id: 1,
        person: {
        id: 1,
        firstName: "Alejandro",
        lastName: "Dreyer",
        email: "alejandro.dreyer91@gmail.com",
        createdAt: new Date(),
        bornDate: new Date("1991-01-04"),
        idNumber: 28456123,
        schoolLevel: "Secondary",
        streetName: "Callao",
        streetNumber: "973",
        floor: 2,
        department: "B"
      },
      role: {
        id: 1,
        name: "admin"
      },
      name: "adreyer",
      password: "ale123"
    };

    usersService.createUser(payload).subscribe((resp) => {
      expect(resp).toEqual(mockResp);
    });

    httpTestingController
      .expectOne({
        method: 'POST',
        url: environment.baseUrl + 'users',
      })
      .flush(mockResp);
  });
});