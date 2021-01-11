import React, { useLayoutEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { ScrollView, TouchableWithoutFeedback, View, Keyboard, Text } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import styles from './style';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import firestore from '@react-native-firebase/firestore';
import formStore from './store';
import LoadingIndicator from '../../../Components/loading';
import { Colors } from '../../../Assets';

const schema = yup.object().shape({
    name: yup.string().required(),
    total: yup.number().positive().integer().required()
});

const FormPage = ({navigation, route}) => {
    let { itemId, item } = route.params;
    const query = firestore().collection('expenses').doc(itemId);
    // const [value, loading, error] = useDocumentOnce(query);
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: (item != null) ? "Update Data" : "New Data"
        });
    }, [navigation]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1}}>
                <ScrollView style={{
                    marginTop: 15
                }}>
                    <View>
                        <Controller 
                            control={control}
                            name="name"
                            defaultValue={item?.name??""}
                            render={({ onChange, value }) => (
                                <Input
                                    inputContainerStyle={styles.inputForm}
                                    inputStyle={{...styles.inputForm, fontWeight: 'bold'}}
                                    value={value}
                                    label="Nama Pengeluaran"
                                    labelStyle={styles.inputForm}
                                    onChangeText={val => onChange(val)}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="total"
                            defaultValue={item?.total?.toString()??""}
                            render={({ onChange, value }) => (
                                <Input
                                    leftIcon={
                                        <Text style={styles.leading}>Rp. </Text>
                                    }
                                    inputContainerStyle={styles.inputForm}
                                    inputStyle={{...styles.inputForm, fontWeight: 'bold'}}
                                    keyboardType='number-pad'
                                    value={value}
                                    label="Jumlah"
                                    labelStyle={styles.inputForm}
                                    onChangeText={val => onChange(val)}
                                    errorMessage={errors.total?.message}
                                />
                            )}
                        />
                        {item != null && <Controller
                            control={control}
                            name="has_pay"
                            defaultValue={item?.has_pay??false}
                            render={({onChange, value}) => (
                                <CheckBox
                                    checkedColor={Colors.primary}
                                    uncheckedColor={Colors.primaryLight}
                                    title="Sudah Dibayarkan"
                                    textStyle={{color: Colors.primary, fontWeight: 'bold', fontSize: 15}}
                                    size={30}
                                    containerStyle={{
                                        backgroundColor: "transparent",
                                        borderBottomWidth: 1.2,
                                        borderBottomColor: Colors.primary,
                                        marginBottom: 10
                                    }}
                                    onPress={() => onChange(!value)}
                                    checked={value}
                                />
                            )}
                        />}
                    </View>
                    <Button onPress={handleSubmit((data) => {
                        if (route.params && route.params.item) {
                            formStore.onSubmit(data, navigation, query, route.params.item);
                        }else {
                            formStore.onSubmit(data, navigation, query);
                        }
                    })} title="Simpan" buttonStyle={styles.submitBtn} titleStyle={styles.titleBtn}/>
                    {item != null && <Button onPress={() => formStore.onDelete(navigation, query, route.params.item.uid)} title="Hapus" buttonStyle={styles.deleteBtn} titleStyle={styles.titleBtn}/>}
                </ScrollView>
                <LoadingIndicator />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default view(FormPage);