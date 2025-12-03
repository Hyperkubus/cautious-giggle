import { DataSource } from 'typeorm';
import Person from '../persons/entities/person.entity';
import { SeedConfig } from './seed.config';
import { randomInt } from 'node:crypto';

export async function seedPersons(dataSource: DataSource, config: SeedConfig) {
  const personRepo = dataSource.getRepository(Person);

  const persons: Person[] = [];

  for (let i = 1; i <= config.persons; i++) {
    const person = personRepo.create({
      name: `Person ${i}`,
      email: `person${i}@example.com`,
    });
    persons.push(person);
  }

  await personRepo.save(persons);

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
      if (!picked.find((f) => f.id === friend.id)) {
        picked.push(friend);
      }
    }

    p.friends = picked;
  }

  await personRepo.save(updatedPersons);

  return updatedPersons;
}
