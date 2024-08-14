const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';

  switch(err.name) {
    case 'WordNotFound':
      status = 404;
      message = 'Word Not Found';
      break;
    case 'AnswerNotValid':
      status = 400;
      message = 'You must answer according to the given words';
      break;
  }
  res.status(status).json({message});
}

module.exports = errorHandler