import React from "react";
import { CompactMechanicInfo } from "../../../components/mechanic/compact-mechanic";

export const MapCallout = ({ mechanic, isMap }) => {
  return <CompactMechanicInfo isMap={isMap} mechanic={mechanic} />;
};
