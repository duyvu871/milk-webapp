// "use client";

import {useState, useEffect} from "react";

function useValidateUser() {
  const [isValid, setIsValid] = useState<boolean>(false);

  const sendValidateRequest = async (access_token: string) => {
      const response = await fetch("/api/v1/auth/validateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ access_token }),
      });

        const data = await response.json();

        if (data.status === 200) {
          setIsValid(true);
            console.log("data: ", data);
        } else {
          setIsValid(false);
        }
  }

  useEffect(() => {
      const access_token = localStorage.getItem("access_token");
        if (access_token) {
            sendValidateRequest(access_token);
            // console.log("is valid: ", isValid);
        } else {
            setIsValid(false);
        }
  }, []);

  return isValid;
}

export default useValidateUser;