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
import { ImageCache, CachedImage } from 'react-native-img-cache';
import imagesList from './imagesList.json';

const IMAGE_URL = "https://static.blinkinc.com";

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

    var imageStyle;
    if(item.landscape) {
      imageStyle = { alignItems: "center", justifyContent: "center", transform: [{ rotate: '90deg'}], width: 341, height: 512 };
    } else {
      imageStyle = { alignItems: "center", justifyContent: "center", width: 341, height: 512 };
    }

    return (
      <CachedImage
        style={ imageStyle }
        source={{uri: `${IMAGE_URL}/${item.csw}`}}
      />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.images}
          initialNumToRender={1}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
  },
  listBox: {
    alignItems: 'stretch',
  },
  imageDisplay: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

AppRegistry.registerComponent('image_download_performance', () => image_download_performance);
