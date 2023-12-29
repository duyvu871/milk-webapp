"use client";
import React, {useContext, createContext, useEffect} from "react";

// //@ts-ignore
// window.__lc = window.__lc || {};
// //@ts-ignore
// window.__lc.license = 16898652;
// //@ts-ignore
// window.__lc.asyncInit = true;


interface LivechatWidgetContextProps {
    openWidget: (liveChatWidget: any) => void;
    closeWidget: (liveChatWidget: any) => void;
    isWidgetOpen: boolean;
}

export const LivechatWidgetContext = createContext<LivechatWidgetContextProps>({
    openWidget: (liveChatWidget: any) => {},
    closeWidget: (liveChatWidget: any) => {},
    isWidgetOpen: false,
});

export const LiveChatWidgetProvider = ({children}: {children: React.ReactNode}) => {
    const [isWidgetOpen, setIsWidgetOpen] = React.useState<boolean>(false);

    const openWidget = (liveChatWidget?: any) => {
        setIsWidgetOpen(true);
        //@ts-ignore
        if (typeof LiveChatWidget !== "undefined") {
            //@ts-ignore
            LiveChatWidget.call("maximize");
        } else {
            //@ts-ignore
            LC_API.open_chat_window()
        }
    }

    const closeWidget = (liveChatWidget?: any) => {
        setIsWidgetOpen(false);
        //@ts-ignore
        if (typeof LiveChatWidget !== "undefined") {
            //@ts-ignore
            LiveChatWidget.call("hide");
        } else {
            //@ts-ignore
            LC_API.hide_chat_window()
        }
    }

    const loadScript = async (url: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                reject(false);
            }
            document.body.appendChild(script);
        })
    }

    useEffect(() => {
        //@ts-ignore
        window.__lc = window.__lc || {};
        //@ts-ignore
        window.__lc.license = 16898652;
        //@ts-ignore
        window.__lc.asyncInit = true;
        const loadLiveChat = async () => {
            try {
                await loadScript("https://cdn.livechatinc.com/tracking.js");
                console.log("Livechat loaded");
                //@ts-ignore
                closeWidget();
            } catch (e) {
                console.log(e);
            }
        }
        loadLiveChat();

    }, []);

    return (
        <LivechatWidgetContext.Provider value={{
            openWidget,
            closeWidget,
            isWidgetOpen,
        }}>
            {children}
        </LivechatWidgetContext.Provider>
    )
}