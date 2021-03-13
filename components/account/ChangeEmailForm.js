import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button,Icon,Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/action'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!ValidateForm()){
            return
        }

        // setLoading(true)
        // const result = await updateProfile({ displayName: newDisplayName })
        // setLoading(false)

        // if(!result.statusResponse){
        //     setError("Error al actualizar nombres y apellidos, intenta más tarde.")
        //     return            
        // }       
        
        // setReloadUser(true)
        // toastRef.current.show("Se han actualizado nombres y apellidos.",3000)
        // setShowModal(false)
    }

    const ValidateForm = () =>{
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if(!validateEmail(newEmail)){
            setErrorEmail("Debes de ingresar correo electrónico válido.")
            isValid = false
        }

        if(newEmail === email){
            setErrorEmail("Debes de ingresar un correo electrónico diferente al actual.")
            isValid = false
        }

        if(isEmpty(password)){
            setErrorPassword("Debes de ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa correo electrónico.."
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña.."
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Correo Electrónico"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>    
        )
}

const styles = StyleSheet.create({
    view: {
        alignItems:"center",
        paddingVertical:10
    },
    input: {
        marginBottom:10
    },
    btnContainer:{
        width:"95%"
    },
    btn:{
        backgroundColor:"#442484"
    }
})
