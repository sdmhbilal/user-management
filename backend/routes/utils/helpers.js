import { HTTP_CODES } from './constants';

// Handling error response
const CatchResponse = ({
  res,
  err
}) => {
  let statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
  let error = 'Server Error';

  if (err.statusCode) {
    ({ statusCode } = err);
  }

  if (err.error) {
    ({ error } = err);
  }

  res.status(statusCode).json({
    success: false,
    error
  });
};

// Handling success response
const SuccessResponse = ({
  res,
  ...rest
}) => {
  res.status(HTTP_CODES.SUCCESS).send({
    success: true,
    ...rest
  });
};

export {
  CatchResponse,
  SuccessResponse
};
