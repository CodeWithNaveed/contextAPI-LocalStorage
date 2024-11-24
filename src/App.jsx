import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))


  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])




  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-green-300 min-h-screen py-10">
        <div className="container mx-auto max-w-3xl shadow-lg rounded-xl bg-gray-800 px-6 py-5 text-gray-100">
          <h1
            className="text-3xl text-blue-500 font-semibold text-center mb-6"
            style={{ textShadow: "0px 1px 3px white" }}
          >
            Todo Manager
          </h1>
          <div className="mb-6">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App