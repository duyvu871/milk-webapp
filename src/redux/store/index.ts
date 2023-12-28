//
// const showPopup = () => {
//     return {
//         type: 'SHOW_POPUP'
//     }
// }
//
// export { showPopup };

import { createStore } from 'redux';
import rootReducer from '@/redux/reducers';

const store = createStore(rootReducer);
export default store;