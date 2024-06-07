import { Text, TouchableOpacity, View } from "react-native"
import { assets } from "../../assets"
import { useEffect, useRef, useState } from "react";

const ExpandedText = ({children = ''}) => {
    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const textRef = useRef(null);
    const maxLines = 3;

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const wordCount = children.split(' ').length;
        if (wordCount > 50) {
        setShowToggle(true);
        } else {
        setShowToggle(false);
        }
    }, [children]);
    
    return (
        <>
        <View>
            <Text
                style={[assets.style.fontMedium]}
                numberOfLines={expanded ? undefined : 3}
            >
                {children}
            </Text>
            <TouchableOpacity onPress={handleToggle}>
                <Text style={[assets.style.fontMedium, { color: 'blue' }]}>
                {
                    showToggle ? (
                        expanded ? 'Tampilkan lebih pendek' : 'Selengkapnya'
                    ) : null
                }
                </Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default ExpandedText