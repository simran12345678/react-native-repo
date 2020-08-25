import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [searchproducts, setsearchproducts] = useState([]);
  const [valuesearch, setvaluesearch] = useState("");
  const [search, setsearch] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log("useef");
    getAllProducts();
  }, [isFocused]);

  const getAllProducts = () => {
    axios.get("http://localhost:3000/allproducts").then((res) => {
      console.log(res.data);
      setProducts(res.data);
      // console.log(products);
      // setshow(false);
    });
  };

  const searchFunction = (value) => {
    let searchV = value;
    if (searchV === "") {
      getAllProducts();
      // this.setState({
      //   searchproducts: this.state.products,
      //   search: false,
      // });

      setProducts(products);
      setsearchproducts(false);
    }
    // this.setState({ searchValue: searchV });
    setvaluesearch(searchV);
    console.log(searchV);
    let searchF = products.filter((p) => {
      console.log(p.productPrice);
      console.log(searchV);
      return (
        p.productName.toLowerCase().includes(searchV.toLowerCase()) ||
        p.productPrice === parseInt(searchV)
      );
    });
    console.log(searchF);

    if (searchF) {
      console.log("search");
      // this.setState({ searchproducts: searchF, search: true });
      setProducts(searchF);
      setsearch(true);
      // console.log(this.state.searchproducts);
    }
  };

  return (
    <View style={styles.container}>
        <ScrollView>
      <View style={styles.addbtn}>
        <Button
          title="Add Product"
          onPress={() => navigation.navigate("AddProduct")}
        />
      </View>
      <TextInput
        type="text"
        placeholder="Search Products"
        onChangeText={searchFunction}
        style={styles.search}
      />

    
        {products.map((product) => {
          return (
            <View key={product.id}>
              <TouchableOpacity
                style={styles.touchButtonContainer}
                onPress={() => {
                  navigation.navigate("productDetails", { item: product.id });
                }}
              >
                <Text style={styles.list}>
                  <img
                    src={product.productimage}
                    style={{
                      height: "200px",
                      marginLeft: "30px",
                      width: "250px",
                      paddingLeft: "30px",
                    }}
                  ></img>{" "}
                  <h3> {product.productName}</h3>
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: "",
  },
  list: {
    marginTop: 30,
    fontSize: 30,
    padding: 20,
    color: "black",
    width: 400,
    marginLeft:"auto",
    marginRight:"auto",
    backgroundColor: "grey",
  },
  addbtn: {
    width: 200,
    marginTop: 30,
    marginLeft:"auto",
    marginRight:"auto",
  },
  search: {
    borderWidth: 2,
    width: 200,
    height: 33,
    borderRadius: 10,
    borderColor: "#c0392b",
    marginTop: 25,
    marginLeft: 200,
    marginLeft:"auto",
    marginRight:"auto",
  },
});
