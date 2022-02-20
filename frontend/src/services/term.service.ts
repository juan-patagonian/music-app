import axios from "axios";
import { config } from "../constants/config";

const API_URL = config.API_URL;

const addTerms = async (searchText: string) => {
  const userToken = localStorage.getItem("user");
  return axios.patch(
    API_URL + "/user/addTerms",
    {
      terms: searchText.split(" "),
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

const getRecentTerms = async () => {
  const userToken = localStorage.getItem("user");

  const { data } = await axios.get<string[]>(API_URL + "/user/getRecentTerms", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return data;
};

export { addTerms, getRecentTerms };
