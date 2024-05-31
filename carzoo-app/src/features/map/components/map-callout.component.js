import React from "react";
import { CompactMechanicInfo } from "../../../components/mechanic/compact-mechanic";

export const MapCallout = ({ mechanic = "Hello", isMap }) => {
  return <CompactMechanicInfo isMap={isMap} mechanic={mechanic} />;
};
