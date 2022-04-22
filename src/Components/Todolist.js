import React, {useState} from 'react';

const Todolist = (props => {
  const {newTodo, index, handleRemove, handleChecked, todoEditing, getEdit, editTodo} = props;
  const isEditing = todoEditing === newTodo.id
  const [text, setText] = useState(newTodo.text)
  const handleEdit = () => {
    editTodo({
        ...newTodo,
        text
    }, index)
    getEdit('')
}
  
  return (
    <div className={`${isEditing ? 'editing' : ''} ${newTodo.status ? 'completed' : ''}`}>
      {
        !isEditing ?
      <div className="todoList">
        <input className="check" type="checkbox" checked={newTodo.status} 
              onChange={() => handleChecked(newTodo.id)} id="status"/>
        <input onChange={() => getEdit(newTodo.id)} value={newTodo.text}></input>
        <span className="delete button"
              onClick={() => handleRemove(newTodo.id)}>✖</span>
      </div>:
        <input className="edit" value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && text) {
                    handleEdit() }}}
        />
      }
    </div>
  );
});

export default Todolist;