export const checkForErrors = (response: any) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
