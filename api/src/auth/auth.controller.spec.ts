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
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates login to the service', () => {
    const dto = { email: 'user@mail.com', password: 'secret' };
    controller.login(dto);

    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('delegates validateToken to the service', () => {
    const dto = { token: 'jwt-token' };
    controller.validateToken(dto);

    expect(authService.validateToken).toHaveBeenCalledWith(dto);
  });
});
