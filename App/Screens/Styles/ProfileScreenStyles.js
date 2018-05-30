import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colours,
  Fonts,
} from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header: {
    height: 250,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 80/2
  },
  name: {
    color: Colours.mainTextColor,
    ...Fonts.style.h6
  },
  row: {
    height: 60,
    backgroundColor: Colours.lighterBody,
    borderLeftWidth: 0,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)'
},
center: {
  height: 70,
  alignItems: 'center',
  justifyContent: 'center'
}
});
