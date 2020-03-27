let taskId = 0;

export const createTask = (
  user,
  title,
  desc,
  startDate,
  endDate,
  important,
  completed,
) => ({
  type: 'CREATE_TASK',
  id: taskId++,
  user,
  title,
  desc,
  startDate,
  endDate,
  important,
  completed: false,
});

export const editTask = (
  id,
  user,
  title,
  desc,
  startDate,
  endDate,
  important,
  completed,
) => ({
  type: 'EDIT_TASK',
  id: id,
  user: user,
  title,
  desc,
  startDate,
  endDate,
  important,
  completed: completed,
});

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id,
});

export const markAsDone = id => ({
  type: 'MARK_AS_DONE',
  id,
});
