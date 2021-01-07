import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    container: {
        padding: 35,
        backgroundColor: "#7a57d1",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textLoading: {
        color: "#FFF",
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold'
    }
});