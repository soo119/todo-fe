import React from "react";
import TodoItem from './TodoItem'; 

const TodoBoard = ({todoList, onDelete, onToggle}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item)=>
          <TodoItem
            key={item._id}     // 🔽 key 추가
            item={item}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        )
      ) : (
        <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
