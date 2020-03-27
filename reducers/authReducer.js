const INITIAL_STATE = [
  {username: 'Anonymous', password: '123456', loggedIn: false},
];

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      return state.map(user =>
        user.username === action.username && user.password === action.password
          ? {...user, loggedIn: !user.loggedIn}
          : user,
      );
    }
    case 'REGISTER': {
      return [
        ...state,
        {
          username: action.username,
          password: action.password,
          loggedIn: true,
        },
      ];
    }
    case 'LOGOUT': {
      return state.map(user =>
        user.username === action.username
          ? {...user, loggedIn: !user.loggedIn}
          : user,
      );
    }
    default:
      return state;
  }
};
// Exports
export default authReducer;
