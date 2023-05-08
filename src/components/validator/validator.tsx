export const validatorInput = (payload: { id: string; value: string }) => {
  const { id, value } = payload;
  switch (id) {
    case "summary":
      if (value.length > 4) {
        return true;
      }
      return false;
    case "date":
      let regEx = /^\d{4}-\d{2}-\d{2}$/;
      return value.match(regEx);
    default:
      return false;
  }
};

export const validateForm = () => {};
