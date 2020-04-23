import { StyleSheet, Platform } from 'react-native';

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#fe4b66';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 26,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#fe4b66',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    padding: 20,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  subTitle: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 0,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
  },
  button: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    borderRadius: 5,
    marginTop: 40,
    backgroundColor: '#fe4b66'
  },
  timerHeader: {
    padding: 35,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#595959'
  },
  timer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#595959'
  },
  remaining: {
    fontWeight: '700'
  },
  viewHeader: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
  },
  viewDescription: {
    padding: 35,
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#595959'
  },
  buttonsLabel: {
    color: 'white',
    fontSize: 16
  }
});

export default styles;
