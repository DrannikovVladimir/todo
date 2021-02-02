import _ from 'lodash';

export default (value) => {
  const id = _.uniqueId();
  const name = value;

  return {
    name,
    id,
  };
};
