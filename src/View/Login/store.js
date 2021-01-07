import { store } from '@risingstack/react-easy-state';
import globalStore from '../../Data/global';

const loginStore = store({
    phone: "",
    errorPhone: null,
    setPhone(val) {
        loginStore.errorPhone = null;
        loginStore.phone = val.replace(/[^0-9]/g, '')
    },
    async doLogin(nav) {
        if (loginStore.phone != "") {
            console.log(loginStore.phone);
            globalStore.setLoading(true);
            setTimeout(() => {
                globalStore.setLoading(false);
                nav.replace('/home');
            }, 1500)
        }else {
            loginStore.errorPhone = "Required!"
        }
    }
});

export default loginStore;