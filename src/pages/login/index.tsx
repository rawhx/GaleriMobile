import React, { useState } from "react"
import { Button, Colors, Text, TextField, TouchableOpacity, View } from "react-native-ui-lib"
import style from "./style"
import { useNavigation } from "@react-navigation/native"
import { ButtonC, Input, container } from "../../components"
import Icon from "react-native-vector-icons/FontAwesome"

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <View style={container.default}>
            <View center marginT-150>
                <Text text40>Welcome Back!</Text>
                <Text text70>Sign to continue</Text>
            </View>
            <View margin-40 style={{justifyContent: 'center'}}>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="envelope" color={Colors.grey30} />
                    <Input
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder={'Email'}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View marginV-10 marginB-15 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} size={15} />
                    <Input
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder={'Password'}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        type="password"
                    />
                </View>
                {/* <TouchableOpacity right marginV-5>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity> */}
                <ButtonC 
                    label="Sign in"
                    backgroundColor={Colors.blue30} 
                />
                <View center marginT-20 style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>You need account ? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={{fontWeight: 'bold'}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login 