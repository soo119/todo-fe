import {useEffect, useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue]= useState("")  

  const getTasks=async () => {
    const response= await api.get('/tasks')
    console.log("rrrrr",response)
    setTodoList(response.data.data);
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', { 
        task: todoValue, 
        isComplete: false 
      });
      if (response.status === 200) {
        console.log("성공)")
        // 1. 입력한 값이 안사라짐
        setTodoValue(""); 

        // 2. 추가한 값이 안보임
        getTasks()
      } else {
        throw new Error("task can not be added")
      } 
    } catch (err) {
      console.log("error",err);
    }
  }

  // 🔽 추가: 삭제
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await getTasks();
    } catch (err) {
      console.log("delete error", err);
    }
  };

  // 🔽 추가: 완료 토글(업데이트: PUT 전체치환 방식)
  const toggleComplete = async (item) => {
    try {
      await api.put(`/tasks/${item._id}`, {
        // task: item.task,
        isComplete: !item.isComplete,
      });
      await getTasks();
    } catch (err) {
      console.log("update error", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      {/* 🔽 추가: 핸들러 전달 */}
      <TodoBoard todoList={todoList} onDelete={deleteTask} onToggle={toggleComplete} />
    </Container>
  );
}

export default App;
