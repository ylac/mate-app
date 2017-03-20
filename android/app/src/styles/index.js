import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10
  },
  textInput: {
    height: 40
  },
  listView: {
    flex: 1,
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
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 130
  },
});
