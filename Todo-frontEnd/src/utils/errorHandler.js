export const getErrorMsg = (error) => {
  const serverMessage = error?.response?.data?.message;

  if (serverMessage) {
    return serverMessage;
  }

  return "Something went wrong!";
};