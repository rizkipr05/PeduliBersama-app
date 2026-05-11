import { Test, TestingModule } from '@nestjs/testing';
import { BencanaController } from './bencana.controller';
import { BencanaService } from './bencana.service';

describe('BencanaController', () => {
  let controller: BencanaController;

  const bencanaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadPhoto: jest.fn(),
    setNeeds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BencanaController],
      providers: [
        {
          provide: BencanaService,
          useValue: bencanaService,
        },
      ],
    }).compile();

    controller = module.get<BencanaController>(BencanaController);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates create to the service', () => {
    const dto = { token: 'admin-token', title: 'Banjir Jakarta' };
    controller.create(dto);

    expect(bencanaService.create).toHaveBeenCalledWith(dto);
  });

  it('delegates update to the service with id', () => {
    const dto = { id: 4, token: 'admin-token', status: 'COMPLETED' };
    controller.update(dto);

    expect(bencanaService.update).toHaveBeenCalledWith(4, dto);
  });

  it('maps bearer token for list http route', () => {
    controller.findAllHttp('Bearer admin-token');

    expect(bencanaService.findAll).toHaveBeenCalledWith({
      token: 'admin-token',
    });
  });

  it('maps path param for upload photo http route', () => {
    controller.uploadPhotoHttp(
      '3',
      { photoUrl: 'https://img.test/3.jpg' },
      'Bearer admin-token',
    );

    expect(bencanaService.uploadPhoto).toHaveBeenCalledWith({
      disasterId: 3,
      photoUrl: 'https://img.test/3.jpg',
      token: 'admin-token',
    });
  });
});
