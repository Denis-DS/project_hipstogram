const toggleError = (id: string, isValid: boolean) => {
  const elem = document.querySelector(`#${id}`);
  if (isValid) {
    elem?.classList.remove("invalid");
    elem?.classList.add("valid");
    return true;
  } else {
    elem?.classList.add("invalid");
    elem?.classList.remove("valid");
    return false;
  }
};

export const checkLengthInput = (
  inputValue: string,
  id: string,
  minLength: number,
  maxLength: number,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  if (maxLength) {
    inputValue.length < maxLength && setState(inputValue);
  } else {
    setState(inputValue);
  }
  const isValid = !(minLength && inputValue.length < minLength);
  return toggleError(id, isValid);
};

export const checkLogin = (id: string, login: string) => {
  const isEmail = !!login.match(/^[0-9a-z-&#92;]/i);
  return toggleError(id, isEmail);
};

export const checkPhoto = (data: string) => {
  const possibleExp = [/jpg/, /jpeg/, /png/, /gif/];
  for (let i = 0; i < possibleExp.length; i++) {
    if (possibleExp[i].test(data)) return true;
  }
  return false;
};
