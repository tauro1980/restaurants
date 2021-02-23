import React from 'react'
import { Button } from 'react-native-elements'
import { ScrollView, StyleSheet, Text, Image } from 'react-native'

export default function UserGuest() {
    return (
        <ScrollView
            centerContent={true}
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/restaurant-logo.png")}
                resizeMode="contain"
                style={styles.image}
            /> 
            <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
            <Text style={styles.description}>
                ¿Cómo describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cuál te ha gustado más y comenta cómo ha sido tu experiencia.
            </Text>
            <Button
                title="Ver tu perfil"
                buttonStyle={styles.button}
                onPress={()=>console.log("Click!!!")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
        textAlign: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    },
    description: {
        textAlign:"justify",
        marginBottom:20,
        color:"#a65273"
    },
    button:{
        backgroundColor:"#442484"
    }
})
