import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    }
});