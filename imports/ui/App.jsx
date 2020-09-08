import React, { useState } from 'react';

import { LoginForm } from './LoginForm';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import Tasks from '/imports/api/tasks';
import _ from 'lodash';
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, 'checked', false);
  }

  const { tasks, incompleteTasksCount, user } = useTracker(() => ({
    tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: Tasks.find({ checked: { $ne: true } }).count(),
    user: Meteor.user(),
  }));

  const toggleChecked = ({ _id, isChecked }) => {
    Tasks.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  const deleteTask = ({ _id }) => Tasks.remove(_id);

  if (!user) {
    return (
      <div className='simple-todos-react'>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className='simple-todos-react'>
      <h1>Todo List ({incompleteTasksCount})</h1>
      <div className='filters'>
        <label>
          <input
            type='checkbox'
            readOnly
            checked={Boolean(hideCompleted)}
            onClick={() => setHideCompleted(!hideCompleted)}
          />
          Hide Completed
        </label>
      </div>

      <ul className='tasks'>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
        ))}
      </ul>
      <TaskForm user={user} />
    </div>
  );
};
