import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.primary
    },
    loginForm: {
        marginBottom: 10
    },
    inputForm: {
        color: '#FFF',
        borderColor: "#FFF"
    }, 
    loginBtn: {
        backgroundColor: Colors.primaryLight
    },
    logo: {
        width: '100%', 
        height: undefined,
        aspectRatio: 1.5,
        marginTop: 100
    },
    leading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFF"
    }
});