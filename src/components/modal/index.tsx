import React from "react";
import { Modal, View } from "react-native-ui-lib";
import { TouchableWithoutFeedback } from "react-native";
import { assets } from "../../assets";

const ModalC = ({ visible, setModal, children, styleContainer, style = {}, overlayBackgroundColor = 'rgba(0, 0, 0, 0.3)', animationType = 'fade' }) => {
  return (
    <Modal
      overlayBackgroundColor={overlayBackgroundColor}
      animationType={animationType}
      transparent={true}
      visible={visible}
      onBackgroundPress={() => {
        setModal(false);
      }}>
      {/* <TouchableWithoutFeedback onPress={() => setModal(false)}> */}
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
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
        </View>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  )
}

export default ModalC;
