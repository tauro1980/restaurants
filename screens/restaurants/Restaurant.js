import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'

import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import { getDocumentById } from '../../utils/action'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {
    const { id, name } = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    
    navigation.setOptions({ title: name })
    
    useEffect(() => {
        (async() => {
            const response = await getDocumentById("restaurants", id)
            if(response.statusResponse){
                setRestaurant(response.document)
            } else {
                setRestaurant({})
                Alert.alert("Ocurrio un problema cargando el restaurente, intente más tarde")
            }
        })()
    }, [])  

    if(!restaurant){
        return <Loading isVisible={true} text="Cargando..."/>
    }
    
    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages
                images={restaurant.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <Text>{restaurant.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
})
