const validatePhone = text => {
  if (text === "" || !text) {
    return true;
  }
  const reg = /^\d{10}$/;
  //eslint-disable-next-line
  const reg2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return reg.test(text) || reg2.test(text);
};
const validateName = text => {
  if (text === "" || !text) {
    return true;
  }
  const reg = /^[A-Za-z0-9-]/;
  return reg.test(text);
};
const validateEmail = text => {
  if (text === "" || !text) {
    return true;
  }
  //eslint-disable-next-line
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
};

export { validatePhone, validateName, validateEmail };
