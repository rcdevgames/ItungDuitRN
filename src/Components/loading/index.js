import React from 'react';
import { View, ActivityIndicator, Text, Image } from 'react-native';
import globalStore from '../../Data/global';
import { view } from '@risingstack/react-easy-state';
import styles from './style';
import { Images } from '../../Assets';

const LoadingIndicator = () => {
    if(globalStore.isLoading) {
        return(
            <View style={styles.loading}>
                <View style={styles.container}>
                    <Image source={Images.loading} style={{
                        height: 70,
                        width: 90
                    }}/>
                    <Text style={styles.textLoading}>Loading ...</Text>
                </View>
            </View>
        );
    }else {
        return(<View></View>);
    }
}

export default view(LoadingIndicator) 