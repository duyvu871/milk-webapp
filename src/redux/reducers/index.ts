import { combineReducers } from 'redux';

import {modalReducer, profileScreenReducer} from './popupShow';
import screenReducer from "@/redux/reducers/changeScreen";

const rootReducer = combineReducers({
    modal: modalReducer,
    screen: screenReducer,
    profileScreen: profileScreenReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;