import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import instance from "../../api/instance";

import TodoItems from "../../components/TodoItems"


const Todo = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const todoRef = useRef(null);

  const getTodoAPI = useCallback(async () => {
    try {
      const { data } = await instance.get("/todos");
      setTodos(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodoAPI();
    } else {
      navigate("/");
    }
  }, [getTodoAPI, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await instance.post("/todos", { todo: todoRef.current.value });
      setTodos((prev) => [...prev, data]);
    } catch (error) {
      alert(error.response.data.message);
    }
    todoRef.current.value = "";
  };


    return (
      <div className="flex justify-center mt-10 w-[500px] h-[600px] bg-yellow-200 mx-auto rounded-3xl">
        <div className="flex-col ">
          <div className="flex justify-center flex-col p-10">
            <span className="flex justify-center text-2xl font-bold ">할 일을 작성해보세요!</span>
            <span className="flex justify-center">
              👻유령을 무찔러 할 일을 완료해요!
            </span>
          </div>

          <form className="mt-3" onSubmit={onSubmitHandler}>
            <input
              className="w-[300px] h-[50px] rounded-2xl pl-4"
              placeholder="오늘은 무슨일을 해볼까?"
              ref={todoRef}
            />
            <button className="ml-4 w-[50px] h-[50px] rounded-full bg-yellow-400">
              업뎃!
            </button>
          </form>

          <div>
            {todos.map((todo) => (
              <TodoItems todo={todo} setTodos={setTodos} key={todo.id} />
            ))}
          </div>
        </div>
      </div>
    );



}

export default Todo;