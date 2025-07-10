// Define User interface
export default interface User {
  id: number;
  name: string;
  username: string;
}

// TODO generate user id on the back end get it here
export const newUser = (id: number, name: string, username: string) => ({
  id,
  name,
  username
})
