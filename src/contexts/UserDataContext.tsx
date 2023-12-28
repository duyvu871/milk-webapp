// "use client";
//
// import { createContext, ReactNode, useEffect, useState } from "react";
// import {UserInterface} from "@/types/userInterface";
// import useValidateUser from "@/hooks/useValidateUser";
//
// interface ExtendedUserInterface extends UserInterface {
//     setUserData: () => void;
// }
//
// export const UserDataContext = createContext<ExtendedUserInterface>({
//     userData: {
//         username: "",
//         email: "",
//         access_token: "",
//     },
//     setUserData: () => {},
// });
//
// export const UserDataProvider = ({children}: {children: ReactNode}) => {
//     const [userData, setUserData] = useState<UserInterface>({
//         username: "",
//         email: "",
//         access_token: "",
//     });
//
//     const [isLogin, setIsLogin] = useState<boolean>(false);
//     const validateUser = useValidateUser();
//
//
//     useEffect(() => {
//        if (localStorage.getItem("userData")) {
//            setUserData(JSON.parse(localStorage.getItem("userData")!));
//        } else {
//            if (localStorage.getItem("access_token")) {
//                const access_token = localStorage.getItem("access_token");
//
//            }
//        }
//     }, []);
//
//     useEffect(() => {
//         localStorage.setItem("userData", JSON.stringify(userData));
//     }, [userData]);
//
//     return (
//         <UserDataContext.Provider value={{...userData, setUserData}}>
//             {children}
//         </UserDataContext.Provider>
//     )
// }