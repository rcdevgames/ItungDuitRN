import React, { useLayoutEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CheckBox, ListItem } from 'react-native-elements';
import { Colors } from '../../../Assets';
import UUIDGenerator from 'react-native-uuid-generator';
import style from './style';
import numToStringMonth from '../../../Data/month';
import { currencyFormat } from '../../../Helpers/currency';

const DetailExpensePage = ({navigation, route}) => {
    let {itemId} = route.params;
    const [value, loading, error] = useDocumentOnce(firestore().collection('expenses').doc(itemId));

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

        UUIDGenerator.getRandomUUID((uuid) => {
            console.log(uuid);
        });
    }, [navigation]);

    const renderItem = ({item}) => {
        
        return(
            <ListItem
                style={{
                    marginHorizontal: 15,
                    marginVertical: 5
                }}
                    Component={TouchableHighlight}
                    containerStyle={{}}
                    disabledStyle={{ opacity: 0.5 }}
                    onPress={() => {}}
                    pad={20}
                >
                <Icon name="money-bill-wave" size={30} color={Colors.primary} />
                <ListItem.Content>
                    <ListItem.Title>
                    <Text>{item.name}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                    <Text>{currencyFormat(item.total)}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                {/* <TouchableHighlight onPress={() => {}} style={{
                    padding: 10,
                    borderRadius: 50
                }} underlayColor={Colors.primaryLight}>
                    <Icon name="edit" color="green"  size={20}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {}} style={{
                    padding: 10,
                    borderRadius: 50
                }} underlayColor={Colors.primaryLight}>
                    <Icon name="trash" color="red"  size={20}/>
                </TouchableHighlight> */}
            </ListItem>
        );
    }

    if (loading) {
        return(
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }else if (error) {
        return(
            <View style={style.errorContainer}>
                <Text>{error.message}</Text>
            </View>
        );
    }else if (value) {
        const data = value.data();
        return(
            <View style={style.container}>
                <Card>
                    <View style={{
                        flexDirection: "column"
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Pengeluaran</Text>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Icon name="calendar" color={Colors.primary} size={20} style={{
                                marginRight: 10
                            }} />
                            <Text style={{
                                fontSize: 18
                            }}>{numToStringMonth[parseInt(data.month) - 1]} {data.year}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignContent: 'space-between',
                            marginTop: 10
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Total Pengeluaran</Text>
                                <Text style={{
                                    fontWeight: '600'
                                }}>{currencyFormat(data.total)}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Total Pembayaran</Text>
                                <Text style={{
                                    fontWeight: '600'
                                }}>{currencyFormat(data.total_pay)}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
                <FlatList
                    data={data.details}
                    keyExtractor={(item) => {
                        UUIDGenerator.getRandomUUID((uuid) => {
                            return uuid;
                        });
                    }}
                    renderItem={renderItem}
                />
            </View>
        );
    }


}

export default view(DetailExpensePage);