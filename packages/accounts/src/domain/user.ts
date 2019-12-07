export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  image: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}
