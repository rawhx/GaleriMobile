import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as fsHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity, View } from "react-native"
import { getFotoCari, postLike } from "../../api"
import useSWR from "swr"

const Like = (props) => {
    const [like, setLike] = useState(false)

    const fetch = async () => {
        const res = await getFotoCari({foto_id: props.id})
        return res
    }

    const { data: dataSwr } = useSWR('like', fetch, {
        refreshInterval: 1000,
    })
    
    useEffect(() => {
        if (dataSwr) {
            console.log('====================================');
            console.log('like', dataSwr.Favorit);
            console.log('====================================');
            setLike(dataSwr.Favorit)
        }
    }, [props.id, dataSwr]);

    // useCallback(() => {
    //     console.log('====================================');
    //     console.log(props.id);
    //     console.log('====================================');
    // }, [like])

    return (
        <View>
            <TouchableOpacity
                onPress={async () => {
                    setLike(like ? false : true)
                    await postLike({foto_id: props.id}).then((res)=>{
                        res.IsError ?? setLike(like ? false : true)
                    })
                }}
            >
                <FontAwesomeIcon icon={like ? fsHeart : faHeart} size={25} color={like ? "red" : "black"} />
            </TouchableOpacity>
        </View>
    )
}

export default Like