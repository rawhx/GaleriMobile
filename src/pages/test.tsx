import React, { useState } from "react";
import { View } from "react-native";

const Square = ({ backgroundColor }) => {
  const [height, setHeight] = useState(0);
  return (
    <View
      onLayout={(e) => setHeight(e.nativeEvent.layout.width)}
      style={{ flex: 1, height, backgroundColor }}
    />
  );
};

export default function Test() {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Square backgroundColor="red" />
        <Square backgroundColor="pink" />
        <Square backgroundColor="orange" />
        <Square backgroundColor="green" />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Square backgroundColor="lightgreen" />
        <Square backgroundColor="yellow" />
        <Square backgroundColor="blue" />
        <Square backgroundColor="lightblue" />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Square backgroundColor="skyblue" />
        <Square backgroundColor="brown" />
        <Square backgroundColor="gray" />
        <Square backgroundColor="red" />
      </View>
    </View>
  );
}