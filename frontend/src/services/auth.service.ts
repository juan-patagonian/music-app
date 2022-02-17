import axios from "axios";
import { config } from "../constants/config";

const API_URL = config.API_URL;

type LoginResponse = {
  token: string;
};

const login = async (email: string, password: string) => {
  const loginResponse = await axios.post<LoginResponse>(
    API_URL + "/auth/login",
    {
      email,
      password,
    }
  );

  localStorage.setItem("user", loginResponse.data.token);
};

type SignUpParams = {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const signup = async ({
  nickname,
  email,
  password,
  repeatPassword,
}: SignUpParams) => {
  return axios.post<LoginResponse>(API_URL + "/auth/register", {
    nickname,
    email,
    password,
    repeatPassword,
  });
};

export { login, signup };
