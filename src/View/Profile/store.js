import { store } from "@risingstack/react-easy-state";
import { Alert } from "react-native";
import Session from '../../Data/session';
import auth from '@react-native-firebase/auth';

const profileStore = store({
    about: false,
    setAbout(val) {
        profileStore.about = val
    },
    logout(nav) {
        Alert.alert(
            'Logout',
            'Are you sure to Logout?',
            [
                { text: "Don't leave", style: 'cancel', onPress: () => {} },
                {
                  text: 'Logout',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: async () => {
                      await auth().signOut();
                      nav.replace('/login');
                  },
                },
            ]
        )
    }
});

export default profileStore;