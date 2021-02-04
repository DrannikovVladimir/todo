import * as yup from 'yup';
import _ from 'lodash';
import watchedState from './view';
import createItem from './list';

yup.setLocale({
  mixed: {
    notOneOf: 'This item exist',
  },
})

const validate = (watched, value) => {
  const { todos } = watched;
  const names = todos.map(({ name }) => name);
  const schema = yup.string().required().notOneOf(names);
  try {
    schema.validateSync(value);
    return null;
  } catch (err) {
    return err.message;
  }
};

const updateValidationState = (watched, value) => {
  const { todoForm } = watched;
  const error = validate(watched, value);
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
    todos: [],
  };

  const elements = {
    form: document.querySelector('.todo-form'),
    input: document.querySelector('.todo-form__input'),
    button: document.querySelector('.todo-form__button'),
    feedback: document.querySelector('.todo-form__feedback'),
    listContainer: document.querySelector('.todo-list__container'),
  };

  const watched = watchedState(state, elements);

  const handlerElementsMapping = {
    button: (evt) => {
      const buttonId = evt.target.getAttribute('data-id');
      const { todos } = watched;
      const todosId = todos.map(({ id }) => id);
      const index = todosId.indexOf(buttonId);
      todos.splice(index, 1);
    },
    input: (evt) => {
      const { todos } = watched;
      const inputId = evt.target.getAttribute('data-id');
      const mappingElementChecked = {
        true: (item) => {item.checked = false},
        false: (item) => {item.checked = true},
      };
      todos.forEach((item) => {
        if (item.id === inputId) {
          mappingElementChecked[item.checked.toString()](item);
        }
      });
    }
  };

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
    const newItem = createItem(value);
    watched.todos.push(newItem);
    watched.todoForm.status = 'finished';
    watched.todoForm.status = 'filling';
  });

  elements.listContainer.addEventListener('click', (evt) => {
    const currentTag = evt.target.tagName.toLowerCase();
    if (currentTag !== 'button' && currentTag !== 'input') {
      return;
    }
    handlerElementsMapping[currentTag](evt);
  });
};
