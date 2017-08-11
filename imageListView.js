/*

  Implements an image viewer that assumes that the device is always in portrait
  mode.  Will not respond to device rotation as it only gets the device dims
  at render time.

  Provides zoom using scroll view.

*/

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio
} from 'react-native';
import { ImageCache, CachedImage } from 'react-native-img-cache';
import Icon from 'react-native-vector-icons/FontAwesome';

const IMAGE_URL = "https://static.blinkinc.com";
const BASE_IMAGE_URL = "https://res.cloudinary.com"
const CLOUDINARY_REMOTE_FOLDER = "blink_remote";
const CLOUDINARY_USER_ID = "dkw13vlcj";
const FULL_IMAGE_ASPECT_RATIO = 1.5;

export default class ImageListView extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount(){
    console.log("Image view unmounting.");
  }

  onLoadStart = (imgName) => {
    console.log("Loading image " + imgName);
  }

  onLoadEnd = () => {
    console.log("Image loaded.");
  }

  getRequestUri() {
    const { height, width } = Dimensions.get('window');
    console.log("height: " + height + " width: " + width);
    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
    console.log("pixelWidth: " + pixelWidth);
    const dimensionCommand = this.props.landscape ? `h_${pixelWidth}` : `w_${pixelWidth}`;
    const commandString = `c_scale,${dimensionCommand}`;
    return (`${BASE_IMAGE_URL}/${CLOUDINARY_USER_ID}/image/upload/${commandString}/${CLOUDINARY_REMOTE_FOLDER}/${this.props.cf}`);
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const imageHeight = width * FULL_IMAGE_ASPECT_RATIO;

    var imageStyle = this.props.landscape ?
      { transform: [ { rotate: "90deg" },
          { translateX: (imageHeight - width) / 2 } ],
        width: imageHeight, height: width } :
      { width: width, height: width * FULL_IMAGE_ASPECT_RATIO };

    return (
      <View style={{flexDirection: "column" }}>
        <View
          style={{ flexDirection: "column", alignItems: "center", width: "100%", height: width * FULL_IMAGE_ASPECT_RATIO }}
        >
          <CachedImage
            style={ imageStyle }
            source={ { uri: this.getRequestUri() } }
            onLoadStart={ this.onLoadStart }
            onLoadEnd={ this.onLoadEnd }
          />
        </View>
        <View
          style={{ flexDirection: "row", margin: 5 }}
        >
          <Icon style={{ margin: 5 }} name="heart-o" size={25} color="#484955" />
          <Icon style={{ margin: 5 }} name="trash-o" size={25} color="#484955" />
        </View>
      </View>
    );
  }
}
