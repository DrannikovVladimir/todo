import * as yup from 'yup';
import watchedState from './view';
import createItem from './list';

const validate = (value) => {
  const schema = yup.string().required();
  try {
    schema.validateSync(value);
    return null;
  } catch (err) {
    return err.message;
  }
};

const updateValidationState = (watched, value) => {
  const { todoForm } = watched;
  const error = validate(value);
  if (error) {
    todoForm.error = error;
    todoForm.valid = false;
    return;
  }
  todoForm.error = null;
  todoForm.valid = true;
};

export default () => {
  const state = {
    todoForm: {
      status: 'filling',
      valid: false,
      error: null,
    },
    todos: new Set(),
  };

  const elements = {
    form: document.querySelector('.todo-form'),
    input: document.querySelector('.todo-form__input'),
    button: document.querySelector('.todo-form__button'),
    feedback: document.querySelector('.todo-form__feedback'),
    listContainer: document.querySelector('.todo-list__container'),
  };

  const watched = watchedState(state, elements);

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const value = formData.get('todo-name');
    updateValidationState(watched, value);
    if (!watched.todoForm.valid) {
      watched.todoForm.status = 'failed';
      return;
    }
    watched.todoForm.status = 'processed';
    watched.todoForm.status = 'finished';
    const newItem = createItem(value);
    watched.todos.add(newItem);
    watched.todoForm.status = 'filling';
  });
};
