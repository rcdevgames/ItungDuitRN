import React, { useLayoutEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import { useDocument } from 'react-firebase-hooks/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ListItem } from 'react-native-elements';
import { Colors } from '../../../Assets';
import style from './style';
import numToStringMonth from '../../../Data/month';
import { currencyFormat } from '../../../Helpers/currency';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firestores from '../../../Data/firestore';

const DetailExpensePage = ({navigation, route}) => {
    const insets = useSafeAreaInsets();
    let {itemId} = route.params;
    const [value, loading, error] = useDocument(firestores.doc(itemId),{
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
                onPress={() => {
                    navigation.navigate('/expense-form', {itemId: itemId, item: null})
                }}
            >
                <Icon name="plus" size={25} color="#FFF"/>
            </TouchableOpacity>
          ),
        });
    }, [navigation]);

    const renderItem = ({item}) => {
        
        return(
            <ListItem
                style={{
                    marginHorizontal: 8,
                    marginVertical: 5
                }}
                    Component={TouchableHighlight}
                    containerStyle={{}}
                    disabledStyle={{ opacity: 0.5 }}
                    onPress={() => navigation.navigate('/expense-form', {itemId: itemId, item: item})}
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
                {item.has_pay && <Icon name="check-square" size={30} color={Colors.primary} />}
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
                <View style={{
                    flexDirection: "column",
                    backgroundColor: "#FFF",
                    padding: 16
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
                <FlatList
                    data={data.details}
                    keyExtractor={(item) => item.uid}
                    renderItem={renderItem}
                />
                <View style={{
                    backgroundColor: "#FFF",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: Math.max(insets.bottom, 16),
                    paddingTop: 10,
                    paddingHorizontal: 15,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>Total</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>{currencyFormat(data.total)}</Text>
                </View>
            </View>
        );
    }


}

export default view(DetailExpensePage);