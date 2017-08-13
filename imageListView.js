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
  PixelRatio,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { ImageCache, CachedImage } from 'react-native-img-cache';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    console.log("Image loaded." );
  }

  getCloudinaryRequestUri(height, width) {
    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
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
        <ScrollView
          contentContainerStyle={{ flexDirection: "column", alignItems: "center", width: "100%", height: width * FULL_IMAGE_ASPECT_RATIO }}
          centerContent={true}
          maximumZoomScale={2}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={function() {}}>
            <CachedImage
              style={ imageStyle }
              source={ { uri: this.getCloudinaryRequestUri(height, width) } }
              onLoadStart={ this.onLoadStart }
              onLoadEnd={ this.onLoadEnd }
            />
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.separator} />
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

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
