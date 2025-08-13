import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, onDelete, onToggle}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">
            {item.task}
          </div>

          <div>
            <button
              className="button-delete"
              onClick={() => onDelete(item._id)}   // 🔽 삭제
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => onToggle(item)}       // 🔽 완료 토글
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
