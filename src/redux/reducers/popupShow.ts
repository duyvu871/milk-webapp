// import { IReducer, IReducerAction } from "@/types/reducer";
import {ModalAction, ModalActionTypes, ProfileAction, ProfileActionType} from "@/redux/action/showPopup";

type ModalState = {
    showModal: boolean;
    modal: string;
}

const initialState = {
    showModal: false,
}

function modalReducer(state = initialState, action: ModalAction) {
    switch (action.type) {
        case ModalActionTypes.ShowModal:
            return {
                ...state,
                showModal: true,
                modal: action.modal_name
            };
        case ModalActionTypes.HideModal:
            return {
                ...state,
                showModal: false,
                modal: action.modal_name
            };
        case ModalActionTypes.ToggleModal:
            return {
                ...state,
                showModal: !state.showModal,
                modal: action.modal_name
            };
        default:
            return state;
    }
}


const profileScreenReducer = (state = initialState, action: ProfileAction) => {
    switch(action.type) {
        case ProfileActionType.ShowProfile:
            return {
                ...state,
                showModal: true,
                modal: action.modal_name
            };
        case ProfileActionType.HideProfile:
            return {
                ...state,
                showModal: false,
                modal: action.modal_name
            };
        default:
            return state;
    }
}

export  {modalReducer, profileScreenReducer}