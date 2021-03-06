import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm'
import Loading from '../../components/Loading'

export default function AddRestaurant({ navigation }) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddRestaurantForm 
                toastRef={ toastRef } 
                setLoading={ setLoading }
                navigation={ navigation }
            />
            <Loading isVisible={loading} text="Creando restaurante..."/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
