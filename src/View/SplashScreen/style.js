import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logo: {
        width: '100%', 
        height: undefined,
        aspectRatio: 1.5,
        marginTop: 100
    },
    loading: {

    }
});