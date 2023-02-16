import { useQuery } from "@tanstack/react-query";
import { axisoInstance } from ".";
import { QUERY_KEYS } from "../constants/api";

const getUser = async () => {
  const response = await axisoInstance.get("/users/me");
  return response.data;
};

export const useUser = () => useQuery([QUERY_KEYS.USER_PROFILE], getUser);
