import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import BlockRGB from "./BlockRGB";

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }
  function addColor() {
    setColorArray([
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,
    ]);
  }

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          margin: 10,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={addColor}>
          <Text style={{ color: "black" }}>Add Colour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetColor}>
          <Text style={{ color: "black" }}>Reset</Text>
        </TouchableOpacity>
      </View>

      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { red, green, blue } = route.params;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Home")}
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <Text style={styles.detailText}>Red: {red}</Text>
      <Text style={styles.detailText}>Green: {green}</Text>
      <Text style={styles.detailText}>Blue: {blue}</Text>
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    textAlign: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    width: "25%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
    margin: 10,
  },
  detailText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
