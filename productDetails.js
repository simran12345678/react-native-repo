import React from 'react';
import {ScrollView, TouchableOpacity } from 'react-native';
import { useState,useEffect} from 'react';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

export default function productDetails(sandeep){
  const about=sandeep.route.params.item
    const [product, setProducts] = useState([])

    useEffect(()=>{
      axios.get('http://localhost:3000/allproducts/'+about)
            .then(res =>{
              console.log(res.data)
              setProducts(res.data)
            })
    }) 
    return (
        <View style={styles.container}>
            
        <ScrollView>{
     
          <View style={styles.cardContent}>
           
        <Text style={styles.list}><img src={product.productimage} style={{height:'200px'}}></img></Text>
        <Text> Name: {product.productName}</Text><br></br>
        <Text> Price:{product.productPrice}</Text><br></br>
        <Text>Description:{product.productDescription}</Text><br></br>
        <Text> Stock: {product.productStock}</Text><br></br>
        <Text>Category: {product.productCategory}</Text>
        
          </View>
        
      
      }
    </ScrollView>

      <StatusBar style="auto" />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
       
        
    },
    list:{
      marginTop:30,
      // fontSize:30,
       backgroundColor:'whitesmoke',
      // padding:20,
      color:'green',
    },
    cardContent:{

    }
})