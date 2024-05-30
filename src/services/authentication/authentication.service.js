import axios from "axios";
import { IPADDRESS } from "../../utils/env";

export const loginRequest = async (email, password) => {
  const res = await axios({
    method: "POST",
    url: `${IPADDRESS}/api/v1/login`,
    data: {
      email,
      password,
    },
  });
  return null;
};
