## Endpoints :

List of available endpoints:

- `GET /random-words`
- `POST /check-word`
- `GET /rooms`
- `POST /rooms`
- `POST /rooms/:roomId/join`
- `PUT /rooms/:roomId`
- `GET /rooms/:roomId`

## 1. GET /random-words

_Response (200 - OK)_

```json
{
  "id": 81823,
  "word": "Reversion",
  "shortWord": "Rev"
}
```

&nbsp;

## 2. POST /check-word

Request :

- body :

```json
{
  "question": "string",
  "answer": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "word": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You must answer according to the given words"
}
```

_Response (404 - Error Not Found)_

```json
{
  "message": "Word Not Found"
}
```

&nbsp;

## 3. GET /rooms

_Response (200 - OK)_

```json
[
  {
    "id": "<string>",
     "name": "<string>",
    "winner": "<string>",
    "playerCount": "<integer>",
    "isFinished": "<boolean>",
    "Players": [
        {
        "id": "<integer>",
        "username": "<string>",
        "lives": "<integer>",
        "RoomId": "<integer>",
        "createdAt": "<string>",
        "updatedAt": "<string>"
      },
      ...
    ]
    ...
  }
]
```

&nbsp;

## 4. POST /rooms

Request :

- body :

```json
{
  "name": "string",
  "username": "string"
}
```

_Response (201 - CREATED)_

```json
{
  "message": "Room and player created!",
  "data": {
    "room": {
      "winner": "TBD",
      "playerCount": 1,
      "isFinished": false,
      "id": 8,
      "name": "string",
      "updatedAt": "string",
      "createdAt": "string"
    },
    "player": {
      "lives": 3,
      "id": 10,
      "RoomId": 8,
      "username": "string",
      "updatedAt": "string",
      "createdAt": "string"
    }
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Room not found"
}
```

_Response (400 - Bad Request)_


```json
{
  "message": "Word Not Found"
}
```

&nbsp;

## 5. POST /rooms/:roomId/join

Request :

- params:

```json
{
  "roomId": "<integer>"
}
```

- body :

```json
{
  "username": "string"
}
```

_Response (201 - CREATED)_

```json
{
  "message": "Player joined room!",
  "player": {
    "lives": 3,
    "id": 10,
    "RoomId": 8,
    "username": "string",
    "updatedAt": "string",
    "createdAt": "string"
  }
}
```

_Response (404 - Error Not Found)_

```json
{
  "message": "Room not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Sorry Room is full, please find another room"
}
```

&nbsp;

## 6. PUT /rooms/:roomId

Request :

- params:

```json
{
  "roomId": "<integer>"
}
```

_Response (200 - OK)_

```json
{
  "message": "Game has finished, thank you for playing"
}
```

&nbsp;

## 7. GET /rooms/:roomId

Request :

- params:

```json
{
  "roomId": "<integer>"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "aku mau maen",
    "winner": "TBD",
    "playerCount": 2,
    "isFinished": false,
    "Players": [
        {
            "id": 1,
            "username": "nobueno_.",
            "lives": 3,
            "RoomId": 1
        },
        {
            "id": 3,
            "username": "nobueno",
            "lives": 3,
            "RoomId": 1
        }
    ]
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```