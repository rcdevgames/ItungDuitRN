import React, { useEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { View, Text } from 'react-native';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../../Components/loading';
import pinStore from './store';
import Numpad from '../../Components/numpad';

const OTPPage = ({navigation}) => {

    useEffect(() => {
        return pinStore.reset();
    }, []);

    const NumberPIN = ({value}) => {
        function formatNumber(value, index) {
            return value.charAt(index);
        }

        return(<View style={styles.pinContainer}>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 0)}</Text>
            </View>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 1)}</Text>
            </View>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 2)}</Text>
            </View>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 3)}</Text>
            </View>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 4)}</Text>
            </View>
            <View style={styles.pinNumberContainer}>
                <Text style={styles.pinNumberText}>{formatNumber(value, 5)}</Text>
            </View>
        </View>);
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 30
                }}>Verification Code</Text>
                <Text style={{
                    color: '#FFF',
                    textAlign: 'center',
                }}>
                    Please type the verification code sent
                </Text>
                <Text style={{
                    color: '#FFF',
                    textAlign: 'center',
                }}>
                    to +62 823 4875 6208
                </Text>
            </View>
            <NumberPIN value={pinStore.pin}/>
            <Numpad 
                color='white' 
                pressMode='string' 
                rowStyle={{ marginVertical: 15 }}
                onPress={pinStore.setPin}
                onComplete={() => pinStore.doLogin(navigation)}
            />
            <LoadingIndicator/>
        </SafeAreaView>
    );
}

export default view(OTPPage);