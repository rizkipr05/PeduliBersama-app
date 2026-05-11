import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    register: jest.fn(),
    login: jest.fn(),
    adminLogin: jest.fn(),
    logout: jest.fn(),
    validateToken: jest.fn(),
    createUser: jest.fn(),
    findAllUsers: jest.fn(),
    findOneUser: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates login to the service', () => {
    const dto = { email: 'user@mail.com', password: 'secret' };
    controller.login(dto);

    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('maps bearer token for validateToken http route', () => {
    controller.validateTokenHttp({}, 'Bearer jwt-token');

    expect(authService.validateToken).toHaveBeenCalledWith({
      token: 'jwt-token',
    });
  });

  it('delegates validateToken to the service', () => {
    const dto = { token: 'jwt-token' };
    controller.validateToken(dto);

    expect(authService.validateToken).toHaveBeenCalledWith(dto);
  });

  it('delegates createUser to the service', () => {
    const dto = {
      token: 'admin-token',
      email: 'new@mail.com',
      password: 'secret',
      role: 'USER',
    };
    controller.createUser(dto);

    expect(authService.createUser).toHaveBeenCalledWith(dto);
  });

  it('delegates updateUser to the service with id', () => {
    const dto = { id: 7, token: 'admin-token', name: 'Updated' };
    controller.updateUser(dto);

    expect(authService.updateUser).toHaveBeenCalledWith(7, dto);
  });

  it('maps route params and bearer token for delete user http route', () => {
    controller.removeUserHttp('4', 'Bearer admin-token');

    expect(authService.removeUser).toHaveBeenCalledWith(4, {
      id: 4,
      token: 'admin-token',
    });
  });
});
