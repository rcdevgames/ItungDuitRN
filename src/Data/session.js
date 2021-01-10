// import { store } from '@risingstack/react-easy-state';
// import RNSecureStorage from 'react-native-secure-storage';

// const sessionStorage = store({
//     storeParams : {
//         keychainService: 'IOS_ItungDuit_Session',
//         sharedPreferencesName: 'Android_ItungDuit_Session',
//     },
//     async setData(key, value) {
//         await RNSecureStorage.setItem(key, value, sessionStorage.storeParams);
//     },
//     async getData(key) {
//         await RNSecureStorage.getItem(key, sessionStorage.storeParams);
//     },
//     async deleteData(key) {
//         await RNSecureStorage.removeItem(key, sessionStorage.storeParams);
//     },
// });

// export default sessionStorage;