import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



export default function Home() {
  
 const navigation=useNavigation();
  const [allproducts, setProducts] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/allproducts')
          .then(res =>{
            console.log(res.data)
            setProducts(res.data)
          })
  }) 
  return (
    <View style={styles.container}>
<View>
<Button title="Add Product" onPress={()=>navigation.navigate('AddProduct')}
/></View>
    
   
        <ScrollView>{
      allproducts.map(product=>{
        return(
          <View key={product.id}>
            <TouchableOpacity style={styles.touchButtonContainer} onPress={()=>{navigation.navigate('productDetails',{item: product.id})}}>
        <Text style={styles.list}><img src={product.productimage} style={{height:'200px'}}></img>  <h3> {product.productName}</h3></Text>
            </TouchableOpacity>
          </View>
        )
      })
      }
    </ScrollView>
   

      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius:6,
    elevation:3,
    backgroundColor:'',
  
    


  
  },
  list:{
    marginTop:30,
    fontSize:30,
    backgroundColor:'lightgray',
    padding:20,
    color:'blue',
 
    }
 
});
