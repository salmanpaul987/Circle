import React, { Component } from 'react';
import {  Image, ScrollView, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import CameraRoll from '@react-native-community/cameraroll';

export default class App extends Component {
  state = { photos: null };

  render() {
    let { photos } = this.state;
    return (
      <ScrollView style={styles.container}>
        {photos
          ? this._renderPhotos(photos)
          : <Text style={styles.paragraph}>Fetching photos...</Text>}
      </ScrollView>
    );
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
        <Image
          source={photo.image}
          resizeMode="contain"
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
      );
    }
    return images;
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 5 });
    this.setState({ photos });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
