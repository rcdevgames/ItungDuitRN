import React from 'react';
import { View, Modal, Alert, Text, TouchableHighlight, Image } from "react-native";
import { store, view } from '@risingstack/react-easy-state';
import styles from './style';
import { Colors, Images } from '../../Assets';
import VersionNumber from 'react-native-version-number';

const modalStore = store({
    visibility: false,
    setVisible(val) {
        modalStore.visibility = val;
    }
})

const AboutModal = ({visible, onDismis}) => {
    modalStore.setVisible(visible);

    return(
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalStore.visibility}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={Images.logo} style={{
                            width: '80%', 
                            height: undefined,
                            aspectRatio: 1.5,
                        }}/>
                        <Text style={styles.modalText}>Itung Duit</Text>
                        <Text style={styles.modalTextVersion}>{VersionNumber.appVersion}+{VersionNumber.buildVersion}</Text>
                        <Text style={{...styles.modalTextVersion, marginTop: 10}}>RCDevGames.net</Text>
                        <Text style={{...styles.modalTextVersion, marginBottom: 10}}>2021@All Right Reserved</Text>

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: Colors.primary }}
                        onPress={onDismis}
                        >
                        <Text style={styles.textStyle}>Tutup</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default view(AboutModal);