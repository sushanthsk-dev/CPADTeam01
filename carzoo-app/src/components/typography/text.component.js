import styled from "styled-components/native";

const defaultTextStyle = (theme) => `
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap:wrap;
    margin-top:0px;
    margin-bottom:0px;
`;
const title = (theme) => `
    font-size:${theme.fontSizes.title};
    font-weight:${theme.fontWeights.bolder};
`;

const subTitle = (theme) => `
font-size:${theme.fontSizes.body};
font-weight:${theme.fontWeights.bolder};
color: ${theme.colors.text.primary};
text-align:center;
`;
const checkoutTitle = (theme) => `
font-size:18px;
font-weight:${theme.fontWeights.bolder};
color: ${theme.colors.text.primary};
`;

const body = (theme) => `
    font-size:${theme.fontSizes.body}
    font-weight:${theme.fontWeights.medium}
`;
const subHead = (theme) => `
    font-size:${theme.fontSizes.body}
    font-weight:${theme.fontWeights.bolder}
`;
const hint = (theme) => `
    font-size:${theme.fontSizes.hint}
`;
const error = (theme) => `
    font-size:${theme.fontSizes.error}
    color: ${theme.colors.text.error}
`;
const success = (theme) => `
    font-size:${theme.fontSizes.body}
    font-weight:${theme.fontWeights.bold}
    color: ${theme.colors.text.success}
`;
const caption = (theme) => `
    font-size:${theme.fontSizes.caption}
    font-weight:${theme.fontWeights.bold}
    color: ${theme.colors.text.primary};
`;
const light_text = (theme) => `
font-size:${theme.fontSizes.button}
font-weight:${theme.fontWeights.bolder}
color: ${theme.colors.text.secondary};
`;
const label = (theme) => `
    font-family:${theme.fonts.heading};
    font-size:${theme.fontSizes.body};
    font-weight:${theme.fontWeights.medium};
`;

const variants = {
  body,
  title,
  subTitle,
  checkoutTitle,
  label,
  subHead,
  caption,
  success,
  light_text,
  error,
  hint,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyle(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
