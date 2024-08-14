## Endpoints :

List of available endpoints:

-   `GET /random-words`
-   `POST /word-check`

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

-   body :

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