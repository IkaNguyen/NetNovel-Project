import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';



export default function Start({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('../../assets/img/start.png')} style={{ width: 350, height: 350 }} />
            </View>
            <Text style={styles.title}>
                Net Novel
            </Text>
            <Text style={styles.content}>
                Welcome back
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Bắt đầu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    title: {
        margin: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4E84C1',
    },
    content: {
        margin: 24,
        marginTop: 18,
        fontSize: 18,
        textAlign: 'center',

    },
    button: {
        width: 200,
        borderRadius: 20,
        backgroundColor: '#4E84C1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
