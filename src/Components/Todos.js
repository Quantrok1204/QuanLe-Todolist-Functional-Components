import React from 'react';
import Todolist from './Todolist';

const Todos = (props => {
  const {datas, handleRemove, handleChecked, getEdit, todoEditing, editTodo} = props;

  return (
    <div className="todos">
        {datas.map((data, index) => (
            <Todolist key={index} newTodo={data}
              handleRemove={handleRemove}
              handleChecked={handleChecked}
              todoEditing={todoEditing}
              getEdit={getEdit}
              editTodo={editTodo}
            />
        ))}
    </div>
  );
});

export default Todos ;