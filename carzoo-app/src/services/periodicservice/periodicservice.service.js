import { mock } from "./mock";

export const periodicServiceRequest = () => {
  return new Promise((resolve, reject) => {
    if (!mock) {
      reject("Not found");
    }
    resolve(mock.periodicService);
  });
};
export const periodicServiceTransform = ({ results = [] }) => {
  return results;
};
