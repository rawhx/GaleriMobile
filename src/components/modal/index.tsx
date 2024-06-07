import { Modal, Touchable, TouchableOpacity, View } from "react-native"

const ModalC = ({ visible, setModal, children, style = {}, styleContainer = {} }) => {
    return (
        <Modal 
            animationType="fade"
            visible={visible}
            transparent
            // onRequestClose={()=>setModal('false')}
        >
            <TouchableOpacity onPress={()=>setModal(false)} style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                    <View style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        minHeight: 150,
                        minWidth: 300,
                        maxWidth: 350,
                        borderRadius: 10,
                        shadowOpacity: 0.2,
                        elevation: 5,
                        padding: 25
                    }, styleContainer]}>
                        {children}
                    </View>
                {/* <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
                </View> */}
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalC