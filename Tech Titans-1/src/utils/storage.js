import usersData from '../data/users.json';

// In a real application, this would be an API call
// For this demo, we'll simulate file operations using localStorage
const STORAGE_KEY = 'users_data';

// Initialize storage with default data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersData));
}

export const getUsers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data).users : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ users }));
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const isEmailTaken = (email) => {
  return !!findUserByEmail(email);
}; 