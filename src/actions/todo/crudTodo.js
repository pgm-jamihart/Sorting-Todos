/*
 * All the CRUD endpoint actions together
 */

import parseTodo from './parseTodo.js';


export const getTodos = async (todo, request, response) => {
  try {
    const todoes = await todo.get();
    todoes.sort((a, b) => {
      return compareStrings(a.description, b.description);
    }); 
    await response.status(200).json({ todos: todoes});
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};



/**
 * Getting the todos
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
// export const getTodos = async (todo, request, response) => {
//   try {
//     response.status(200).json({ todos: await todo.get() });
//   } catch ({ message }) {
//     response.status(500);
//     response.json({ error: message });
//   }
// };

/**
 * Creates a new todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const addTodo = async (todo, request, response) => {
  try {
    const { description } = parseTodo(request, response);
    const newTodo = await todo.add(description);
    response.status(201).json({ todo: newTodo });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a new todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const updateTodo = async (todo, request, response) => {
  try {
    const { description } = parseTodo(request);
    const { id } = request.params;
    const updatedTodo = await todo.update(id, description);
    response.status(200).json({ todo: updatedTodo });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a todo item
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const deleteTodo = async (todo, request, response) => {
  try {
    const { id } = request.params;
    await todo.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};



// helper 
function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}