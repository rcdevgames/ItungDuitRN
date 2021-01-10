import { autoEffect, store } from '@risingstack/react-easy-state';
import { ACTION_DATE_SET, ACTION_NEUTRAL } from 'react-native-month-year-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { Alert } from 'react-native';

const expenseStore = store({
    showDatePicker: false,
    date: new Date(),
    setRefreshList(val) {
        expenseStore.refreshList = val;
    },
    async refreshData() {
        expenseStore.setRefreshList(true);
        await expenseStore.initialize()
        expenseStore.setRefreshList(false);
    },
    setDatePicker() {
        expenseStore.showDatePicker = true;
    },
    openDetail(query, docId) {
        Alert.alert(
            "Delete",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                { text: "Delete", style: 'destructive', onPress: () => {
                    query.doc(docId).delete();
                } }
            ]
        )
    },
    async setDate(event, date, nav) {
        if (event == ACTION_DATE_SET) {
            const query = firestore().collection('expenses');
            const month = parseInt(moment(date).format('M'));
            const year = parseInt(moment(date).format('YYYY'));
            const user = auth().currentUser;
            const data = {
                month: month,
                year: year,
                total: 0,
                total_pay: 0,
                userId: user.uid,
                details: [],
                created_at: new Date()
            };
            query.where("userId", "==", user.uid).where('month','==',month).where('year','==',year).get()
            .then(async (result) => {
                if (result.empty) {
                    query.add(data)
                    .then((res) => {
                        nav.navigate('/expense-detail', {itemId: res.id})    
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }else {
                    const itemId = result.docs[0].id;
                    nav.navigate('/expense-detail', {itemId: itemId})
                }
            })
            .catch((error) => {
                console.log(error);
            });
            // console.log(data);

        }
        expenseStore.showDatePicker = false;
    },
});

export default expenseStore;