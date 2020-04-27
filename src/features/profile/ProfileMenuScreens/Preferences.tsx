import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Body, Left, Right } from 'native-base';
import DraggableFlatList from "react-native-draggable-flatlist";

const data = [
  {
    key: '12',
    label: 'Events'
  },
  {
    key: '13',
    label: 'Movies'
  },
  {
    key: '13323',
    label: 'Series'
  },
  {
    key: '133232',
    label: 'Education'
  },

];

const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));

const Preferences = () => {
  const [dragData, setDragData] = useState(data);

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 75,
          backgroundColor: isActive ? "blue" : 'white',
          alignItems: "center",
          justifyContent: "center"
        }}
        onPressIn={drag}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 32
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header>
        <Left />
        <Body>
          <Text>{'Preferences'}</Text>
        </Body>
        <Right>
        </Right>
      </Header>

      <View>
        <Text>

        </Text>

        <View style={{ height: 300 }}>
          <DraggableFlatList
            data={dragData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}${index}`}
            onDragEnd={({ data }) => setDragData(data)}
          />
        </View>
      </View>
    </>
  )
}

export default Preferences;
