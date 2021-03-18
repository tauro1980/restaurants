import React,{ useState } from 'react'
import firebase from 'firebase/app'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true) : setUserLogged(false)
    })

    return (
        <View>
            {
                userLogged ? (
                    <Button
                        buttonStyle={styles.btnAddReview}
                        title="Escribe una opinión"
                        titleStyle={styles.btnTitleAddReview}
                        onPress={()=>navigation.navigate("add-review-restaurant", { idRestaurant })}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#a376c7"
                        }}
                    />
                ) : (
                    <Text 
                        onPress={()=>navigation.navigate("login")}
                        style={styles.mustLoginText}
                    >
                        Para escribir una opinión es necesario estar logeado.{" "}
                        <Text style={styles.loginText}>
                            Pulsa aquí para iniciar sesión
                        </Text>
                    </Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color:"#a376c7"
    },
    mustLoginText: {
        textAlign: "center",
        color: "#a376c7",
        padding: 20
    },
    loginText: {
        fontWeight: "bold"
    }
})
