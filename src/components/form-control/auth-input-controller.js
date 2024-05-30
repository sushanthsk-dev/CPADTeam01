import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Controller } from "react-hook-form";
import styled from "styled-components";

export const AuthInput = styled(TextInput)`
  width: 100%;
`;

export const AuthInputController = ({
  label = "text",
  rules,
  name,
  control,
  modeStyle = "outlined",
  defaultValue,
  ...props
}) => {
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <AuthInput
            mode={modeStyle}
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
            label={defaultValue ? defaultValue : label}
            {...props}
          />
        );
      }}
      name={name}
      rules={rules}
    />
  );
};
