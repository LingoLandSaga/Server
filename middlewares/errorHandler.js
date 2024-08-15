const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';

  switch (err.name) {
    case 'WordNotFound':
      status = 404;
      message = 'Word Not Found';
      break;
    case 'AnswerNotValid':
      status = 400;
      message = 'You must answer according to the given words';
      break;
    case "RoomNameEmpty":
      status = 404;
      message = "Room name must not empty"
      break
    case "UserNameEmpty":
      status = 404;
      message = "User name must not empty"
      break
    case "RoomIdEmpty":
    case "RoomNotFound":
      status = 404;
      message = "Room not found"
      break
    case "RoomIsFull":
      status = 404;
      message = "Sorry Room is full, please find another room"
      break
  }
  console.log(err)
  res.status(status).json({ message });
}

module.exports = errorHandler