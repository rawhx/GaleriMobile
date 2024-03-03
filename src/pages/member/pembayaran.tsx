import React, { useEffect, useState } from "react";
import { LoaderScreen, Text, View } from "react-native-ui-lib";
import WebView from "react-native-webview";
import { assets } from "../../assets";
import { container } from "../../components";
import { membershipAdd } from "../../api/membershipAdd";
import config from "../../../config";

const Pembayaran = ({route, navigation}) => {
    console.log('token', route.params.snap);
    console.log('userId', route.params.userId);
    console.log('transaksi', route.params.idTransaksi);
    const [isLoading, setLoading] = useState(true);
    let logShown = false;

    useEffect(()=>{
        !route.params.snap ? console.log('back?') : null
        // !route.params.snap ? navigation.goBack() : null
    }, [])
    
    return (
        <View style={[container.defaultTab, {flex: 1}]}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: isLoading ? 'block' : 'none'}}/>
            <View style={{alignItems: 'center'}}>
                <Text color={'black'} style={[assets.fonts.default, {position: 'absolute', top: 0, zIndex: 99, textAlign: 'center', backgroundColor: 'white', padding: 3, borderRadius: 3, paddingHorizontal: 10}]} onPress={()=>navigation.goBack()}>Kembali</Text>
            </View>
            <WebView source={{ uri: `https://app.sandbox.midtrans.com/snap/v3/redirection/${route.params.snap}` }} 
                style={{marginTop: 10}}
                onLoad={() => setLoading(false)}
                javaScriptEnabled={true}
                javaScriptCanOpenWindowsAutomatically={true}
                domStorageEnabled={true}
                cacheEnabled={true}
                allowFileAccessFromFileURLs={true}
                allowFileAccess={true}
                cacheMode="LOAD_NO_CACHE"
                onNavigationStateChange={async (navState) => {
                    const url = navState.url;
                    console.log('====================================');
                    console.log('url ', url);
                    console.log('====================================');
                    if (navState.url.includes('success') && !logShown) {
                        logShown = true;
                        setTimeout(()=>{
                            navigation.pop(2)
                        }, 2500)
                    }
                }}
            />
        </View>
    )
}

export default Pembayaran