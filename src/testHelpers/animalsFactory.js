import { randomInteger } from "../helpers/numberHelper";

export const mockAnimals = ["dog", "cat", "bird"];
export const mockAnimal = mockAnimals[randomInteger(0, mockAnimals.length)];
