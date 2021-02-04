import onChange from 'on-change';
import { renderFeedback, renderList } from './render';

const handlerStateForm = (value, elements) => {
  const { form, input, button } = elements;
  switch (value) {
    case 'filling':
      break;
    case 'failed':
      input.style.border = '2px solid red';
      break;
    case 'processed':
      input.style.border = '1px solid black';
      input.setAttribute('readonly', true);
      button.setAttribute('disabled', 'disabled');
      break;
    case 'finished':
      input.removeAttribute('readonly', true);
      button.removeAttribute('disabled', 'disabled');
      form.reset();
      break;
    default:
      throw new Error(`${value} is unknown`);
  }
};

export default (state, elements) => {
  const watched = onChange(state, (path, value) => {
    // console.log(path, value);
    switch (path) {
      case 'todoForm.status':
        handlerStateForm(value, elements);
        break;
      case 'todoForm.error':
        renderFeedback(value, elements);
        break;
      case 'todos':
        renderList(value, elements);
        break;
      default:
        break;
    }
  });

  return watched;
};
