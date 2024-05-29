import { locations } from "./mock";
export const locationRequest = () => {
  // console.log("Location?", searchTerm);
  // return fetch(
  //   `https://localhost:5001/mealstogo-6dac7/us-central1/geocode?city=toronto`
  // )
  //   .then((res) => res.json())
  //   .catch((e) => console.log(e));

  return new Promise((resolve, reject) => {
    const locationMock = locations;
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};
