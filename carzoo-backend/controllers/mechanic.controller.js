const Admin = require('../models/admin.model');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');

// router.route(
//   '/mechanics-within/:distance/center/:latlng/unit/:unit',

// );
// /mechanics-distance?distance=233&center=13.058042, 74.994978&unit=mi
// /mechanic-distance/233/center/13.058042, 74.994978/unit/mi
exports.getMechanicsWithin = CatchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  // 3963.2 is radians of earth in miles
  //6378.1is radius of earth in km
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng',
        404
      )
    );
  }
  //geoSpace querying
  //start points is te geospatial point where each mechanic starts
  //geoWithin within a certain gemmetry
  const filter = {
    location: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
    active: { $ne: false },
  };

  const features = new APIFeatures(Admin.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getDistances = CatchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  // 3963.2 is radians of earth in miles
  //6378.1is radius of earth in km 1meter in miles
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001; // 1 meter in miles and 1 meter in km
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng',
        404
      )
    );
  }

  const distance = await Admin.aggregate([
    {
      //this is only geospatial aggregation pipeline stage that actually exists
      //geoNear always needs to be the first stage
      //iT requres that atleast one of our fields contains a geospatial index
      //If there is only one field with a geospatial index tjem thios geoNear stage here will automatically
      // use that index in order to perform calculation
      //if u have mutliple fields with geospatial indexes then you need to use keys parameters in order to define
      //the field that u want to use inorder to calculate
      //!remember geoNear is only valid as the first stage in a pipeline
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance', //this is the field that will be created and where all the calc distance will be stored
        distanceMultiplier: multiplier,
      },
      $match: { active: { $ne: false } },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      data: distance,
    },
  });
});
