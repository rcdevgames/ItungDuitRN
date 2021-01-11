import { store } from "@risingstack/react-easy-state";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firestores = store({
    instance: firestore().collection('expenses'),
    query() {
        const user = auth().currentUser;
        if (user)
            return firestores.instance.where("userId", "==", user.uid).orderBy('month', 'desc').orderBy('year','desc')
        return null;
    },
    doc(docId) {
        return firestores.instance.doc(docId)
    },
    async dataDoc(docId) {
        const result = await firestores.doc(docId).get();
        return result.data();
    }
});

export default firestores;