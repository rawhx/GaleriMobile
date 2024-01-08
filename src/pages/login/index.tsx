import React, { useState } from "react"
import { Text, TextField, View } from "react-native-ui-lib"
import style from "./style"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View center style={style.container}>
            <View center>
                <Text text40>Welcome Back!</Text>
                <Text text70>Sign to continue</Text>
            </View>
            <View>
                <TextField
                    placeholder={'Email'}
                    enableErrors
                    validate={['required', 'email']}
                    validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                    floatingPlaceholder
                    floatingPlaceholderStyle={{
                        fontSize: 12
                    }}
                    style={style.input}
                    marginT-40
                />
            </View>
        </View>
    )
}

export default Login 