import faker from 'faker';
import { User } from '../domain/user';

let users: User[] = [];

function generateUsers(count) {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    // eslint-disable-line
    let firstName;
    let imageUrl;
    const random = faker.random.number(2);
    const lastName = faker.name.lastName();
    if (random === 1) {
      firstName = faker.name.firstName(1);
      imageUrl = `http://api.randomuser.me/portraits/lego/${faker.random.number(9)}.jpg`;
      // imageUrl = `https://api.adorable.io/avatars/400/${firstName}-${lastName}`;
    } else {
      firstName = faker.name.firstName(0);
      imageUrl = `http://api.randomuser.me/portraits/lego/${faker.random.number(9)}.jpg`;
      // imageUrl = `https://api.adorable.io/avatars/400/${firstName}-${lastName}`;
    }
    users.push({
      id: 1000 + i,
      firstName,
      lastName,
      age: faker.random.number(100),
      email: `${firstName}.${lastName}@${faker.internet.domainName()}`.toLowerCase(),
      image: imageUrl,
      phone: faker.phone.phoneNumber(),
      company: faker.company.companyName(),
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
      },
    });
  }
  return users;
}

export const clearUsers = () => {
  users = [];
};

export const seedUsers = (numberOfUsers) => {
  users = generateUsers(numberOfUsers);
};

export const getAllUsers = (): User[] => {
  return users;
};

export const getUser = (id): User => {
  return users.find((user) => user.id === id);
};

export const deleteUser = (user: User): User[] => {
  users = users.filter((item) => user.id !== item.id);
  return users;
};

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};
