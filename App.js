import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import BlockRGB from "./BlockRGB";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const tileSize = screenWidth/numColumns;

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={{ height:tileSize , width: tileSize}} onPress={() => navigation.navigate("Details", item)}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue} height={tileSize} width={tileSize}/>
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
      <View>
        <TouchableOpacity style={styles.button} onPress={addColor}>
          <Text style={{ color: "black" }}>Add Colour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetColor}>
          <Text style={{ color: "black" }}>Reset</Text>
        </TouchableOpacity>
      </View>
 
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={numColumns}/>
      
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { red, green, blue } = route.params;
  if (((red*0.299) + (green*0.587) + (blue*0.114)) > 186) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <Text style={styles.detailTextBlack}>Red: {red}</Text>
        <Text style={styles.detailTextBlack}>Green: {green}</Text>
        <Text style={styles.detailTextBlack}>Blue: {blue}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <Text style={styles.detailTextWhite}>Red: {red}</Text>
        <Text style={styles.detailTextWhite}>Green: {green}</Text>
        <Text style={styles.detailTextWhite}>Blue: {blue}</Text>
      </TouchableOpacity>
    );
  };

  // return (
  //   <TouchableOpacity
  //     onPress={() => navigation.navigate("Home")}
  //     style={[
  //       styles.container,
  //       { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
  //     ]}
  //   >
  //     <Text style={styles.detailText}>Red: {red}</Text>
  //     <Text style={styles.detailText}>Green: {green}</Text>
  //     <Text style={styles.detailText}>Blue: {blue}</Text>
  //   </TouchableOpacity>
  // );
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

  detailTextWhite: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff'
  },

  detailTextBlack: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000'

  },
  list: {
    width: "100%",

  }
});
