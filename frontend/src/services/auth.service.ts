import axios, { AxiosError } from "axios";
import { config } from "../constants/config";

const API_URL = config.API_URL;

type LoginResponse = {
  token: string;
};

const login = async (email: string, password: string) => {
  try {
    const loginResponse = await axios.post<LoginResponse>(
      API_URL + "/auth/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem("user", loginResponse.data.token);
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
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
  try {
    const { data } = await axios.post<LoginResponse>(
      API_URL + "/auth/register",
      {
        nickname,
        email,
        password,
        repeatPassword,
      }
    );
    return data;
  } catch (err) {
    console.log("error", (err as AxiosError).response?.data);

    throw (err as AxiosError).response?.data;
  }
};

export { login, signup };
