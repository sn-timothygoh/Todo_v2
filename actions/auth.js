export const login = (username, password) => ({
  type: 'LOGIN',
  username: username,
  password: password,
});

export const register = (username, password) => ({
  type: 'REGISTER',
  username: username,
  password: password,
});

export const logout = username => ({
  type: 'LOGOUT',
  username,
});
