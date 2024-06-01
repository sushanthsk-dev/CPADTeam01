const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/APIFeatures');
const { populate, model } = require('../models/user.model');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //Becouse this new updated doc is the one that will be returned
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body); //this service create return a promise we wait
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { modelName } = { ...Model };

    if (modelName === 'Booking') {
      if (req.user.role === 'user') {
        if (JSON.stringify(req.user.id) !== JSON.stringify(doc.user._id)) {
          return next(new AppError('Cannot access doc with this ID', 404));
        }
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };
    if (req.params.role) filter = { role: req.params.role };
    if (req.params.agentId) filter = { agent: req.params.agentId };
    //Executing query
    //this is returned becouase filter doesnot return any value for thew next methode so thts why we use
    //return this  will  entire object
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    // const doc = await features.query.explain(); //query will contain find(JSON.parse(queryString));
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  });
