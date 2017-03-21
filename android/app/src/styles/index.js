import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10
  },
  textInput: {
    flex: 0.05
  },
  listView: {
    flex: 4,
    paddingTop: 0
  },
  contentContainer: {
    paddingBottom: 0
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  rowLeft: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 20
  },
  habitText: {
    fontWeight: 'bold'
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
  gridHeader: {
    flex: 0.05,
    paddingLeft: 135
  },
});
