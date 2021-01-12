import React from 'react';
import { View, Text } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import { Colors } from '../../Assets'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, Divider, Avatar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import profileStore from './store';
import AboutModal from '../../Components/modal';
import auth from '@react-native-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage = ({navigation}) => {
    
    const [ user ] = useAuthState(auth());

    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            <SafeAreaView
                style={{
                    width: "100%",
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 15
                }}
            >
                <Avatar
                    size="xlarge"
                    rounded
                    title="ID"
                    onPress={() => console.log("Works!")}
                    overlayContainerStyle={{backgroundColor: Colors.primaryLight}}
                />
                <View style={{
                    marginTop: 10,
                }}>
                    <Text style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textAlign: 'center'
                    }}>{user?.phoneNumber??""}</Text>
                </View>
            </SafeAreaView>
            <ScrollView>
                <ListItem
                    Component={TouchableHighlight}
                    pad={20}
                    onPress={() => profileStore.setAbout(true)}
                >
                    <Icons name="info-circle" size={20} color={Colors.primary} />
                    <ListItem.Content>
                        <ListItem.Title>
                            <Text style={{color: Colors.primary}}>Tentang Aplikasi</Text>
                        </ListItem.Title>
                    </ListItem.Content>
                    <Icons name="chevron-right" size={20} color="grey" />
                </ListItem>
                <Divider/>
                <ListItem
                    Component={TouchableHighlight}
                    pad={20}
                    onPress={() => profileStore.logout(navigation)}
                >
                    <Icons name="sign-out-alt" size={20} color="red" />
                    <ListItem.Content>
                        <ListItem.Title>
                            <Text style={{color: 'red'}}>Logout</Text>
                        </ListItem.Title>
                    </ListItem.Content>
                    <Icons name="chevron-right" size={20} color="grey" />
                </ListItem>
            </ScrollView>
            <AboutModal visible={profileStore.about} onDismis={() => profileStore.setAbout(false)} />
        </View>
    );
}

export default view(ProfilePage);