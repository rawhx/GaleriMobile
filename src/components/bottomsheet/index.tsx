import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import CustomBackdrop from './backDrop'; // Impor komponen CustomBackdrop
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { assets } from '../../assets';

const BottomSheetC = (props) => {
  const snapPoints = useMemo(() => props.snapPoint || ['50%'], []);
  const bottomSheetModalRef = props.href;

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    const backAction = () => {
      if (index == 0) {
        bottomSheetModalRef.current?.close();
        backHandler.remove()
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
  }, [bottomSheetModalRef]);

  return (
    <>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={props.href}
        // index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        {
          props.header ? (
            <View style={{ justifyContent: 'center', flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 10, borderColor: 'grey', marginHorizontal: 20}}>
              <Text style={[assets.style.fontSemiBold, { fontSize: 20 }]}>{props.header}</Text>
            </View>
          ) : null
        }
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <BottomSheetScrollView>
            <BottomSheetView style={[styles.contentContainer, props.style]}>
              {props.children}
            </BottomSheetView>
          </BottomSheetScrollView>  
        </KeyboardAvoidingView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    // alignItems: 'center',
  },
});

export default BottomSheetC;
