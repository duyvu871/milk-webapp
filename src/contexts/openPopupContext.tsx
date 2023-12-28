"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const OpenPopupContext = createContext<{
    openPopup: boolean;
    setOpenPopup: (status: boolean) => void;
}>({
    openPopup: false,
    setOpenPopup: () => {},
});

export const OpenPopupProvider = ({children}: {children: ReactNode}) => {
   const [openPopup, setOpenPopup] = useState<boolean>(false);

    useEffect(() => {

    }, []);


    return (
        <OpenPopupContext.Provider value={{
            openPopup,
            setOpenPopup,
        }}>
            {children}
        </OpenPopupContext.Provider>
    )
}