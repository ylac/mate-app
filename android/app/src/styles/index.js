import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 5,
  },
  textInput: {
    flex: 0.03
  },
  listView: {
    flex: 0.5,
    paddingTop: 0
  },
  rowHeader: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 182,
    paddingRight: 75
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0
  },
  rowLeft: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 0
  },
  habitText: {
    flex: 1.5,
    fontWeight: 'bold',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20
  },
  hiddenRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  sideButtons: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    padding: 5
  },
  leftSwipeButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeButton: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },


  buddyArea: {
    // flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 10
  },
  actionButton: {

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});
