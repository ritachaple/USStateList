import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import axios from "axios";

function App() {
  const [stateList, setStateList] = useState([]);
  const [defaultStateList, setDefaultStateList] = useState([]);
  const [value, onChangeValue] = React.useState("");

  useEffect(() => {
    getUsstatelist();
  }, []);

  const getUsstatelist = () => {
    axios
      .get(
        "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest"
      )
      .then((response) => {
        if (response.status === 200) {
          setStateList(response.data.data);
          setDefaultStateList(response.data.data);
        }
      });
  };

  const onSearch = () => {
    const list = defaultStateList.filter((item) => {
      return item.includes(value);
    });
    setStateList(list);
  };

  const onChangeText = (text) => {
    onChangeValue(text);
  };

  const renderItem = (item) => {
    const { State } = item;
    console.log("state", item);
    return (
      <View style={{ paddingVertical: "2%", paddingHorizontal: "4%" }}>
        <Text>{State}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.app, { flex: 1 }]}>
      <View style={styles.header}>
        {console.log("stateList", stateList)}
        <Text style={styles.title}>List of US states</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          maxLength={40}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={{ padding: 10 }}
        />
        <Button onPress={onSearch} title="Search" />
      </View>
      <FlatList
        data={stateList}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        extraData={stateList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 2
  },
  text: {
    color: "#fff",
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
    textTransform: "uppercase"
  }
});

export default App;
