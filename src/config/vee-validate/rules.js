import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return false;
  }
  return true;
});

defineRule("lowercase", (value) => {
  if (!value || !value.length) {
    return true;
  }

  const regex = /^[a-z0-9_-]+$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});

defineRule("min", (value, [min]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length < min) {
    return false;
  }
  return true;
});

defineRule("max", (value, [max]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length > max) {
    return false;
  }
  return true;
});

defineRule("email", (value) => {
  if (!value || !value.length) {
    return true;
  }

  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!regex.test(value)) {
    return false;
  }
  return true;
});

defineRule("match", (value, [target]) => {
  if (value === target) {
    return true;
  }
  return false;
});
