"use client";
import React, {useEffect, useLayoutEffect} from 'react';
import HomeScreen from "@/containers/Screen/HomeScreen";
import FakeResponseData from "@/fakeData/fakeResponseData";
import TrendingDisplay from "@/components/Trending";
import ProfilePage from "@/containers/Screen/ProfilePage";
import { useSelector } from "react-redux";
import {RootState} from "@/redux/reducers";
import {ChangeScreenAction} from "@/redux/action/changeScreen";
import {UserInterface} from "@/types/userInterface";
import fakeResponseData from "@/fakeData/fakeResponseData";

const Screen = ({screen, userData, productKeys}:
{
    screen: ChangeScreenAction['payload'];
    userData: UserInterface;
    productKeys: any
}) => {
    switch(screen) {
        case "Home":
            return <HomeScreen userData={userData} productKeys={productKeys}/>
        case "Trending":
            return <TrendingDisplay />
        case "Profile":
            return <ProfilePage />
        default:
            return <HomeScreen userData={userData} productKeys={productKeys}/>
    }
}

export default function ScreenNavigate({}: {}) {
    const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);
    const productKeys = Object.keys(FakeResponseData.products);
    const [userData, setUserData] = React.useState<any>(null);

    return (
        <Screen screen={currentScreen} userData={userData} productKeys={productKeys}/>
    )
}
