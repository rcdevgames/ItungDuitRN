import React, { useEffect } from 'react';
import { ActivityIndicator, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './style';
import { Images } from '../../Assets';

const SplashScreenPage = ({navigation}) => {
    const [ user ] = useAuthState(auth());

    const initialize = () => {
        setTimeout(() => {
            if (user) {
                navigation.replace('/home');
            }else {
                navigation.replace('/login');
            }
        }, 1860)
    }

    useEffect(() => {
        initialize();
    }, [])

    return(
        <View style={styles.container}>
            <Image source={Images.logo} style={styles.logo}/>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}

export default SplashScreenPage;