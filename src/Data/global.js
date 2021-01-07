import { store } from '@risingstack/react-easy-state';

const globalStore = store({
    isLoading: false,
    setLoading(val) {
        globalStore.isLoading = val;
    }
});

export default globalStore;