import React, { useRef, useState } from "react";

import instance from "../api/instance";



const TodoItems = ({ todo, setTodos }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editTodoRef = useRef(null);

  const onDeleteHandler = async (id) => {
    try {
      await instance.delete(`todos/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onSuccessHandler = async (id) => {
    try {
      const { data } = await instance.put(`todos/${id}`, { todo: todo.todo, isCompleted: true });
      setTodos((prev) => prev.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onEditHandler = async (id) => {
    try {
      const { data } = await instance.put(`todos/${id}`, {
        todo: editTodoRef.current.value,
        isCompleted: todo.isCompleted,
      });
      setTodos((prev) => prev.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
    setIsEditMode((prev) => !prev);
  };


  return (
    <div className="flex justify-center mt-5">
      <div className="flex w-[300px] cursor-pointer">
        {!todo.isCompleted && !isEditMode && (
          <div
            className="pr-3 cursor-pointer text-xl"
            onClick={() => onSuccessHandler(todo.id)}
          >
            👻
          </div>
        )}
        {isEditMode ? (
          <input defaultValue={todo.todo} ref={editTodoRef} />
        ) : (
          <h2 complete={todo.isCompleted}>{todo.todo}</h2>
        )}
      </div>

      <div>
        {isEditMode ? (
          <>
            <button
              className="pr-2 pl-2"
              onClick={() => onEditHandler(todo.id)}
            >
              완료
            </button>
            <button onClick={() => setIsEditMode((prev) => !prev)}>취소</button>
          </>
        ) : (
          <>
            {!todo.isCompleted && (
              <button
                className="pr-2 pl-2"
                onClick={() => setIsEditMode((prev) => !prev)}
              >
                수정
              </button>
            )}
            <button onClick={() => onDeleteHandler(todo.id)}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
}
export default TodoItems;