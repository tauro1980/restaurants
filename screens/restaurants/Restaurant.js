import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'

import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import ListReviews from '../../components/restaurants/ListReviews'
import { getDocumentById } from '../../utils/action'
import { formatPhone } from '../../utils/helpers'

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
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                name={restaurant.name}
                location={restaurant.location}
                address={restaurant.address}
                email={restaurant.email}
                phone={formatPhone(restaurant.callingCode, restaurant.phone)}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
        </ScrollView>
    )
}

function TitleRestaurant({name, description, rating}) {
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

function RestaurantInfo({ name, location, address, email, phone }) {
    const listInfo = [
        { text: address, iconName: "map-marker" },
        { text: phone, iconName: "phone" },
        { text: email, iconName: "at" }
    ]

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInforTitle}>
                Información sobre el restaurante
            </Text>
            <MapRestaurant
                location={location}
                name={name}
                height={150}
            />
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#442484"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    viewRestaurantTitle: {
        padding: 15
    },
    viewRestaurantContainer: {
        flexDirection: "row"
    },
    nameRestaurant: {
        fontWeight: "bold"
    },
    rating: {
        position: "absolute",
        right:0
    },
    descriptionRestaurant: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantInforTitle: {
        fontSize:20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#a376c7",
        borderBottomWidth: 1
    }
})
