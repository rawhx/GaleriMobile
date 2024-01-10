import React, { useState } from "react";
import { View, Text, Image, TextField, Button, Colors, TouchableOpacity } from "react-native-ui-lib";
import style from "./style";
import { container } from "../../components";
import { gambar } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform } from "react-native";

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={container.default}>
            <View style={style.sectionAwal} backgroundColor={Colors.grey50}>
                <Image source={gambar} style={{width: 230, height: 230}}/>
            </View>
            <View marginH-40>
                <Text 
                    text60 
                    marginV-20
                    style={{fontWeight: 'bold', textAlign: 'center'}}
                >Sign in</Text>
                
                <Text style={{fontWeight:"500"}}>Email</Text>
                <TextField
                    value={email}
                    keyboardType="email-address"
                    placeholder={'test@example.com'}
                    enableErrors
                    validate={['required', 'email']}
                    style={style.input}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={{fontWeight:"500"}}>Password</Text>
                <TextField
                    secureTextEntry
                    value={password}
                    placeholder={'password123'}
                    enableErrors
                    validate={['required']}
                    style={style.input}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity>
                    <Text style={{fontWeight: '400', textAlign: 'right'}} color={Colors.grey10}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button 
                    marginT-10
                    label={'Sign in'} 
                    size='medium' 
                    borderRadius={10} 
                    backgroundColor={Colors.blue30} 
                    labelStyle={{fontWeight: 'bold'}}
                    paddingV-10   
                />

            </View>
            <View 
                marginT-50
                center  
                style={{
                    flex: 1,
                    flexDirection: 'row', 
                }}
            >
                <Text style={{fontWeight: '400'}}>You need account ? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{fontWeight: '500'}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login