import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Header } from "../../../components/header/header.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  DocumentCard,
  EmissionDocumentCard,
  InsuranceDocumentCard,
} from "../components/document-card.component";
import { InsuranceDocumentContext } from "../../../services/documents/insurance-document.context";
import { EmissionDocumentContext } from "../../../services/documents/emission-document.context";
const DocumentContainer = styled.View`
  margin-top: 60px;
  padding-top: 10px;
`;

const Card = styled.View`
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  justify-content: center;
`;

const DocumentIcon = styled.Image`
  height: 90px;
  width: 90px;
  margin: ${(props) => props.theme.space[2]};
`;

const DocumentText = styled(Text)`
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
  line-height: 30px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const AddDocumentCard = ({ title, imageUrl }) => (
  <Card>
    <DocumentIcon source={imageUrl} />
    <DocumentText variant="title">{title}</DocumentText>
  </Card>
);
export const DocumentScreen = ({ navigation }) => {
  const { insuranceDocument = null } = React.useContext(
    InsuranceDocumentContext
  );
  const { emissionDocument = null } = React.useContext(EmissionDocumentContext);

  return (
    <SafeArea>
      <Header
        toLeft={true}
        navigation={navigation}
        title="Insurance & Emission Documents"
      />

      <DocumentContainer>
        {insuranceDocument === null ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddDocumentScreen", { insurance: true })
            }
          >
            <AddDocumentCard
              title="Add Insurance Document Details"
              imageUrl={require("../../../../assets/insuranceIcon.png")}
            />
          </TouchableOpacity>
        ) : (
          <InsuranceDocumentCard
            navigation={navigation}
            insuranceDocument={insuranceDocument}
          />
        )}
        {emissionDocument === null ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddDocumentScreen", { insurance: false })
            }
          >
            <AddDocumentCard
              title="Add Emission Document Details"
              imageUrl={require("../../../../assets/emissionIcon.jpg")}
            />
          </TouchableOpacity>
        ) : (
          <EmissionDocumentCard
            navigation={navigation}
            emissionDocument={emissionDocument}
          />
        )}
      </DocumentContainer>
    </SafeArea>
  );
};
