import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase/app'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null)

    firebase.auth().onAuthStateChanged((user) => {
        user !== null ? (setLogin(false)) : setLogin(true)
    })

    if (login == null){
        return <Text>Cargando..</Text>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
