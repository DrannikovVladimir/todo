import item from './list';

const renderFeedback = (error, elements) => {
  const { feedback } = elements;
  feedback.innerHTML = '';
  if (!error) {
    return;
  }
  feedback.textContent = error;
};

const createCheckLabel = () => {
  const checkInput = document.createElement('input');
  checkInput.type = 'checkbox';

  return checkInput;
};

const createButtonDelete = () => {
  const buttonDelete = document.createElement('button');
  buttonDelete.textContent = 'Delete';

  return buttonDelete;
};

const createTextContent = (item) => {
  const { name } = item;
  const span = document.createElement('span');
  span.textContent = name;

  return span;
}

const createItem = (item) => {
  const li = document.createElement('li');
  const checkLabel = createCheckLabel();
  const textContent = createTextContent(item);
  const buttonDelete = createButtonDelete();
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
