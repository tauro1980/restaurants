import React,{ useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Button, Icon, Image, ListItem } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import firebase from 'firebase/app'

import Loading from '../components/Loading'
import { getFavorites } from '../utils/action'
import { identity } from 'lodash'

export default function Favorites({ navigation }) {
    const toastRef = useRef()
    const [restaurants, setRestaurants] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(false)

    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            if(userLogged){
                async function getData() {
                    setLoading(true)
                    const response = await getFavorites()
                    setRestaurants(response.favorites)
                    setLoading(false)
                }
                getData()
            }
            setReloadData(false)
        }, [userLogged, reloadData])
    )
    
    if(!userLogged){
        return <UserNotLogged navigation={navigation} />
    }

    if(!restaurants){
        return <Loading isVisible={true} text="Cargando restaurantes..." />
    } else if(restaurants?.length === 0) {
        return <NotFoundRestaurants/>
    }

    return (
        <View style={styles.viewBody}>
            {
                restaurants ? (
                    <FlatList
                        data={restaurants}
                        keyExtractor={ (item, index) => index.toString() }
                        renderItem={(restaurant) => (
                            <Restaurant
                                restaurant = {restaurant}
                                setLoading = {setLoading}
                                toastRef = {toastRef}
                                navigation = {navigation}
                            />
                        )}
                    />
                ) : (
                    <View style={styles.loaderRestaurant}>
                        <ActivityIndicator size="large"/>
                        <Text style={{textAlign:"center"}}>
                            Cargando Restaurantes...
                        </Text>
                    </View>
                )
            }
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text="por favor espere..." />
        </View>
    )
}

function Restaurant({ restaurant, setLoading, toastRef, navigation }) {
    const { id, name, images } = restaurant.item
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}

function NotFoundRestaurants() {
    return (
        <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
            <Icon type="material-community" name="alert-outline" size={50}/>
            <Text style={{fontSize:20, fontWeight:"bold"}}>
                Aún no tienes restaurantes favoritos.
            </Text>
        </View>
    )
}

function UserNotLogged({ navigation }) {
    return (
        <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
            <Icon type="material-community" name="alert-outline" size={50}/>
            <Text style={{fontSize:20, fontWeight:"bold"}}>
                Necesitas estar logeado para ver los favoritos.
            </Text>
            <Button
                title="Ir al Login"
                containerStyle={{marginTop:20, width:"80%"}}
                buttonStyle={{backgroundColor:"#442484"}}
                onPress={()=>navigation.navigate("account",{ screen: "login" })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor:"#f2f2f2"
    },
    loaderRestaurant: {
        marginVertical: 10
    }
})
