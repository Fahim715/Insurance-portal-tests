export const validUser = {
  name: 'Arif Rahman',
  email: 'arif.rahman@email.com',
  age: '28',
  coverType: 'health',
};

export const youngUser = {
  name: 'Nadia Islam',
  email: 'nadia@example.com',
  age: '22',
  coverType: 'life',
};

export const invalidUsers = {
  emptyForm: { name: '', email: '', age: '', coverType: '' },
  badEmail:  { name: 'Test User', email: 'not-an-email', age: '30', coverType: 'auto' },
  underAge:  { name: 'Young User', email: 'young@email.com', age: '15', coverType: 'health' },
  overAge:   { name: 'Old User',   email: 'old@email.com',   age: '110', coverType: 'life' },
};
