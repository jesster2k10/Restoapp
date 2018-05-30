import { ApplicationStyles, Fonts, Colours } from '../../Themes';

export default {
  ...ApplicationStyles.screen,
  submit: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  scroll: {
    flex: 1,
  },
  disclaimer: {
    padding: 25,
    textAlign: 'center',
    width: '100%',
    ...Fonts.style.medium,
    color: Colours.mainTextColor
  },
  centeredContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  loader: {
      ...Fonts.style.normalSmall,
      fontFamily: Fonts.type.medium,
      color: Colours.mainTextColor,
      paddingTop: 10
  }
};
