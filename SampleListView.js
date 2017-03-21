/**
 * Sample ListView for reproducing the bug 
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';

export default class sample extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = [];
    for (let i = 0; i < 10; i++) {data.push(`row ${i + 1}`)}

    //set initial state of the component  
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

   /** Takes a data entry from the data source and its ids and should return
     * a renderable component to be rendered as the row.  By default the data
     * is exactly what was put into the data source, but it's also possible to
     * provide custom extractors.
   */   
  renderRow = (rowData, sectionID, rowID) => {
    return <View key={`row${rowID}`} style={styles.row}><Text>{rowData}</Text></View>;
  };

  /** If provided, a renderable component to be rendered as the separator
    * below each row but not the last row if there is a section header below.
   */
  renderSeparator = (sectionId, i) => {
    return <View key={`sep${i}`} style={styles.separatorLine} />;
};
  
  render() {
    return (
	<View style={styles.container}>
        <ListView
            {...this.state}
            style={styles.list}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator} />
        </View>
    );
  }
}
// Define a Stylesheet, which is an array of styles related to different components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    
  list: {
    flex: 1,
    backgroundColor: '#ccc',
    marginBottom: 0,
  },

  separator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  separatorLine: {
    backgroundColor: '#f00',
    width: 100,
    height: 1,
  },

  row: {
      height: 100,
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 10,
  },
});

// Register this component
AppRegistry.registerComponent('Hello', () => sample);
