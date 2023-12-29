// "use client";

import React, {useState, useEffect, useLayoutEffect} from "react";
import { useRouter } from "next/navigation";

function useValidateUser() {
  const { push } = useRouter();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [userData, setUserData] = React.useState<any>(null);

  useLayoutEffect(() => {
    // if (!initial.current) {
    //     initial.current = true;
    //
    const access_token =  localStorage.getItem("access_token")
    // console.log(access_token)
    if(!access_token){
      return push("/");
    } else {
      // console.log(access_token)
      const verifyToken = async function() {
        return await fetch(`/api/v1/auth/validateUser`, {
          method: "POST",
          // cache: "force-cache",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": access_token
          },
          body: JSON.stringify({
            access_token: access_token
          }),
        })
            .then(res => res.json())
            .then(res => {
              if(res.status === 200) setUserData(res.data.user);
              else {
                alert("not validate user")
                push("/");
              }
            }).catch(err => {console.log(err)})
      }
      verifyToken();
    }
    //     return;
    // }
  }, []);

  return isValid;
}

export default useValidateUser;