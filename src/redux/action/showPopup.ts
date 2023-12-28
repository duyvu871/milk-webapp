// import { IReducer, IReducerAction } from "@/types/reducer";
//
// const popupReducer = (data: boolean): IReducerAction => {
//     return {
//         type: 'POPUP_SHOW',
//         payload: data
//     }
// }

export enum ModalActionTypes {
    ShowModal,
    HideModal
}

export interface ModalAction {
    type: ModalActionTypes;
    payload?: boolean;
}

export function showModal(): ModalAction {
    return {
        type: ModalActionTypes.ShowModal
    }
}

export function hideModal(): ModalAction {
    return {
        type: ModalActionTypes.HideModal
    }
}

