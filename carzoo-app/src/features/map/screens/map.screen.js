import React, { useContext, useState, useEffect } from "react";
import MapView, { Circle, Marker, Callout } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { Button as CallButton, Colors } from "react-native-paper";
import { AppState, AppStateStatus } from "react-native";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { Modal, TouchableOpacity, Linking } from "react-native";
import axios from "axios";
import * as CurrentLocation from "expo-location";
import { MapCallout } from "../components/map-callout.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Header } from "../../../components/header/header.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { IPADDRESS } from "../../../utils/env";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { GPSMapErrorScreen } from "../../gps-map-error/gps-map-error.screen";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const Button = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 5px;
  background-color: ${(props) =>
    props.focusButton === true
      ? props.theme.colors.brand.primary
      : props.theme.colors.ui.tertiary};
`;
const PopupUp = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  height: 50%;
  margin-top: auto;
  background-color: #fff;
`;
const KMButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  z-index: 888;
  bottom: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const KMText = styled(Text)`
  color: ${(props) =>
    props.focusButton === true ? "#fff" : props.theme.colors.ui.primary};
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 5px;
  left: 5px;
`;
const MechanicMap = ({ navigation }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [mechanics, setMechanics] = useState(null);
  // const { mechanics } = useContext(LocationContext);
  const [KM, setKM] = useState(1000);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isGPSEnabled, setIsGPSEnabled] = useState(null);
  const [currentMechanic, setCurrentMechanic] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [latDelta, setLatDelta] = useState(0);
  // lat delta determines how close the zoom level is going to be on map
  // const { lat, lng, viewport } = location;
  // useEffect(() => {
  //   const northeastLast = viewport.northeast.lat;
  //   const southwestLast = viewport.southwest.lat;
  //   setLatDelta(northeastLast - southwestLast);
  // }, [location, viewport]);

  const [coordinate, setCoordinate] = useState({
    latitude: 13.080888,
    longitude: 75.005192,
  });
  const [lagDelta, setLagDelta] = useState(0.033);

  const { longitude, latitude } = coordinate;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const KMButton = ({ value, km, id }) => (
    <Button focusButton={value === KM} key={id} onPress={() => setKM(value)}>
      <KMText
        focusButton={value === KM}
        variant="subHead"
      >{`Within ${km}KM`}</KMText>
    </Button>
  );

  const [appState, setAppState] = useState(AppState.currentState);

  const checkGPSPermission = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const d = await CurrentLocation.enableNetworkProviderAsync();
      let { status } =
        await CurrentLocation.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        setIsGPSEnabled(true);
      }
      if (status === "denied") {
        setIsGPSEnabled(false);
      }
      setIsGPSEnabled(status === "denied" ? false : true);
      if (status !== "granted") {
        setIsGPSEnabled(false);
        setErrorMsg("Permission to access location was denied");
        return null;
      } else {
        setIsGPSEnabled(true);
        let location = await CurrentLocation.getLastKnownPositionAsync();
        if (location) {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          if (isGPSEnabled && status === "granted")
            setCurrentLocation({
              latitude: 13.062119,
              longitude: 74.976985,
            });
        }
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setIsGPSEnabled(false);
      console.log(e);
    }
  };

  const fetchLocation = async () => {
    try {
      const km = KM / 1000;
      const res = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${headerToken}` },
        url: `${IPADDRESS}/api/v1/mechanic/mechanic-within/${km}/center/${currentLocation.longitude},${currentLocation.latitude}/unit/km?fields=name,phoneno,location,photo,role,workAssignedLocation`,
      });
      // setMechanics(res.data.data);
      setMechanics(res.data.data.data);
    } catch (e) {
      // console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    // handler for app state changes
    const handleAppStateChange = async (nextAppState = AppStateStatus) => {
      setAppState(nextAppState);
    };

    // register the handler to listen for app state changes
    AppState.addEventListener("change", handleAppStateChange);

    // unsubscribe
    return () => {
      if(typeof AppState.removeEventListener === "function") {
        return AppState.removeEventListener("change", handleAppStateChange);
      }
    }
  }, []);
  useEffect(() => {
    setLagDelta(KM === 1000 ? 0.033 : KM === 5000 ? 0.107 : 0.198);
  }, [KM]);

  useEffect(() => {
    // checks that app state changed to 'active' - user comes back from background or inactive state
    // note -- this will also trigger the first time you enter the screen
    checkGPSPermission();
  }, [appState]);

  useEffect(() => {
    if (currentLocation) {
      console.log(currentLocation);
      fetchLocation();
    }
  }, [KM, isGPSEnabled, currentLocation]);
  console.log("Hello", isGPSEnabled);
  return (
    <SafeArea>
      {isGPSEnabled === false && (
        <GPSMapErrorScreen
          errorMsg={errorMsg}
          grantGPS={checkGPSPermission}
          navigation={navigation}
        />
      )}
      {isLoading ? (
        <LoadingDiv noLoading={true} />
      ) : (
        <>
          <Header
            title="Nearby Mechanics"
            toLeft={true}
            navigation={navigation}
          />
          <Map
            region={{
              latitude: currentLocation ? currentLocation.latitude : 0,
              longitude: currentLocation ? currentLocation.longitude : 0,
              latitudeDelta: 0.0026979605829993147,
              longitudeDelta: lagDelta,
            }}
          >
            {currentLocation && (
              <>
                <Marker
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                >
                  <FontAwesome name="circle" size={24} color={Colors.blue500} />
                </Marker>
                <Circle
                  key={(longitude + latitude).toString()}
                  center={currentLocation}
                  radius={KM}
                  strokeWidth={2}
                  strokeColor={"#1a66ff"}
                  fillColor={"rgba(230,238,255,0.5)"}
                />
              </>
            )}
            {!!mechanics &&
              mechanics.map((mechanic, i) => {
                return (
                  <Marker
                    key={`${mechanic.name}+${i}`}
                    title={mechanic.name}
                    coordinate={{
                      latitude: mechanic.location.coordinates[1],
                      longitude: mechanic.location.coordinates[0],
                    }}
                  >
                    <Callout
                      onPress={() => {
                        setCurrentMechanic(mechanic);
                        setModalVisible(true);
                      }}
                    >
                      <MapCallout isMap={true} mechanic={mechanic} />
                    </Callout>
                  </Marker>
                );
              })}
            {/* <Marker
          draggable={true}
          coordinate={{ ...coordinate }}
          onDragEnd={(e) => {
            console.log(e.nativeEvent.coordinate);
            setCoordinate(e.nativeEvent.coordinate);
          }}
        /> */}
          </Map>
          <KMButtonContainer>
            <KMButton value={1000} km={1} id={1} />
            <KMButton value={5000} km={5} id={2} />
            <KMButton value={10000} km={10} id={3} />
          </KMButtonContainer>
          {!!currentMechanic && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // this.closeButtonFunction()
              }}
            >
              <PopupUp>
                <ProfilePhotoContainer />
                <Spacer>
                  <Text variant="checkoutTitle">{currentMechanic.name}</Text>
                </Spacer>
                <Spacer>
                  <Text>{currentMechanic.workAssignedLocation}</Text>
                </Spacer>
                <Spacer>
                  <CallButton
                    mode="contained"
                    onPress={() =>
                      Linking.openURL(`tel:${currentMechanic.phoneno}`)
                    }
                  >
                    Click here to call
                  </CallButton>
                </Spacer>
                <CloseButton
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Entypo name="cross" size={32} color="black" />
                </CloseButton>
              </PopupUp>
            </Modal>
          )}
        </>
      )}
    </SafeArea>
  );
};

export default function MapScreen ({ navigation }) {
  // const { location } = useContext(LocationContext);

  const location = true;
  if (!location) {
    return (
      <SafeArea>
        <Map
          region={{
            latitude: 0,
            longitude: 0,
          }}
        />
      </SafeArea>
    );
  }
  return <MechanicMap navigation={navigation} />;
};
