export const CHANGE_SCREEN = "CHANGE_SCREEN";

export const changeScreen = (screen: "Home"|"Trending"|"Profile") => {
    return {
        type: CHANGE_SCREEN,
        payload: screen
    }
}

export type ChangeScreenAction = ReturnType<typeof changeScreen>;