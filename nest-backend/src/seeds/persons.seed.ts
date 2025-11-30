// src/seeds/persons.seed.ts
import { DataSource } from 'typeorm';
import Person from '../persons/entities/person.entity';
import { SeedConfig } from './seed.config';

function randomInt(min: number, max: number): number {
  // inclusive min, inclusive max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedPersons(dataSource: DataSource, config: SeedConfig) {
  const personRepo = dataSource.getRepository(Person);

  // Clean slate (dev only!)
  await personRepo.delete({});

  // 1) Create N persons
  const persons: Person[] = [];

  for (let i = 1; i <= config.persons; i++) {
    const person = personRepo.create({
      // adapt these fields to your entity:
      name: `Person ${i}`,
      email: `person${i}@example.com`,
    });
    persons.push(person);
  }

  await personRepo.save(persons);

  // 2) Random friendships (ManyToMany self relation)
  const updatedPersons = [...persons];

  for (const p of updatedPersons) {
    const friendsCount = randomInt(
      config.minFriendsPerPerson,
      config.maxFriendsPerPerson,
    );

    const possibleFriends = updatedPersons.filter((x) => x.id !== p.id);
    const picked: Person[] = [];

    for (let i = 0; i < friendsCount && possibleFriends.length > 0; i++) {
      const idx = randomInt(0, possibleFriends.length - 1);
      const friend = possibleFriends.splice(idx, 1)[0];
      // avoid duplicates
      if (!picked.find((f) => f.id === friend.id)) {
        picked.push(friend);
      }
    }

    p.friends = picked; // assumes `friends: PersonEntity[];` on entity
  }

  await personRepo.save(updatedPersons);

  return updatedPersons;
}
