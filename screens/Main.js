import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: []
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  render() {
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>Sin acceso a la cámara</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Mira aquí....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}></View>
          <View style={styles.lowerBottomContainer}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "row"
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  appName: {
    fontSize: 25
  },
  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
    backgroundColor: "#E7F2F8"
  },
  lowerTopContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerBottomContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE7BC"
  }
});
