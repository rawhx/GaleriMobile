import React, { useState } from "react";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, Input, container } from "../../components";
import { useNavigation } from "@react-navigation/native";
import style from "./style";
import Icon from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native";

const Register = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    return (
        <View style={container.default}>
            <ScrollView>
                <View center marginT-50>
                    <Text text50>Create account</Text>
                </View>
                <View margin-40>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="user" color={Colors.grey30} />
                        <Input 
                            style={{marginLeft: 10, paddingRight: 30}}
                            placeholder="Username"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </View>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="vcard" color={Colors.grey30} />
                        <Input 
                            placeholder="Name"
                            style={{marginLeft: 10, paddingRight: 30}}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="envelope" color={Colors.grey30} />
                        <Input 
                            style={{marginLeft: 10, paddingRight: 30}}
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </View>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="map" color={Colors.grey30} />
                        <Input 
                            style={{marginLeft: 10, paddingRight: 30}}
                            placeholder="Address"
                            value={alamat}
                            onChangeText={text => setAlamat(text)}
                        />
                    </View>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="lock" color={Colors.grey30} />
                        <Input 
                            style={{marginLeft: 10, paddingRight: 30}}
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            type="password"
                        />
                    </View>
                    <View marginV-10 style={style.formGroup}>
                        <Icon name="lock" color={Colors.grey30} />
                        <Input 
                            style={{marginLeft: 10, paddingRight: 30,}}
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChangeText={text => setConfirmPassword(text)}
                            type="password"
                        />
                    </View>
                    
                    <View marginT-5>
                        <ButtonC 
                            label="Sign up"
                            backgroundColor={Colors.blue30} 
                        />
                    </View>

                    <View center marginT-20 style={{display: 'flex', flexDirection: 'row'}}>
                        <Text>You have account ? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{fontWeight: 'bold'}}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Register