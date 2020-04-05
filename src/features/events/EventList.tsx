import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

const event = {
  title: 'UNITED PEOPLE',
  date: '02 апреля 2020 г',
  starts: '18:30',
  description: `02 квітня унікальний український дівочий акапела-бенд ‘United people’ презентує нову вибухову програму ‘New Jazz Voices’. Три професійні вокалістки та єдина в Україні дівчина-бітбоксер, імітуючи голосами різні інструменти, створюють справжній музичний спектакль, що викликає захоплення до мурашок.
  Разом вони перемагали у найпрестижніших конкурсах, представляли Україну на наймасштабніших у світі хорових фестивалях, виступали на одній сцені з легендарним Боббі Макферріном в рамках Leopolis Jazz Festival.
  Фанкові рифи, soul-вокал та неординарні аранжування пісень народів світу, оригінальні авторські композиції, яскравий інтерактив та, звичайно ж, енергетика, яку складно передати словами: все це – United people!
  Приємний бонус – розіграш подарунку від партнера проекту – Мережі магазинів`,
  isFree: false,
  price: 100,
  currency: 'UAH',
  image: 'https://image.karabas.com/w/350/h/496/f/files/import/1754766412_ImageBig637164291043012017.jpeg',
  location: 'Дім культури',
  type: 'концерт',
  city: 'Lviv'
};

const EventList = (props) => {
  const renderDivider = () => {
    return (
      <>
        <View style={styles.dividerWrapper}>
          <View style={styles.dateDividerStyle}>
            <Text style={styles.dateText}>
              {'5'}
            </Text>
            <Text style={styles.dateOfWeek}>
              {'Saturday'}
            </Text>
          </View>

          <View style={styles.dateDividerStyle}>
            <Text style={styles.month}>
              {'April'}
            </Text>
            <Text style={styles.year}>
              {'2020'}
            </Text>
          </View>
        </View>

        <Divider style={styles.dividerStyle} />
      </>
    )
  }

  const renderItem = (event) => {
    return (
      <View style={styles.itemWrapper}>

        <View style={styles.itemsImageWrapper}>
          <Image source={{ uri: event.image }} style={styles.eventPoster} />
        </View>

        <View style={styles.itemsDescriptionWrapper}>
          <View>
            <Text style={styles.itemsTitle}>
              {event.title}
            </Text>
          </View>
          <View>
            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'City: '}
              </Text>
              <Text style={styles.descriptionValue}>
                {event.city}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'Date: '}
              </Text>
              <Text>
                {event.date}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'Start: '}
              </Text>
              <Text>
                {event.starts}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'Price: '}
              </Text>
              <Text>
                {event.price} {event.currency}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'Adress: '}
              </Text>
              <Text>
                {event.location}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Text style={styles.descriptionTitle}>
                {'Type: '}
              </Text>
              <Text>
                {event.type}
              </Text>
            </View>
          </View>
        </View>

      </View>
    )
  }

  return (
    <View style={styles.listWrapper}>
      {renderDivider()}
      {renderItem(event)}
      {renderItem(event)}
      {renderItem(event)}
      {renderItem(event)}
      {renderDivider()}

      {renderItem(event)}
      {renderItem(event)}
      {renderItem(event)}
    </View>
  )
}

export default EventList;

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: 5,
    padding: 5
  },
  dateDividerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
    marginTop: 3
  },
  dividerWrapper: {
    marginTop: 10
  },
  dividerStyle: {
    margin: 10,
    marginBottom: 0
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500'
  },
  dateOfWeek: {
    paddingLeft: 6,

  },
  month: {
    textTransform: 'uppercase',
    color: '#7a7a7a',
    fontWeight: '500',
    fontSize: 12
  },
  year: {
    paddingLeft: 4,
    textTransform: 'uppercase',
    color: '#7a7a7a',
    fontWeight: '500',
    fontSize: 12
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemsImageWrapper: {
    width: '35%'
  },
  itemsDescriptionWrapper: {
    width: '65%',
    paddingLeft: 15,
    flexDirection: 'column'
  },
  eventPoster: {
    width: '100%',
    height: '100%'
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5
  },
  makeRow: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  descriptionValue: {

  }
})
