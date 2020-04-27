import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'native-base';
import { Header, Body, Left, Right, Textarea, Form, Item, Label, Button } from 'native-base';

const ChangeLanguage = () => {
  return (
    <>
      <Header>
        <Left />
        <Body>
          <Text>Change language</Text>
        </Body>
        <Right>
        </Right>
      </Header>

      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <CheckBox checked={true} color={'#fe4b66'} />
          <Text style={{ paddingLeft: 20 }}>English</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox checked={false} color={'#fe4b66'} />
          <Text style={{ paddingLeft: 20 }}>Ukrainian</Text>
        </View>
      </View>
    </>
  )
}

export default ChangeLanguage;
