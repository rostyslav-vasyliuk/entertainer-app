import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheet } from 'native-base'
import Axios from 'axios';
import { BASE_URL } from '../../../api/instance';
import { LOADER_COLOR, BACKGROUND_LIGHT, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

var BUTTONS = ["Take a Photo", "Choose from Gallery", "Delete", "Cancel"];
class AvatarComponent extends React.Component<any> {
  state = {
    image: this.props.userData.image ? `${BASE_URL.replace('/api', '')}/uploads/${this.props.userData.image}` : null,
    clicked: null,
  };

  onActionSheetButton = (index) => {
    if (index === 0) {
      this.takePicture();
    };
    if (index === 1) {
      this.pickImage();
    };
    if (index === 2) {
      this.setState({ image: null })
    }
  }

  render() {
    let { image } = this.state;
    console.log(image)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: 3,
              destructiveButtonIndex: 2,
              title: "Set new Photo"
            },
            buttonIndex => {
              this.onActionSheetButton(buttonIndex);
            }
          )}>

          {image ? (
            <Image
              style={{ width: 180, height: 180, borderRadius: 100 }}
              source={{ uri: image }}
              PlaceholderContent={<ActivityIndicator size='small' color={LOADER_COLOR} />}
              placeholderStyle={{ backgroundColor: BACKGROUND_LIGHT }}
              borderRadius={100}
            />
          ) : (
              <View style={{ width: 180, height: 180, borderRadius: 100, backgroundColor: BACKGROUND_LIGHT, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name='image-plus' color={TEXT_COLOR_SECONDARY} size={46}/>
              </View>
            )}

        </TouchableOpacity>
      </View>
    );
  }

  takePicture = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        return;
      }
    }

    let result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    this.setState({ image: result.uri });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData: any = new FormData();

    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.userData._id);

    Axios({
      method: 'post',
      url: `${BASE_URL}/profile/avatar-upload`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }


  pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return;
      }
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) return;

    this.setState({ image: result.uri });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData: any = new FormData();

    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.userData._id);

    Axios({
      method: 'post',
      url: `${BASE_URL}/profile/avatar-upload`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
}

export default AvatarComponent;
