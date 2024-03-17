const rootUser = "/users";
const rootPost = "/posts";

export const PATH_EXTERNAL_API = {
  user: {
    getUsers: "/users",
    createUser: "/users",
    updateUser: (id: string) => `${rootUser}/${id}`,
    deleteUser: (id: string) => `${rootUser}/${id}`,
  },
  post: {
    getPosts: "/posts",
    createPost: "posts",
  },
};

export const PATH_API = {
  user: {
    getUsers: rootUser,
    createUser: `${rootUser}/create`,
    updateUser: `${rootUser}/:id/update`,
    deleteUser: `${rootUser}/:id`,
  },
  post: {
    getPosts: rootPost,
    createPost: `${rootPost}/create`,
  },
};
