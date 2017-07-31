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
import Icon from 'react-native-vector-icons/FontAwesome';
import imagesList from './imageTestList.json';

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
    if(item.landscape === true) {
      imageStyle = { transform: [{ rotate: "90deg" }], width: 512, height: 342 };
    } else {
      imageStyle = { width: 342, height: 512 };
    }

    return (
      <View style={{flexDirection: "column" }}>
        <CachedImage
          style={ imageStyle }
          source={{uri: `${IMAGE_URL}/${item.csw}`}}
        />
        <View
          style={{width: "100%", flexDirection: "row",
          padding: 2}}
        >
          <Icon name="heart-o" size={25} color="#484955" />
          <Icon name="trash-o" size={25} color="#484955" />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
});

AppRegistry.registerComponent('image_download_performance', () => image_download_performance);
