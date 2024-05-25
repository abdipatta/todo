import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Index";
import styled from "styled-components";

const ToDo = () => {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const getToDos = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setToDos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  const postToDos = async (e) => {
    e.preventDefault();

    const newData = {
      text: input,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const newToDo = await response.json();
      setToDos([...todos, newToDo]);
      setInput("");
      getToDos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToDos = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      getToDos();
    } catch (error) {}
  };

  const updateToDos = async ({ id, updatedText }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: updatedText }),
      });
      const updatedToDo = await response.json();
      setToDos(
        todos.map((todo) =>
          todo.id === updatedToDo.id
            ? { ...todo, text: updatedToDo.text }
            : todo
        )
      );
    } catch (error) {}
    console.error(error);
  };

  const handleChange = (e) => {
    setInput(e.target.value.trim());
  };

  return (
    <Container>
      {/* <div> */}
      <Form onSubmit={postToDos}>
        <input
          type="text"
          placeholder="Введите задание"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">ADD TASK</button>
      </Form>
      {todos.map((item) => (
        <TodoItem key={item.id}>
          <input
            type="text"
            defaultValue={item.text}
            onChange={(e) => updateToDos(item.id, e.target.value)}
          />
          <button onClick={() => deleteToDos(item.id)}>DELETE</button>
        </TodoItem>
      ))}
      {/* </div> */}
    </Container>
  );
};

export default ToDo;

// 1. Wrap the entire component in a responsive container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// 2. Make the form and todo items responsive
const Form = styled.form`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  width: 100%;

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }
`;
