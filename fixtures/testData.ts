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

export const plans = {
  basic: { name: 'Basic Plan', price: '$49/month' },
  standard: { name: 'Standard Plan', price: '$89/month' },
  premium: { name: 'Premium Plan', price: '$149/month' },
};

export const errorMessages = {
  nameRequired: 'Full name is required.',
  emailInvalid: 'Please enter a valid email.',
  ageInvalid: 'Age must be between 18 and 99.',
  coverRequired: 'Please select a coverage type.',
};

export function generateUser(overrides: Partial<typeof validUser> = {}) {
  return { ...validUser, ...overrides };
}
