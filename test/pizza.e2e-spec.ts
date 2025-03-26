import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

describe('PizzaController (e2e)', () => {
  let app: INestApplication;
  let createdPizzaId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/pizza/menu (GET) should return a list of pizza ingredients', async () => {
    const response = await request(app.getHttpServer())
      .get('/pizza/menu')
      .expect(200);

    expect(response.body).toHaveProperty('sizes');
    expect(response.body).toHaveProperty('sauces');
    expect(response.body).toHaveProperty('toppings');

    console.log('Menu: ', response.body);
  });

  it('/pizza (POST) should create a pizza', async () => {
    const createPizzaDto = {
      size: 'small',
      sauce: 'tomato',
      toppings: ['pepperoni', 'mushrooms'],
    };

    const response = await request(app.getHttpServer())
      .post('/pizza')
      .send(createPizzaDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.size.name).toBe(createPizzaDto.size);
    expect(response.body.sauce.name).toBe(createPizzaDto.sauce);
    expect(response.body.toppings.map((t) => t.name)).toEqual(
      createPizzaDto.toppings,
    );

    console.log(
      `Pizza created with ID ${response.body.id} with size ${createPizzaDto.size}, sauce ${createPizzaDto.sauce}, and toppings ${createPizzaDto.toppings.join(', ')}.`,
    );

    createdPizzaId = response.body.id; // Store the created pizza ID for later use
  });

  it('/pizza/:id (DELETE) should remove a pizza from the database', async () => {
    await request(app.getHttpServer())
      .delete(`/pizza/${createdPizzaId}`)
      .expect(200);

    console.log(`Pizza with ID ${createdPizzaId} has been deleted.`);
  });

  afterAll(async () => {
    await app.close();
  });
});
