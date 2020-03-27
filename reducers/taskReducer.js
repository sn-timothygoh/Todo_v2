const todos = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return [
        ...state,
        {
          id: action.id,
          user: action.user,
          title: action.title,
          desc: action.desc,
          startDate: action.startDate,
          endDate: action.endDate,
          important: action.important,
          completed: false,
        },
      ];
    case 'EDIT_TASK':
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              title: action.title,
              desc: action.desc,
              startDate: action.startDate,
              endDate: action.endDate,
              important: action.important,
              completed: action.completed,
            }
          : todo,
      );
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.id);
    // case 'LIST_TODO':
    //   return state.map(todo =>
    //     todo.id === action.id ? {...todo, display: !todo.display} : todo,
    //   );
    case 'MARK_AS_DONE':
      return state.map(todo =>
        todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
      );
    default:
      return state;
  }
};

export default todos;
