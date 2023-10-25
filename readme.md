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
- CLOCK IN (POST) : api/v1/clockin
- CLOCK OUT (POST) : api/v1/clockout

### POST /api/v1/register

#### Request

- Body

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

### POST /api/v1/login

#### Request

- Body

#### Request

- Body

```json
{
  "username": "bayusujat",
  "password": "test1234"
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

### GET /api/v1/clockin

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

### GET /api/v1/clockout

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
