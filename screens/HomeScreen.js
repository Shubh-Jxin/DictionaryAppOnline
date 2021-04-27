import * as React from 'react';
import {Text,TouchableOpacity,TextInput,View,StyleSheet}from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            isSearchPressed:'false',
            word:'Loading....',
            lexicalCategory:'',
            example:[],
            definition:""
        }
    }

    getWord=(word)=>{
        var searchKeyword= word.toLowerCase()   
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200){
                return data.json()
            } else {
                return null
            }
        })
        .then((response)=>{
            var responseObj=response;
            if(responseObj){
                var wordData=responseObj.definitions[0]
                var definition= wordData.description
                var lexicalCategory=wordData.wordtype
                
                this.setState({
                    "word":this.state.text,
                    "definition": definition,
                    "lexicalCategory":lexicalCategory
                })
            }
        else {
            this.setState({
                "word":this.state.text,
                "definition":"Not Found"
            })
        }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Header backgroundColor={'tomato'} centerComponent={{
                    text:'Dictionary App',
                    style: { color: '#fff', fontSize: 20 },
                }}/>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text)=>{
                            this.setState({
                                text:text,
                                isSearchPressed:false,
                                word:'Loading....',
                                lexicalCategory:'',
                                example:[],
                                definition:""
                            })
                        }}  
                        value={this.state.text}
                    />
                </View>

                <TouchableOpacity
                    style={styles.goButton}
                    onPress={()=>{
                        this.setState({
                            isSearchPressed:true
                        })
                        this.getWord(this.state.text)
                    }}
                >
                    <Text style={styles.buttonText}>SEARCH</Text>

                </TouchableOpacity>
                <View
                 style={styles.detailsContainer}>
                     <Text style={styles.detailsTitle}>
                        Word {""}  
                     </Text>
                     <Text style={{fontSize:18, textAlign:'center'}}>
                         {this.state.word}
                     </Text>
                 </View>
                 <View
                 style={styles.detailsContainer}>
                     <Text style={styles.detailsTitle}>
                        Type {""}  
                     </Text>
                     <Text style={{fontSize:18, textAlign:'center'}}>
                         {this.state.lexicalCategory}
                     </Text>
                 </View>
                 <View
                 style={styles.detailsContainer}>
                     <Text style={styles.detailsTitle}>
                        Definition {""}  
                     </Text>
                     <Text style={{fontSize:18, textAlign:'center', flexWrap:'wrap'}}>
                         {this.state.definition}
                     </Text>
                 </View>




            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: 'white',
    },
    inputBoxContainer:{
     flex:0.3,  
     alignItems:'center',
     justifyContent:'center',
     marginTop:50
    },
    inputBox: {
      marginTop: 10,
      width: '80%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
    },
    goButton: {
    //   width: '',
      height: 50,
      alignSelf: 'center',
      padding: 10,
      margin: 40,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius:10,
      
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    displayText: {
      textAlign: 'center',
      fontSize: 30,
    },

    detailsContainer:{
        flex:1,
        textAlign:'center',
        fontSize:15,
        // fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center',
        justifyContent:'space-evenly',
        

    },
    detailsTitle:{
        alignItems:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontSize:23,
        padding:10,
        color:'#D4AB52',
        textDecorationLine:"underline"

    }
  });