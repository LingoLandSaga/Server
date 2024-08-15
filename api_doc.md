## Endpoints :

List of available endpoints:

- `GET /random-words`
- `POST /word-check`

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

## 2. POST /word-check

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

<!-- ```json -->
<!-- // { -->
<!-- //   "message": "You must answer according to the given words" -->
<!-- // } -->
<!-- ``` -->

_Response (404 - Error Not Found)_

<!--
```json
{
  "message": "Word Not Found"
}
``` -->

&nbsp;

## 5. POST /:roomId/join

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

<!-- ```json -->
<!-- // { -->
<!-- //   "message": "You must answer according to the given words" -->
<!-- // } -->
<!-- ``` -->

_Response (404 - Error Not Found)_

<!--
```json
{
  "message": "Word Not Found"
}
``` -->

&nbsp;
