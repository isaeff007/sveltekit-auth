// in-memory database for storing the user data and the sessions
// prefixed with _, which indicates that this is not an endpoint but a normal JS file.

import { v4 as uuid4 } from 'uuid';

const users = [
  {
    email: 'mail@example.com',
    password: 'notascret',
  },
];

let sessions = [];

export const getUserByEmail = async (email) => {
  const existingUser = users.find((u) => u.email === email);
  if (!existingUser) return Promise.resolve(null);
  return Promise.resolve(existingUser);
};

export const registerUser = async (user) => {
  const existingUser = users.some((u) => u.email === user.email);
  if (!!existingUser) {
    return Promise.reject(new Error('User with this email already exists'));
  }
  users.push(user);
  return Promise.resolve(user);
};

export const createSession = (email) => {
  const session = {
    id: uuid4(),
    email,
  };
  sessions.push(session);
  console.log('Sessions:', sessions);
  return Promise.resolve(session);
};

export const getSession = (id) => {
  const session = sessions.find((s) => s.id === id);
  if (!session) {
    return Promise.resolve(null);
  }
  return Promise.resolve(session);
};

export const removeSession = (id) => {
  const session = sessions.find((s) => s.id === id);
  if (!session) {
    return Promise.reject(new Error('Session not found'));
  }
  sessions = sessions.filter((s) => s.id !== id);
  return Promise.resolve(session);
};
