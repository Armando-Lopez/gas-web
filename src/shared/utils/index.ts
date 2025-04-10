export const generateId = () => {
  return new Date().getTime().toString(36);
}