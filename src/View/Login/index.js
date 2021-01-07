import React from 'react';
import {
    View,
    ToastAndroid,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native';
import { Input, Button } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context';
import { view } from '@risingstack/react-easy-state';
import styles from './style';
import loginStore from './store';
import LoadingIndicator from '../../Components/loading';
import {Images} from '../../Assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginPage = ({navigation}) => {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo}/>
                <View style={styles.loginForm}>
                    <Input
                        leftIcon={<Icon name="phone" size={20} color="#FFF"/>}
                        inputContainerStyle={styles.inputForm}
                        inputStyle={styles.inputForm}
                        keyboardType='phone-pad'
                        value={loginStore.phone}
                        label="Phone Number"
                        labelStyle={styles.inputForm}
                        onChangeText={phone => loginStore.setPhone(phone)}
                        placeholder=" 0821xxxxxxx"
                        errorMessage={loginStore.errorPhone}
                    />
                </View>
                <Button onPress={() => loginStore.doLogin(navigation)} title="Submit" buttonStyle={styles.loginBtn}/>
                <LoadingIndicator/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default view(LoginPage)