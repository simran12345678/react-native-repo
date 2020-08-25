import React from "react";
import { ScrollView, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function productDetails(navigation) {
  const about = navigation.route.params.item;
  console.log(navigation)
  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/allproducts/" + about).then((res) => {
      setProducts(res.data);
    });
  });
  const deleteHandler=(about)=>{
    axios.delete('http://localhost:3000/allProducts/'+about)
    .then(response=>{
      console.log(response.data)
      navigation.navigation.navigate('Home')
    })
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          <View style={styles.cardContent}>
            <Text style={styles.list}>
              <img src={product.productimage} style={{ height: "200px" }}></img>
            </Text>
            <Text style={styles.text1}> Name: {product.productName}</Text>
            <br></br>
            <Text style={styles.text}> Price:{product.productPrice}</Text>
            <br></br>
            <Text style={styles.text}>Description:{product.productDescription}</Text>
            <br></br>
            <Text style={styles.text}> Stock: {product.productStock}</Text>
            <br></br>
            <Text style={styles.text}>Category: {product.productCategory}</Text>
            <br></br>
            <Button title="DELETE" onPress={()=>deleteHandler(about)}></Button>
          </View>
        }
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list:{
    
    // fontSize:30,
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:"auto",
    // padding:20,
    // color:'green',
  },
  cardContent:{
    height:'auto',
    width:'300',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:"auto",
    marginTop:80,
    borderColor:'#c0392b',
    borderWidth:2,
    padding:20,
    backgroundColor:"grey",
    
  },
  text:{
    marginBottom:'auto',
    // marginLeft:'auto',
    marginRight:"auto",
    fontSize:15,
    
  },
  text1:{
    marginBottom:'auto',
    // marginLeft:'auto',
    marginRight:"auto",
    marginTop:20,
    fontSize:15,
  }
});
