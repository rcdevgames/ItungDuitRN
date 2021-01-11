import React from 'react';
import { View } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import styles from './style';
import globalStore from '../../Data/global';

const ConnectionInfo = () => {
    return(
        <View style={
            styles.container,
            globalStore.netInfo ? styles.connected : styles.disconnected
        }></View>
    );
}

export default view(ConnectionInfo);

