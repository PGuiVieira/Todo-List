import { Header } from './components/header/Header';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import styles from './App.module.scss';
import { useState } from 'react';
import { TodoEmpty } from './components/todoEmpty/TodoEmpty';

type Todo = {
  description: string;
  isCompleted: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoAlready, setTodoAlready] = useState(0);

  function AddTodo(event) {
    event.preventDefault();
    const newTodo = [
      ...todoList,
      { description: event.target.todo.value, isCompleted: false },
    ];
    setTodoList(newTodo);
  }

  function TodoChange(event) {
    const newTodoList = [...todoList];

    const findIndexTodoList = todoList.findIndex((element, index, array) => {
      return element.description === event.target.value;
    });

    const findTodo = todoList.find(
      (todo) => todo.description === event.target.value
    );
    const updatedTodo = newTodoList.splice(findIndexTodoList, 1, {
      description: event.target.value,
      isCompleted: !findTodo.isCompleted,
    });
    setTodoList(newTodoList);

    const todoA = newTodoList.reduce((acc, element, index, array) => {
      if (element.isCompleted === true) {
        acc++;
      }
      return acc;
    }, 0);
    setTodoAlready(todoA);
  }

  function deleteTodo(event) {
    const todoUpdate = todoList.filter(
      (todo) => todo.description !== event.target.value
    );

    setTodoList(todoUpdate);

    console.log(todoList);
    const todoA = todoUpdate.reduce((acc, element, index, array) => {
      if (element.isCompleted === true) {
        acc++;
      }
      return acc;
    }, 0);
    setTodoAlready(todoA);
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.containerInput}>
          <form onSubmit={AddTodo}>
            <input
              name="todo"
              type="text"
              placeholder="Adicione uma nova tarefa"
            />
            <button type="submit">
              Criar
              <AiOutlinePlusCircle />
            </button>
          </form>
          <table>
            <thead>
              <th>
                Tarefas criadas <span>{todoList.length}</span>
              </th>
              <th>
                Tarefas concludias{' '}
                <span>
                  {todoList.length !== 0
                    ? `${todoAlready} de ${todoList.length}`
                    : todoAlready}
                </span>
              </th>
            </thead>
            <tbody>
              {todoList.map((todo) => {
                return (
                  <tr key={todo.description}>
                    <td>
                      <input
                        value={todo.description}
                        type="checkbox"
                        id={todo.description}
                        onClick={TodoChange}
                        defaultChecked={todo.isCompleted}
                      />
                      <label for={todo.description}>{todo.description} </label>

                      <label>
                        <button
                          id={todo.description}
                          value={todo.description}
                          onClick={(e) => deleteTodo(e)}
                        />
                        <BiTrash size="14" />
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {todoList.length === 0 && <TodoEmpty />}
        </main>
      </div>
    </>
  );
}

export default App;

function forceUpdate() {
  throw new Error('Function not implemented.');
}
