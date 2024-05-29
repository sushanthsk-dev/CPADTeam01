import React from "react";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FeatureCard } from "../components/home.component";
import { Text } from "../../../components/typography/text.component";

const View = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <Spacer>
        <Searchbar icon="pin" value="Moodbidri, Mangalore" />
      </Spacer>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PeriodicServiceScreen")}
        >
          <FeatureCard title="Periodic Service" />
        </TouchableOpacity>

        <TouchableOpacity>
          <FeatureCard title="Mechanic Nearby" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FeatureCard title="Insurance & Emission Test Document" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
