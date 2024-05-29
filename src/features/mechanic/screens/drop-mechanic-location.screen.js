import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Colors, Button } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";

const Map = styled(MapView)`
  flex: 1;
`;
const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  margin: ${(props) => props.theme.space[2]};
`;
const MechanicMap = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 13.080888,
    longitude: 75.005192,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lagDelta, setLagDelta] = useState(0.033);
  const { latitude, longitude } = coordinate;

  const onSubmit = () => {
    navigation.navigate("MechanicProfileScreen");
  };
  return (
    <SafeArea>
      <Header
        title="Drop current location"
        toLeft={true}
        navigation={navigation}
      />
      <Map
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0026979605829993147,
          longitudeDelta: lagDelta,
        }}
      >
        <Marker
          draggable={true}
          coordinate={{ ...coordinate }}
          onDragEnd={(e) => {
            console.log(e.nativeEvent.coordinate);
            setCoordinate(e.nativeEvent.coordinate);
          }}
        />
      </Map>
      <Spacer size="large">
        {!isLoading ? (
          <AuthButton mode="contained" onPress={() => onSubmit}>
            Add location
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </SafeArea>
  );
};

export const DropMechanicLocationScreen = ({ navigation }) => {
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
