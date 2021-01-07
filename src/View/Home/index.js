import React, {useLayoutEffect} from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import homeStore from './store';
import { ListItem, Avatar } from "react-native-elements";
import { TouchableHighlight } from "react-native";

const Tab = createBottomTabNavigator();
const HomePage = ({navigation}) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 15
            }}>
                <Icon name="sign-out-alt" size={25} color="#FFF"/>
            </TouchableOpacity>
          ),
        });
    }, [navigation]);

    const renderItem = ({item}) => {
        return(
            <ListItem
                Component={TouchableHighlight}
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                onLongPress={() => console.log("onLongPress()")}
                onPress={() => console.log("onLongPress()")}
                pad={20}
                >
                <Avatar
                    source={{
                    uri:
                        "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4"
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title>
                    <Text>Pranshu Chittora</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                    <Text>React Native Elements</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
        );
    }

    const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
    ];

    return(
        <View style={{
            flex: 1
        }}>
            <FlatList 
                data={homeStore.items}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={homeStore.refreshData}
                refreshing={homeStore.refreshList}
                renderItem={renderItem}
            />
        </View>
    );
}

export default view(HomePage)