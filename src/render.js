import item from './list';

const renderFeedback = (error, elements) => {
  const { feedback } = elements;
  feedback.innerHTML = '';
  if (!error) {
    return;
  }
  feedback.textContent = error;
};

const createCheckLabel = (item) => {
  const { id, checked } = item;
  const checkInput = document.createElement('input');
  const mapping = {
    true: (input) => input.setAttribute('checked', true),
    false: (input) => input.removeAttribute('checked'),
  };
  mapping[checked.toString()](checkInput);
  checkInput.setAttribute('type', 'checkbox');
  checkInput.setAttribute('data-id', id);

  return checkInput;
};

const createButtonDelete = (item) => {
  const { id } = item;
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('data-id', id);
  buttonDelete.setAttribute('type', 'button');
  buttonDelete.textContent = 'Delete';

  return buttonDelete;
};

const createTextContent = (item) => {
  const { name, id, checked } = item;
  const span = document.createElement('span');
  const mapping = {
    true: (span) => span.style.textDecoration = 'line-through',
    false: (span) => span.style.textDecoration = 'none',
  };
  mapping[checked.toString()](span);
  span.setAttribute('data-id', id);
  span.textContent = name;

  return span;
}

const createItem = (item) => {
  const li = document.createElement('li');
  const checkLabel = createCheckLabel(item);
  const textContent = createTextContent(item);
  const buttonDelete = createButtonDelete(item);
  li.append(checkLabel,textContent, buttonDelete);

  return li;
};

const renderList = (todos, elements) => {
  const { listContainer } = elements;
  listContainer.innerHTML = '';
  const ul = document.createElement('ul');

  todos.forEach((item) => {
    const newItem = createItem(item);
    ul.append(newItem);
  });

  listContainer.append(ul);
}

export { renderFeedback, renderList };
