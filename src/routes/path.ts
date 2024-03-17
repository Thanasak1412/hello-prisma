const rootUser = "/users";

export const PATH_EXTERNAL_API = {
  getUsers: "/users",
  createUser: "/users",
  updateUser: (id: string) => `${rootUser}/${id}`,
  deleteUser: (id: string) => `${rootUser}/${id}`,
};

export const PATH_API = {
  getUsers: rootUser,
  createUser: `${rootUser}/create`,
  updateUser: `${rootUser}/:id/update`,
  deleteUser: `${rootUser}/:id`,
};
