export const validatorInput = (id: string, input: string) => {
  switch (id) {
    case "summary":
      if (input.length > 4) {
        return true;
      }
      return false;
    case "date":
      let regEx = /^\d{4}-\d{2}-\d{2}$/;
      return input.match(regEx);
    default:
      return false;
  }
};

export const validateForm = () => {};
