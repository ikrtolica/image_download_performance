/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { ImageCache } from 'react-native-img-cache';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagesList from './fullSizeImagesTest.json';
import ImageListView from './imageListView';

export default class image_download_performance extends Component {

  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  componentDidMount() {
    ImageCache.get().clear();  // This is to test scrolling performance, not recommended normally.
    this.setState({ images: imagesList });
  }

  renderItem = ({item}) => {
    //console.log(`${item.csw} : ${item.landscape ? 'landscape' : 'portrait'}`);
    return (
      <ImageListView {...item} />
    );
  }

  keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          data={this.state.images}
          initialNumToRender={3}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

AppRegistry.registerComponent('image_download_performance', () => image_download_performance);
