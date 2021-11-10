import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

const Rating = (props) => {
  const amount = 5;
  const arr = Array.from(Array(amount));

  const onPress = (index) => {
    props.onChange(index);
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {arr.map((el, index) => {
        if (props.active === null || props.active <= index) {
          return <TouchableOpacity onPress={() => onPress(index + 1)} style={{ padding: 5 }}>
            <AntDesign name={'staro'} size={30} color={'#1ecaff'} />
          </TouchableOpacity>
        }

        return <TouchableOpacity onPress={() => onPress(index + 1)} style={{ padding: 5 }}>
          <AntDesign name={'star'} size={30} color={'#1ecaff'} />
        </TouchableOpacity>
      }
      )}
    </View>
  )
}

export default Rating;

