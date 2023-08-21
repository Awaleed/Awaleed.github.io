import { faker } from "@faker-js/faker";

export const images: string[] = [
  faker.image.url(),
  faker.image.url(),
  faker.image.url(),
  faker.image.url(),
];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
