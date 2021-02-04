import _ from 'lodash';

export default (value) => {
  const id = _.uniqueId();
  const name = value;
  const checked = false;

  return {
    name,
    id,
    checked,
  };
};
