import React, { useEffect, useState } from "react"
import { Header, container } from "../../components"
import { Text, View } from "react-native-ui-lib"
import { ScrollView } from "react-native"
import Grid from "./grid"

const Search = () => {
    const [search, setSearch] = useState('')
    const [textSearch, setText] = useState('')

    const handleSearch = (text) => {
        setText(search !== '');
    };

    useEffect(() => {
        handleSearch(search);
    }, [search]);
    
    return (
        <View style={container.defaultTab}>
            <Header search={true} onChangeText={text => setSearch(text)} />
            {
                textSearch ? (
                    <Text  style={{paddingHorizontal: 20, paddingBottom: 15, fontWeight: 'bold'}}>Berikut foto yang berkaitan dengan "{search}".</Text>
                ) : null
            }
            <ScrollView style={{paddingHorizontal: 15}}>
                <Grid/>
            </ScrollView>
        </View>
    )
}

export default Search