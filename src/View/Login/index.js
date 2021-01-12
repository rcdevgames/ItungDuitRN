import React, { useEffect } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Text,
    KeyboardAvoidingView,
    Platfrom
} from 'react-native';
import { Input, Button } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { view } from '@risingstack/react-easy-state';
import styles from './style';
import loginStore from './store';
import LoadingIndicator from '../../Components/loading';
import {Images} from '../../Assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '@react-native-firebase/auth';

const LoginPage = ({navigation}) => {
    const [user, loading, error] = useAuthState(auth());

    useEffect(() => {
        console.log(user);
        return loginStore.setPhone("")
    }, []);

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <View style={styles.loginForm}>
                        <Input
                            leftIcon={
                                <Text style={styles.leading}>+62</Text>
                            }
                            leftIconContainerStyle={{
                                marginRight: 5
                            }}
                            inputContainerStyle={styles.inputForm}
                            inputStyle={{...styles.inputForm, fontWeight: 'bold'}}
                            keyboardType='phone-pad'
                            value={loginStore.phone}
                            label="Phone Number"
                            labelStyle={styles.inputForm}
                            onChangeText={phone => loginStore.setPhone(phone)}
                            errorMessage={loginStore.errorPhone}
                        />
                    </View>
                    <Button onPress={() => loginStore.doLogin(navigation)} title="Submit" buttonStyle={styles.loginBtn}/>
                </View>
            </TouchableWithoutFeedback>
            <LoadingIndicator/>
        </KeyboardAvoidingView>
    );
}

export default view(LoginPage)