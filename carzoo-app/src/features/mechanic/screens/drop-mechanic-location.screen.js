import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as CurrentLocation from "expo-location";
import { AppState, AppStateStatus } from "react-native";
import { ActivityIndicator, Colors, Button } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { Text } from "../../../components/typography/text.component";
import { GPSMapErrorScreen } from "../../gps-map-error/gps-map-error.screen";
import { AgentMechanicContext } from "../../../services/agent-mechanic/agent-mechanic.context";
const Map = styled(MapView)`
  flex: 1;
`;
const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  margin: ${(props) => props.theme.space[2]};
`;

const MechanicMap = ({ navigation, route }) => {
  const { addMechanicLocation } = React.useContext(AgentMechanicContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(true);
  const [isGPSEnabled, setIsGPSEnabled] = useState(true);
  const [lagDelta, setLagDelta] = useState(0.033);
  const [coordinate, setCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const onSubmit = async () => {
    const res = await addMechanicLocation(currentLocation);
    if (res === "success") {
      navigation.navigate("MechanicProfileScreen");
    }
  };

  const checkGPSPermission = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
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
      }
      if (route.params) {
        if (route.params.location) {
          const [lng, lat] = route.params.location;
          setIsGPSEnabled(true);
          setCurrentLocation({
            latitude: lat,
            longitude: lng,
          });
        }
      } else {
        setIsGPSEnabled(true);
        let location = await CurrentLocation.getLastKnownPositionAsync();
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsGPSEnabled(false);
      console.log(e);
    }
  };

  useEffect(() => {
    // checks that app state changed to 'active' - user comes back from background or inactive state
    // note -- this will also trigger the first time you enter the screen
    checkGPSPermission();
  }, []);
  console.log(currentLocation);
  return (
    <SafeArea>
      {isGPSEnabled === false && (
        <GPSMapErrorScreen
          errorMsg={errorMsg}
          grantGPS={checkGPSPermission}
          navigation={navigation}
        />
      )}
      {!isLoading ? (
        <>
          <Header
            title="Drop current location"
            navigation={navigation}
            toLeft={
              route.params ? (route.params.location ? true : false) : false
            }
          />
          <Map
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0026979605829993147,
              longitudeDelta: lagDelta,
            }}
          >
            <Marker
              draggable={true}
              coordinate={{ ...currentLocation }}
              onDragEnd={(e) => {
                console.log(e.nativeEvent.coordinate);
                setCurrentLocation(e.nativeEvent.coordinate);
              }}
            />
          </Map>
          <Spacer size="large">
            <Spacer position="left" size="medium">
              <Text variant="body">
                Please drag the location drop pin to add your location
              </Text>
            </Spacer>
            {!isLoading ? (
              <AuthButton mode="contained" onPress={onSubmit}>
                Add location
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </>
      ) : (
        <LoadingDiv noLoading={true} />
      )}
    </SafeArea>
  );
};

export const DropMechanicLocationScreen = ({ navigation, route }) => {
  // const { location } = useContext(LocationContext);
  console.log(route);
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
  return <MechanicMap navigation={navigation} route={route} />;
};
