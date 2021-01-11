import { store } from "@risingstack/react-easy-state";
import { Alert } from "react-native";
import UUIDGenerator from 'react-native-uuid-generator';
import globalStore from "../../../Data/global";

const formStore = store({
    async onSubmit(data, nav, query, item) {
        globalStore.setLoading(true);

        try {
            var res = await query.get();
            const details = res.data().details;
            var total = 0;
            var total_pay = 0;
            if (item != null) {
                var index = details.findIndex(i => i.uid == item.uid);
                details[index]['name'] = data.name;
                details[index]['total'] = data.total;
                details[index]['has_pay'] = data.has_pay;
                details.forEach((v) => {
                    total += v.total;
                    if (v.has_pay) total_pay += v.total;
                });
                await query.update({
                    total_pay: total_pay,
                    total: total,
                    details: details
                })
                globalStore.setLoading(false);
                nav.goBack();
                globalStore.toast?.current.show("Data Update Successfully");
            } else {
                UUIDGenerator.getRandomUUID(async (uuid) => {
                    data['uid'] = uuid;
                    data['has_pay'] = false;
                    details.push(data);
                    details.forEach((v) => {
                        total += v.total;
                    });
                    await query.update({
                        total: total,
                        details: details
                    })
                    globalStore.setLoading(false);
                    nav.goBack();
                    globalStore.toast?.current.show("Data Insert Successfully");
                });
            }
        } catch (error) {
            globalStore.setLoading(false);
            Alert.alert(
                "Submit Data Error",
                error,
                [{ text: "Confirm", onPress: () => {} }]
            )
        }
    },
    async onDelete(nav, query, uid) {
        Alert.alert(
            "Apakah anda yakin?",
            "Menghapus data ini, tidak dapat dikembalikan lagi",
            [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                { text: "Hapus!", style: "destructive", onPress: async () => {
                    globalStore.setLoading(true);
                    try {
                        var res = await query.get();
                        const details = res.data().details;
                        var index = details.findIndex(i => i.uid == uid);
                        var total = 0;
                        var total_pay = 0;
                        details.splice(index, 1);
                        details.forEach((v) => {
                            total += v.total;
                            if (v.has_pay) total_pay += v.total;
                        });
                        await query.update({
                            total_pay: total_pay,
                            total: total,
                            details: details
                        })
                        globalStore.setLoading(false);
                        nav.goBack();
                        globalStore.toast?.current.show("Data Delete Successfully");
                    } catch (error) {
                        globalStore.setLoading(false);
                        Alert.alert(
                            "Delete Data Error",
                            error,
                            [{ text: "Confirm", onPress: () => {} }]
                        );
                    }
                } },
            ]
        );  
    }
    
});
export default formStore;