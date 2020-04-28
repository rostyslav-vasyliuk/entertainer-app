import React from 'react';
import { Header, Body, Left, Right, Title } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HEADER_BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../constants/color-constants';

const HeaderCustom = (props) => {
  return (
    <Header iosBarStyle='light-content' transparent style={{ backgroundColor: HEADER_BACKGROUND }}>
      <Left>
        {props.back && (
          <TouchableOpacity onPress={props.back}>
            <MaterialIcons name='arrow-back' size={24} color={TEXT_COLOR} style={{ paddingLeft: 4 }} />
          </TouchableOpacity>
        )
        }
      </Left>
      <Body>
        <Title style={{ color: TEXT_COLOR, fontSize: 16, letterSpacing: 1.1, fontWeight: '600', overflow: 'visible', minWidth: 250 }}>
          {props.label}
        </Title>
      </Body>
      <Right>

      </Right>
    </Header>
  )
}

export default HeaderCustom;
