const authReducer = (state = [], action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      return {
        // State
        ...state,
        // Redux Store
        user: action.user,
        loggedIn: action.trueFalse,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default authReducer;
