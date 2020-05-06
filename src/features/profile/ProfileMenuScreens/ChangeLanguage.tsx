import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'native-base';
import HeaderCustom from '../../../ui-components/Header/Header';
import { TEXT_COLOR, BACKGROUND, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { Divider } from 'react-native-elements';
import i18n from '../../../i18n';
import { useTranslation, withTranslation } from 'react-i18next';

const ChangeLanguage = (props) => {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  }

  const onLanguageChange = (language) => {
    i18n.changeLanguage(language);
    props.changeLanguage(language);
  }

  return (
    <>
      <HeaderCustom label={t('language')} back={goBack} />

      <ScrollView style={styles.wrapper}>

        <Text style={styles.title}>
          {t('chooseLanguage')}
        </Text>

        <TouchableOpacity onPress={() => onLanguageChange('en')}>
          <View style={styles.checkboxItem}>
            <CheckBox checked={props.language === 'en'} color={'#fe4b66'} />
            <View>
              <Text style={styles.languageText}>
                {'English'}
              </Text>
              <Text style={styles.languageDesc}>
                {'English language'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Divider style={{ backgroundColor: '#2d3138', margin: 12, height: 1 }} />

        <TouchableOpacity onPress={() => onLanguageChange('ua')}>
          <View style={styles.checkboxItem}>
            <CheckBox checked={props.language === 'ua'} color={'#fe4b66'} />
            <View>
              <Text style={styles.languageText}>
                {'Ukrainian'}
              </Text>
              <Text style={styles.languageDesc}>
                {'Українська мова'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default withTranslation()(ChangeLanguage);

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: BACKGROUND
  },
  title: {
    color: TEXT_COLOR,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 20
  },
  checkboxItem: {
    flexDirection: 'row',
    // paddingTop: 10,
    alignItems: 'center'
  },
  languageText: {
    color: TEXT_COLOR,
    paddingLeft: 24,
    letterSpacing: 1.05,
    fontSize: 15,
    fontWeight: '500'
  },
  languageDesc: {
    fontSize: 12,
    color: TEXT_COLOR_SECONDARY,
    paddingLeft: 24,
    paddingTop: 4,
    fontWeight: '500'
  }
})
