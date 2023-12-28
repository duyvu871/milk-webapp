// import { IReducer, IReducerAction } from "@/types/reducer";
import { ModalAction, ModalActionTypes } from "@/redux/action/showPopup";

const initialState = {
    modal: false
}

function modalReducer(state = initialState, action: ModalAction) {
    switch (action.type) {
        case ModalActionTypes.ShowModal:
            return {
                ...state,
                modal: true,
            };
        case ModalActionTypes.HideModal:
            return {
                ...state,
                modal: false,
            };
        default:
            return state;
    }
}

export default modalReducer;