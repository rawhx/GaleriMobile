import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';

const CustomBackdrop = (props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      // pressBehavior="none"
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={false}
      opacity={0.4}
    />
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomBackdrop;
