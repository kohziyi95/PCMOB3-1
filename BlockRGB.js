import { ShadowPropTypesIOS, View } from "react-native";
import React from 'react';

export default function BlockRGB(props) {
  return (
    <View
      style={{
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        padding: 30,
        height: props.height,
        width: props.width,
      }}
    ></View>
  );
}
