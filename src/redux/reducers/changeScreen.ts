import {CHANGE_SCREEN, ChangeScreenAction} from "@/redux/action/changeScreen";

type ScreenState = {
    currentScreen: ChangeScreenAction["payload"]
}

const initialState: ScreenState = {
    currentScreen: "Home",
}
const screenReducer = (state = initialState, action: ChangeScreenAction) => {
    switch(action.type) {
        case CHANGE_SCREEN:
            return {
                ...state,
                currentScreen: action.payload
            }
        default:
            return state;
    }
}

export default screenReducer;