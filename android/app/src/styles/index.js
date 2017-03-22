import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 5,
  },
  textInput: {
    flex: 0.05
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
    backgroundColor: 'white',
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
    color: 'black',
    padding: 5
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
  modal: {
    // justifyContent: 'space-around',
    // alignItems: 'center',
    height: 300
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  }
});
