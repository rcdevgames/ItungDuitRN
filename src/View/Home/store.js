import { store } from '@risingstack/react-easy-state';

const homeStore = store({
    index: 0,
    refreshList: false,
    items: [
        {id: 1, month: "January", year: "2020", total: 0},
        {id: 2, month: "January", year: "2020", total: 0},
        {id: 3, month: "January", year: "2020", total: 0},
        {id: 4, month: "January", year: "2020", total: 0},
        {id: 5, month: "January", year: "2020", total: 0},
    ],
    setIndex(val) {
        homeStore.index = val;
    },
    setRefreshList(val) {
        homeStore.refreshList = val;
    },
    async refreshData() {
        homeStore.setRefreshList(true);
        setTimeout(() => {
            homeStore.setRefreshList(false);
        }, 1500)
    }
});

export default homeStore;