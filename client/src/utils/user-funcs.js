import axios from "axios";

export const login = async (email, password) => {
  try {
    let response = await axios({
      method: "post",
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/login",
    });
    if (response) alert(response.data.status);
    return response ? response.data.user : null;
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
};

export const getUser = async () => {
  let response = await axios({
    method: "get",
    url: "http://localhost:5000/api/user",
    withCredentials: true,
  }).catch((err) => {
    alert("Error");
    console.log(err);
  });

  return response;
};

export const signup = async (userData) => {
  try {
    const res = await axios({
      method: "post",
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/signup",
    });
    alert(res.data);
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
};
