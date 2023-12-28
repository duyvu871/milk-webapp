import { combineReducers } from 'redux';

import modalReducer from './popupShow';

const rootReducer = combineReducers({
    modal: modalReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;