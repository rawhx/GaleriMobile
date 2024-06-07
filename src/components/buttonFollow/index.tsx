import useSWR from "swr"
import { getFotoCari } from "../../api"
import { useEffect, useState } from "react"
import ButtonC from "../button"
import { StyleSheet, View } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

const ButtonFollow = (props) => {
    const [follow, setFollow] = useState(false)
    const [load, setLoad] = useState(true)
    const fetch = async () => {
        const res = await getFotoCari({foto_id: props.id})
        setLoad(false)
        return res
    }

    const { data: dataSwr } = useSWR('like', fetch, {
        refreshInterval: 1000,
    })
    
    useEffect(() => {
        if (dataSwr) {
            console.log('====================================');
            console.log('follow', dataSwr.Follow);
            console.log('====================================');
            setFollow(dataSwr.Follow)
        }
    }, [props.id, dataSwr])

    return (
        <>
            {
                load ? (
                    <SkeletonPlaceholder borderRadius={10}>
                        <View style={{ height: 40, width: 100 }} />
                    </SkeletonPlaceholder>
                ) : (
                    <ButtonC 
                        onPress={() => {
                            setFollow(follow ? false : true)
                        }}
                        style={[{ flex: 1, maxWidth: 100, borderRadius: 10 }, follow ? style.diikuti : null]}
                        title={follow ? 'Diikuti' : 'Ikuti'}
                        labelStyle={{ color: follow ? 'black' : 'white' }}
                    />
                )
            }
        </>
    )
}

const style = StyleSheet.create({
    diikuti: {
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'black'
    }
})

export default ButtonFollow