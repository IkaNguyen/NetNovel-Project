import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';



export default function InfoSample({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('./cfcf15d0fcd9b9be2205c08094d00d1b.png')} style={{ width: 350, height: 350 }} />
            </View>
            <Text style={styles.title}>
                Hành trình mới trên những trang truyện!
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
        backgroundColor: '#ffffff',
        padding: 8,
    },
    title: {
        marginBottom: 65,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3E8BA8',
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
        backgroundColor: '#3E8BA8',
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
