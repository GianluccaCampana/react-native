/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  
  StyleSheet,
  
  View,
  
} from 'react-native';


import Button from './src/componentes/Button'
import Display from './src/componentes/Display'

const stateInicial = {
  displayValue: '0',
  clearDisplay:false, // vai dizer se o display precisa ser limpo ou não
  operation:null, // armazenar o tipo de operação
  values: [0 ,0],
  current: 0 // valor do array está sendo usado
}

export default class App extends Component {

  state = { 
  ...stateInicial
  }

  addDigit = n =>{
    
    // const clearDisplay vai substituir o 0 inicial pelo nume que fou digitado
    const clearDisplay = this.state.displayValue === '0' 
    || this.state.clearDisplay
    // então o clearDisplay vai substituir o 0 pelo número digitado
    // ou quando clearDisplay for igual a true

    // if para que não seja incluído dois pontos seguidos
    if(n ==='.' && this.state.displayValue.includes('.') && !clearDisplay){
      return
    }


    // corrent value = se clearDisplay for verdadeira vai ser um vaziose não será o valore concatenar com proximo valor digitado
    const correntValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = correntValue + n

    //
    this.setState({displayValue, clearDisplay: false})

    // verificar se foi digitado um número
    if(n !== '.'){
      const newValue = parseFloat(displayValue) // passa o numero do displaypara float
      const values = [...this.state.values] // pegar o array de valores
      values[this.state.current] = newValue //vai alterar valores e pegar novos valores digitados
      this.setState({values}) // mudouo estado
    }
  }

  clearMemory = () => {
    this.setState({...stateInicial}) //restaura o estado inicial da calculadora
  }
  setOperation = operation => {
    if(this.state.current=== 0){
      this.setState({operation, current: 1, clearDisplay: true} )
    }else{
      const equals = operation === '='
      const values = [...this.state.values]
      try{
        values[0] =
        eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      }catch(e){
        values[0] = this.state.values[0]
      }
      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }

  }
  
  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='ac' triple onClick={this.clearMemory } />
          <Button label='/'  operation onClick={() => this.setOperation('/')} />
          <Button label='7' onClick={()=>this.addDigit('7')} />
          <Button label='8'  onClick={()=>this.addDigit('8')}/>
          <Button label='9'  onClick={()=>this.addDigit('9')}/>
          <Button label='*'  operation onClick={() => this.setOperation('*')}/>
          <Button label='4'  onClick={()=>this.addDigit('4')}/>
          <Button label='5'  onClick={()=>this.addDigit('5')}/>
          <Button label='6'  onClick={()=>this.addDigit('6')}/>
          <Button label='-'  operation onClick={() => this.setOperation('-')}/>
          <Button label='1'  onClick={()=>this.addDigit('1')}/>
          <Button label='2'  onClick={()=>this.addDigit('2')}/>
          <Button label='3'  onClick={()=>this.addDigit('3')}/>
          <Button label='+'  operation onClick={() => this.setOperation('+')}/>
          <Button label='0'   double onClick={()=>this.addDigit('0')}/>
          <Button label='.'  onClick={()=>this.addDigit('.')}/>
          <Button label='='  operation onClick={() => this.setOperation('=')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});