import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TEXT_COLOR } from '../../constants/color-constants';


const BackArrow = () => (
  <MaterialIcons name='arrow-back' size={24} color={TEXT_COLOR} style={{ paddingLeft: 4 }} />
);

export default BackArrow;

