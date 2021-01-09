import React, { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator  } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import expenseStore from './store';
import { ListItem } from "react-native-elements";
import { TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../Assets';
import {currencyFormat} from '../../Helpers/currency';
import RNMonthPicker from 'react-native-month-year-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import numToStringMonth from '../../Data/month';

const ExpensePage = ({navigation}) => {
    const [user] = useAuthState(auth());
    const [value, loading, error] = useCollection(firestore().collection('expenses').where("userId", "==", user.uid));

    const renderItem = ({item}) => {
        const val = item.data();
        
        return(
            <ListItem
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5
                }}
                Component={TouchableHighlight}
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => navigation.navigate('/expense-detail', {itemId: item.id})}
                onLongPress={() => console.log("asdasdasd")}
                pad={20}
                >
                <Icon name="calendar" size={30} color={Colors.primary} />
                <ListItem.Content>
                    <ListItem.Title>
                    <Text>{numToStringMonth[parseInt(val.month) - 1]} {val.year}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                    <Text>{currencyFormat(val.total)}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    return(
        <View style={{
            flex: 1
        }}>
            {loading && <View style={{
                flexDirection: 'column',
                alignContent: 'center'
            }}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>}
            {value && <FlatList 
                data={value.docs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />}
            {expenseStore.showDatePicker && (
                <RNMonthPicker
                    onChange={(event, date) => expenseStore.setDate(event, date, value)}
                    value={expenseStore.date}
                    minimumDate={new Date()}
                    maximumDate={new Date(2025, 5)}
                    locale="id"
                />
            )}
        </View>
    );
}

export default view(ExpensePage);