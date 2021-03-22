import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isEmpty } from 'lodash'

import { seacrhRestaurants } from '../utils/action'

export default function Search({ navigation }) {
    const [search, setSearch] = useState("E")
    const [restaurants, setRestaurants] = useState([])

    console.log(restaurants)

    useEffect(() => {
        if(isEmpty(search)){
            return
        }

        async function getData() {
            const response = await seacrhRestaurants(search)
            if(response.statusResponse){
                setRestaurants(response.restaurants)
            }
        }
        getData()
    }, [search])

    return (
        <View>
            <Text>Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
