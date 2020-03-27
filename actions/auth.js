export const login = (user = '', trueFalse) => ({
  type: 'LOGIN',
  user: user,
  trueFalse: trueFalse,
});
