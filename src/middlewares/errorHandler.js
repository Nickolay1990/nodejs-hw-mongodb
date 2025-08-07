export const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
