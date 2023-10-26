# Backend Test PT Uninet Media Sakit by Adrian Mulyawan

## How to Install

- npm install
- change the .env.example file to .env, then fill it with BEARER_TOKEN and SALT_ROUNDS
- npx sequelize init (initialize database)
- npx sequelize db:create (create database)
- npx sequelize db:migrate (migrate database)
- run ngrok using "ngrok http 3000"
- run express server using nodemon "nodemon app.js"

## 2. Endpoint

- REGISTER (POST) : /api/v1/register
- LOGIN (POST) : /api/v1/login
- GET USER LOGIN (GET) : /api/v1/userLogin
- CLOCK IN (POST) : /api/v1/clockin
- CLOCK OUT (POST) : /api/v1/clockout

### POST /api/v1/register

#### Request

- Body

```json
{
  "fullname": "Bayu Sujatmoko",
  "email": "bayusujatmoko@gmail.com",
  "username": "bayusujat",
  "password": "test1234"
}
```

#### Response

201 - Register Success

- Body

```
{
    "status": "Success",
    "statusCode": 200,
    "message": "Register Successfully!",
    "data": {
        "id": 4,
        "fullname": "Budi Susanto",
        "email": "budisusanto@gmail.com",
        "username": "budisusanto",
        "password": "$2b$12$uIRVpSFQIz9pOgTFK.ufeeKLsNdwLka3l5Spl2SCYTol/2oEUWAKC",
        "updatedAt": "2023-10-26T03:49:30.666Z",
        "createdAt": "2023-10-26T03:49:30.666Z"
    }
}
```

400 - Fullname or Username or Email or Password Empty

- Body

```
{
    status: 'Failed',
    statusCode: 400,
    message: "Email, Password, Username, and Full Name Can't be Empty!"
}
```

400 - Email is Already Use

- Body

```
{
    "status": "Failed",
    "statusCode": 400,
    "message": "Email is Already Use!"
}
```

400 - Username is Already Use

- Body

```
{
    "status": "Failed",
    "statusCode": 400,
    "message": "Username is Already Use!"
}
```

### POST /api/v1/login

#### Request

- Body

```json
{
  "username": "bayusujat",
  "password": "test1234"
}
```

201 - Login Success

- Body

```
{
    "status": "Success",
    "statusCode": 200,
    "message": "Register Successfully!",
    "data": {
        "id": 4,
        "fullname": "Budi Susanto",
        "email": "budisusanto@gmail.com",
        "username": "budisusanto",
        "password": "$2b$12$uIRVpSFQIz9pOgTFK.ufeeKLsNdwLka3l5Spl2SCYTol/2oEUWAKC",
        "updatedAt": "2023-10-26T03:49:30.666Z",
        "createdAt": "2023-10-26T03:49:30.666Z"
    }
}
```

400 - Fullname or Username or Email or Password Empty

- Body

```
{
    status: 'Failed',
    statusCode: 400,
    message: "Email, Password, Username, and Full Name Can't be Empty!"
}
```

### GET /api/v1/userLogin

#### Request

- Authorization

```
{
   Bearer Token: "token_from_respon_login"
}
```

#### Response

401 - Token Unauthorized

- Body

```
{
    "status": "Failed",
    "statusCode": 401,
    "message": "Token Unauthorized!"
}
```

### POST /api/v1/clockin

#### Request

- Authorization

```
{
   Bearer Token: "token_from_respon_login"
}
```

- Body

```json
{
  "latitude_in": "latitude_from_fe",
  "longitude_in": "longitude_from_fe"
}
```

#### Response

200 - Presence on time

- Body

```
{
    "status": "Success",
    "statusCode": 200,
    "message": "Prefance Success",
    "data": {
        "id": 13,
        "user_id": 1,
        "presance_date": "2023-10-26T03:23:06.000Z",
        "clock_in_at": "10:23:06",
        "clock_out_at": null,
        "ip_address": "180.242.215.134",
        "latitude_in": "-6.180",
        "longitude_in": "106.1",
        "latitude_server_in": "-6.175",
        "longitude_server_in": "106.8286",
        "is_late": false,
        "updatedAt": "2023-10-26T03:23:06.311Z",
        "createdAt": "2023-10-26T03:23:06.311Z",
        "latitude_out": null,
        "latitude_server_out": null,
        "longitude_out": null,
        "longitude_server_out": null
    },
    "prefencesStatus": "Ontime!"
}
```

200 - Presence late

- Body

```
{
    "status": "Success",
    "statusCode": 200,
    "message": "Prefance Success",
    "data": {
        "id": 13,
        "user_id": 1,
        "presance_date": "2023-10-26T03:23:06.000Z",
        "clock_in_at": "10:23:06",
        "clock_out_at": null,
        "ip_address": "180.242.215.134",
        "latitude_in": "-6.180",
        "longitude_in": "106.1",
        "latitude_server_in": "-6.175",
        "longitude_server_in": "106.8286",
        "is_late": true,
        "updatedAt": "2023-10-26T03:23:06.311Z",
        "createdAt": "2023-10-26T03:23:06.311Z",
        "latitude_out": null,
        "latitude_server_out": null,
        "longitude_out": null,
        "longitude_server_out": null
    },
    "prefencesStatus": "Late!"
}
```

400 - Presance more than 1 time

- Body

```
{
    "status": "Success",
    "message": "You have made a presence!"
}
```

401 - Token Unauthorized

- Body

```
{
    "status": "Failed",
    "statusCode": 401,
    "message": "Token Unauthorized!"
}
```

### POST /api/v1/clockout

#### Request

- Authorization

```
{
   Bearer Token: "token_from_respon_login"
}
```

- Body

```json
{
  "latitude_out": "latitude_from_fe",
  "longitude_out": "longitude_from_fe"
}
```

#### Response

200 - Presance clock out success

- Body

```
{
    "status": "Success",
    "statusCode": 200,
    "message": "Prefance Success",
    "data": {
        "id": 13,
        "user_id": 1,
        "presance_date": "2023-10-26T03:23:06.000Z",
        "clock_in_at": "10:23:06",
        "clock_out_at": "17:39:10",
        "ip_address": "180.242.215.134",
        "latitude_in": "-6.180",
        "latitude_out": "-6.180",
        "latitude_server_in": "-6.175",
        "latitude_server_out": -6.175,
        "longitude_in": "106.1",
        "longitude_out": "106.1",
        "longitude_server_in": "106.8286",
        "longitude_server_out": 106.8286,
        "is_late": true,
        "createdAt": "2023-10-26T03:23:06.311Z",
        "updatedAt": "2023-10-26T03:39:10.482Z"
    },
    "prefencesStatus": "Have a nice rest!"
}
```

400 - The user has been absent from going home more than once or the user has not been absent from coming home or has been absent from going home before 17:00

- Body

```
{
    "status": "Failed",
    "statusCode": 400,
    "message": "You haven't been absent yet or make an absence to go home before 17:00!"
}
```

401 - Token Unauthorized

- Body

```
{
    "status": "Failed",
    "statusCode": 401,
    "message": "Token Unauthorized!"
}
```
