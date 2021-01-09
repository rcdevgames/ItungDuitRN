import React, { useLayoutEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DetailExpensePage = ({navigation, route}) => {
    let {itemId} = route.params;
    const [value, loading, error] = useDocumentOnce(firestore().collection('expenses').doc(itemId));
    console.log(value);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
                onPress={() => {
                    // expenseStore.setDatePicker(true);
                }}
            >
                <Icon name="plus" size={25} color="#FFF"/>
            </TouchableOpacity>
          ),
        });
    }, [navigation]);


    return(<View></View>);
}

export default view(DetailExpensePage);