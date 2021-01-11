import { StyleSheet } from "react-native";
import { Colors } from "../../../Assets";

export default StyleSheet.create({
    inputForm: {
        color: Colors.primary,
        borderColor: Colors.primary,
        marginHorizontal: 5,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    deleteBtn: {
        backgroundColor: "red",
        marginHorizontal: 15,
        marginBottom: 5,
    },
    payBtn: {
        backgroundColor: Colors.primaryLight,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    titleBtn: {
        fontWeight: 'bold',
        color: "#FFF"
    },
    leading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary
    }
});