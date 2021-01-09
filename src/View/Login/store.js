import { store } from '@risingstack/react-easy-state';
import globalStore from '../../Data/global';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import pinStore from '../OTP/store';
import errorMessage from '../../Data/error_message';

const loginStore = store({
    phone: "",
    errorPhone: null,
    setPhone(val) {
        loginStore.errorPhone = null;
        const value = val.replace(/^0/gi, '');
        loginStore.phone = value.replace(/[^0-9]/g, '')
    },
    async doLogin(nav) {
        if (loginStore.phone != "") {
            globalStore.setLoading(true);
            try {
                auth().signInWithPhoneNumber("+62" + loginStore.phone)
                .then((confirm) => {
                    pinStore.setConfirm(confirm);
                    globalStore.setLoading(false);
                    nav.navigate('/otp');
                })
                .catch((error) => {
                    console.log(error.code.split("/"));
                    console.log(error.message);
                    globalStore.setLoading(false);
                    Alert.alert(
                        "Login Error",
                        errorMessage[error.code.split("/")[1]],
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    )
                });
            } catch (error) {
                globalStore.setLoading(false);
                Alert.alert(
                    "Login Failed",
                    error,
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                )
            }
        }else {
            loginStore.errorPhone = "Required!"
        }
    }
});

export default loginStore;