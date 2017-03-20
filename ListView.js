dataSource={ds.cloneWithRows(store.getState().habits)}
renderRow={rowRenderer}
style={styles.listView}
contentContainerStyle={styles.contentContainer}
