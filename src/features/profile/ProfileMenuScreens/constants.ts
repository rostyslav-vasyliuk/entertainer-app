export const permissionsListItems = [
  {
    label: 'Camera',
    description: 'Access to your camera for capturing in-app photos',
    icon: 'camera',
    fontFamily: 'MaterialIcons',
    gradientColors: ['#D442F8', '#B645F5', '#9B40F8', '#6B84CA'],
    type: 'camera'
  },
  {
    label: 'Camera Roll',
    description: 'Access to your camera roll for getting images from your gallery',
    icon: 'camera-burst',
    fontFamily: 'MaterialCommunityIcons',
    gradientColors: ['#B446AB', '#fe4b66'],
    type: 'cameraRoll'
  },
  {
    label: 'Notifications',
    description: 'For receiving of recomendations with push notifications',
    icon: 'bell-outline',
    fontFamily: 'MaterialCommunityIcons',
    gradientColors: ['#fe4b66', '#B446AB'],
    type: 'notifications'
  }
]

export const editProfileListItems = [
  {
    buttonLabel: 'Edit Name',
    buttonDescription: 'Edit yor firstname and lastname in this section',
    icon: 'account-edit',
    fontFamily: 'MaterialCommunityIcons',
    gradientColors: ['#D442F8', '#B645F5', '#9B40F8', '#6B84CA'],
    link: 'ChangeName'
  },
  {
    buttonLabel: 'Edit Email',
    buttonDescription: 'Edit your email, but be attentive, that email is used for authorization',
    icon: 'email-outline',
    fontFamily: 'MaterialCommunityIcons',
    gradientColors: ['#B446AB', '#fe4b66'],
    link: 'ChangeEmail'
  },
  {
    buttonLabel: 'Edit Additional Information',
    buttonDescription: 'Edit additional information like country or birhtdate',
    icon: 'edit',
    fontFamily: 'MaterialIcons',
    gradientColors: ['#fe4b66', '#B446AB'],
    link: 'ChangeInfo'
  }
]
