export const coursesTypes = [
  'programming',
  'economic',
  'language',
  'marketing',
  'music',
];

export const coursesLabels: any = {
  language: 'Languages',
  programming: 'Programming',
  music: 'Music',
  economic: 'Economic',
  marketing: 'Marketing',
}

export const coursesTypesArray = [
  {
    name: 'Programming',
    key: 'programming'
  },
  {
    key: 'economic',
    name: 'Economic'
  },
  {
    key: 'language',
    name: 'Language'
  },
  {
    key: 'marketing',
    name: 'Marketing'
  },
  {
    key: 'music',
    name: 'Music'
  },
];

export const getBiggerImage = (url: string) => {
  if (url) {
    return url.replace('w=80', 'w=500').replace('h=80', 'h=500');
  }

  return;
}

export const getBiggerImageInstructor = (url: string) => {
  if (url) {
    return url.replace('&w=112&h=', '&w=500&h=500');
  }

  return;
}
