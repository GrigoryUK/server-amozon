import * as dotenv from 'dotenv';
import { PrismaClient, Product } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';
import { slugify } from './generate-slug';
import { getRandomArbitrary } from './random-number';

dotenv.config();
const prisma = new PrismaClient();

const createProducts = async (productsLength: number) => {
  const products: Product[] = [];

  for (let i = 0; i < productsLength; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: slugify(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        images: Array.from({ length: getRandomArbitrary(2, 6) }).map(() =>
          faker.image.imageUrl(),
        ),
        category: {
          create: {
            name: categoryName,
            slug: slugify(categoryName),
          },
        },
        reviews: {
          create: [
            {
              rating: faker.datatype.number({
                min: 1,
                max: 5,
              }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 2,
                },
              },
            },
            {
              rating: faker.datatype.number({
                min: 1,
                max: 5,
              }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 2,
                },
              },
            },
          ],
        },
      },
    });
    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

async function main() {
  console.log('Start seeding ...');

  await createProducts(10);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
