import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button as CallButton } from "react-native-paper";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View } from "react-native";
import { MapCallout } from "../components/map-callout.component";
// import { LocationContext } from "../../../services/location/location.context";
// import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
// import { Search } from "../components/search.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { LocationContext } from "../../../services/location/location.context";
import { Text } from "../../../components/typography/text.component";
import { MechanicScreen } from "../../mechanic/screens/mechanic.screen";
import { BottomPopup } from "../../mechanic/screens/popup";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Header } from "../../../components/header/header.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const Button = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
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
  z-index: 999;
  bottom: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 5px;
  left: 5px;
`;
const RestaurantMap = ({ navigation }) => {
  const { mechanics } = useContext(LocationContext);
  const [KM, setKM] = useState(1000);
  const [currentMechanic, setCurrentMechanic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  const { latitude, longitude } = coordinate;
  const LATLNG = {
    latitude: 13.077680131725623,
    longitude: 75.00013064593077,
  };
  // useEffect()

  const KMButton = ({ value, km, id }) => (
    <Button key={id} onPress={() => setKM(value)}>
      <Text variant="subHead">{`Within ${km}KM`}</Text>
    </Button>
  );

  useEffect(() => {
    setLagDelta(KM === 1000 ? 0.033 : KM === 5000 ? 0.107 : 0.198);
  }, [KM]);
  return (
    <SafeArea>
      <Header title="Nearby Mechanics" toLeft={true} navigation={navigation} />
      <Map
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0026979605829993147,
          longitudeDelta: lagDelta,
        }}
      >
        <MapView.Circle
          key={(longitude + latitude).toString()}
          center={LATLNG}
          radius={KM}
          strokeWidth={2}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
        {mechanics.map((mechanic, i) => {
          return (
            <MapView.Marker
              key={`${mechanic.name}+${i}`}
              title={mechanic.name}
              coordinate={{
                latitude: mechanic.coordinate.latitude,
                longitude: mechanic.coordinate.longitude,
              }}
            >
              <MapView.Callout
                onPress={() => {
                  setCurrentMechanic(mechanic);
                  setModalVisible(true);
                }}
              >
                <MapCallout isMap={true} mechanic={mechanic} />
              </MapView.Callout>
            </MapView.Marker>
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
              <Text>Moodbidri</Text>
            </Spacer>
            <Spacer>
              <Text>1KM away</Text>
            </Spacer>

            <Spacer>
              <CallButton mode="contained">Click here to call</CallButton>
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
    </SafeArea>
  );
};

export const MapScreen = ({ navigation }) => {
  //const { location } = useContext(LocationContext);
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
  return <RestaurantMap navigation={navigation} />;
};
