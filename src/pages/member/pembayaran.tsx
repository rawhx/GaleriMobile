import React, { useState } from "react";
import { LoaderScreen, Text, View } from "react-native-ui-lib";
import WebView from "react-native-webview";
import { assets } from "../../assets";
import { container } from "../../components";
import { membershipAdd } from "../../api/membershipAdd";

const Pembayaran = ({route, navigation}) => {
    console.log('token', route.params.snap);
    console.log('userId', route.params.userId);
    console.log('transaksi', route.params.idTransaksi);
    const [isLoading, setLoading] = useState(true);
    
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
                    if (navState.url.includes('success')) {
                        const url = navState.url;
                        await membershipAdd({
                            user_id: route.params.userId,
                            no_transaksi: route.params.idTransaksi,
                        }).then((res)=>{
                            // console.log('====================================');
                            // console.log('res AddMember', res);
                            // console.log('====================================');
                            navigation.goBack()
                            navigation.goBack()
                        }).catch((error)=>{
                            if (error.response) {
                                console.error('Error membership add Response Data:', error.response.data);
                                console.error('Error membership add Response Status:', error.response.status);
                              } else if (error.request) {
                                console.error('Error membership add Request:', error.request);
                              } else {
                                console.error('Error membership add Message:', error.message);
                              }
                            throw error;
                        })

                    }
                }}
            />
        </View>
    )
}

export default Pembayaran