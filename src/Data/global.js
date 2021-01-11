import { autoEffect, store } from '@risingstack/react-easy-state';
import NetInfo from "@react-native-community/netinfo";

const globalStore = store({
    isLoading: false,
    netInfo: false,
    toast: null,
    setLoading(val) {
        globalStore.isLoading = val;
    },
    checkConnection() {
        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            console.log(state.isInternetReachable)
            if (state.isInternetReachable == true) {
                globalStore.toast?.current?.show("Online (" + state.type + ")");
            }else {
                globalStore.toast?.current?.show("Offline");
            }
        });
    },
    setToastRef(ref) {
        globalStore.toast = ref;
    }
});
autoEffect(() => globalStore.checkConnection())

export default globalStore;