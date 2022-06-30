import Validator from 'fastest-validator';

const validator = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    PersonalID: 'Wrong Personal ID: {actual}',
  },
});

const validate = (value, schema) => {
  const res = validator.validate(value, schema);
  if (res !== true) {
    let errorMsg = '';
    res.forEach((err, idx) => {
      errorMsg += ` ${idx + 1}. ${err.message}`;
    });
    throw new Error(`Parameters validation error, ${errorMsg}`);
  }
  return true;
};

export default { validate };
