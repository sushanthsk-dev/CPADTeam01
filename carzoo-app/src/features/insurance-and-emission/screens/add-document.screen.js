import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AddEmissionDocument,
  AddInsuranceDocument,
} from "../components/add-document.component";

export const AddDocumentScreen = ({ navigation, route }) => {
  //x const { address, addAddress, isLoading } = useContext(AddressContext);
  const { insurance = false } = route.params;

  const isLoading = false;

  return (
    <SafeArea>
      <Header
        title={`Add ${insurance ? "Insurance" : "Emission"} Details`}
        toLeft={true}
        navigation={navigation}
      />
      {!!insurance ? (
        <AddInsuranceDocument navigation={navigation} />
      ) : (
        <AddEmissionDocument navigation={navigation} />
      )}
    </SafeArea>
  );
};
