import React from 'react';
import { View, FlatList, Text  } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import expenseStore from './store';
import { ListItem } from "react-native-elements";
import { TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../Assets';
import {currencyFormat} from '../../Helpers/currency';

const ExpensePage = ({navigation, screenName}) => {
    console.log(screenName);

    const renderItem = ({item}) => {
        return(
            <ListItem
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5
                }}
                Component={TouchableHighlight}
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => navigation.navigate('/expense-detail')}
                pad={20}
                >
                <Icon name="calendar" size={30} color={Colors.primary} />
                <ListItem.Content>
                    <ListItem.Title>
                    <Text>{item.month} {item.year}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                    <Text>{currencyFormat(item.total)}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
        );
    }

    return(
        <View style={{
            flex: 1
        }}>
            <FlatList 
                data={expenseStore.items}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={expenseStore.refreshData}
                refreshing={expenseStore.refreshList}
                renderItem={renderItem}
            />
        </View>
    );
}

export default view(ExpensePage);