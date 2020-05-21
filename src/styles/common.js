import { StyleSheet, StatusBar, Platform } from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    margin: 20
  },
  stretchButton: {
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerAlign: {
    flex: 1,
    justifyContent: 'center'
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  description: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  input: {
    marginBottom: 15,
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100,
  },
  touch: {
    borderColor: colors.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200
  },
});
