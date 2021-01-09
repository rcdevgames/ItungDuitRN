import { store } from "@risingstack/react-easy-state";
import { Alert } from "react-native";
import globalStore from '../../Data/global';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '@react-native-firebase/auth';

const pinStore = store({
    pin: "",
    errorPin: "",
    confirm: null,
    setConfirm(value) {
        pinStore.confirm = value;
    },
    reset() {
        pinStore.pin = "";
        pinStore.errorPin = "";
    },
    setPin(val) {
        console.log(val);
        if (val.length <= 6) {
            pinStore.pin = val
        }
    },
    async doLogin(nav) {
        if (pinStore.pin != "") {
            if (pinStore.confirm != null) {
                globalStore.setLoading(true);
                try {
                    await pinStore.confirm.confirm(pinStore.pin);
                    globalStore.setLoading(false);
                    nav.reset({
                        index: 0,
                        routes: [{ name: '/home' }],
                    });
                } catch (error) {
                    globalStore.setLoading(false);
                    Alert.alert(
                        "Login Failed",
                        error,
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    )
                }
            }
        }else if(pinStore.pin < 4) {
            Alert.alert(
                "Login Failed",
                "PIN not Complete!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            )
        }else {
            Alert.alert(
                "Login Failed",
                "Please Input Verification Code!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            )
        }
    }
});

export default pinStore;