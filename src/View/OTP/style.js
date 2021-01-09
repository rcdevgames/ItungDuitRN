import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    pinNumberContainer: {
        borderBottomWidth: 2.5,
        borderColor: "#FFF",
        paddingVertical: 10,
        width: "12%"
    },
    pinNumberText: {
        fontSize: 30,
        color: "#FFF",
        textAlign: 'center'
    }
});