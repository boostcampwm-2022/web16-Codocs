import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';

describe('Users', () => {
  let app: INestApplication;
  const userService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule]
    })
      .overrideProvider(userService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET user`, () => {
    return request(app.getHttpServer()).get('/user').expect(200).expect({
      data: userService.findAll()
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
