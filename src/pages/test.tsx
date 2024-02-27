import React, { useCallback, useMemo, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Button, View } from "react-native-ui-lib";

const App = () => {
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ["1%", "50%"], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
      }, []);

	// renders
	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				// disappearsOnIndex={0}
				appearsOnIndex={1}
			/>
		),
		[]
	);
	return (
      
		<View style={styles.container}>
			<Button label="Snap To 50%" onPress={() => handleSnapPress(1)} />
			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
			>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet>
		</View>
    
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "white",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default App;