import { StyleSheet } from "react-native";

export const colors = {
    white: '#FFFFFF',
    cloud: '#EFF2F7',
    grey: '#929292',
    fosil: '#747474',
    navy: '#022A59',
    darkblue: '#040326',
    green: '#088A25',
    red: '#C51313',
    yellow: '#FFE500',
    danger: '#9B0C0C',
}

export const style = StyleSheet.create({
    containerFirst: {
        flex: 1,
        backgroundColor: colors.cloud
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    fontRegular: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },  
    fontMedium: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Medium'
    },  
    fontBold: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Bold'
    },  
    fontSemiBold: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold'
    },  
})