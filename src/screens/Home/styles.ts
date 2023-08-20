import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        marginTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        marginBottom: 22,
    },
    input: {
        width: "100%",
        height: 150,
        fontSize: 16,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#883DF2",
        width: 56,
        height: 56,
        justifyContent: "center",
        borderRadius: 7,
        alignSelf: "flex-end",
    },
    form: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "#999",
        padding: 16,
    },
    icon: {
        alignSelf: "center",
    },
});
