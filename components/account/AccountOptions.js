import React, { useState } from 'react'
import { map } from 'lodash'
import { StyleSheet, View, Text } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'

import Modal from '../Modal'
    
const  selectedComponent = (key) => {
    console.log(key)
}   

export default function AccountOptions({ user, toastRef }) {
    const menuOptions = generateOptions();
    const [showModal, setShowModal] = useState(false)

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal
                isVisible={showModal}
                setVisible={setShowModal}
            >
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
                <Text>Hola Mondo Modal</Text>
            </Modal>
        </View>
    )
}

const generateOptions = () => {
    return [
        {
            title : "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("displayName")
        },
        {
            title : "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("email")
        },
        {
            title : "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("password")
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})
