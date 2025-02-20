import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'
import colors from '../utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function CircularChart() {
    const widthAndHeight = 150
    const [value, setValue] = React.useState([1])
    const [color, setColor] = React.useState([colors.LIGHT_GRAY])
    const series = [
      { value: 430, color: colors.GRAY },
    ]
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontFamily:"outfit"}}>Total Estimate: <Text style={{fontWeight:"outfit-bold"}}>0₹</Text></Text>
      <View style={styles.subcontainer}>
      <PieChart widthAndHeight={widthAndHeight} series={series} cover={{ radius: 0.65, color: 'white' }}/>
      <View style={{display:"flex",flexDirection:"row",gap:5,marginTop:10}}>
        <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={colors.GRAY} />
        <Text>NA</Text>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:20,
    backgroundColor:colors.WHITE,
    padding:20,
    borderRadius:15,
    elevation:1
  },
  subcontainer:{
    display:"flex",
    marginTop:20,
    flexDirection:"row",
    gap:50
  }
})