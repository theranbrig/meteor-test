import React, { useState } from 'react';

import Tasks from '/imports/api/tasks';

export const TaskForm = ({ user }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  return (
    <form className='task-form' onSubmit={(e) => handleSubmit(e)}>
      <input
        type='text'
        placeholder='Type to add new tasks'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit'>Add Task</button>
    </form>
  );
};
