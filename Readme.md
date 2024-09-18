# Shakti Energy Trading Platform

## Overview

The Shakti Energy Trading Platform is an API-driven application designed to facilitate user authentication, setup, and bidding for renewable energy trading. It leverages JSON Web Tokens (JWT) for secure authentication and authorization.

## Features

- User authentication via OTP and password
- Setup for prosumers and consumers
- Bidding for energy trading
- Real-time data access for users
- Error handling and logging

## API Documentation

### Endpoints

#### Send OTP

- **URL**: `/sendotp`
- **Method**: `POST`
- **Request Body**:
  - `PhoneNo`: string (required)
- **Response**:
  - `200 OK`: OTP sent successfully
  - `500 Internal Server Error`: Error sending OTP

#### Sign Up

- **URL**: `/signup`
- **Method**: `POST`
- **Request Body**:
  - `PhoneNo`: string (required)
  - `password`: string (required)
  - `connectionId`: string (required)
  - `otp`: string (required)
  - `username`: string (required)
  - `accountType`: string (required)
- **Response**:
  - `200 OK`: User created successfully
  - `401 Unauthorized`: Invalid OTP
  - `500 Internal Server Error`: Error creating user

#### Sign In

- **URL**: `/signin`
- **Method**: `POST`
- **Request Body**:
  - `PhoneNo`: string (required)
  - `password`: string (required)
  - `connectionId`: string (required)
  - `accountType`: string (required)
- **Response**:
  - `200 OK`: Login successful
  - `401 Unauthorized`: Invalid credentials
  - `500 Internal Server Error`: Error logging in

#### Setup

- **URL**: `/setup`
- **Method**: `POST`
- **Request Body**:
  - `solarCapacity`: string (required for prosumer)
  - `city`: string (required)
  - `pincode`: string (required)
  - `gps`: string (required)
  - `solarBrand`: string (required for prosumer)
  - `year`: string (required)
  - `load`: string (required)
- **Response**:
  - `200 OK`: Setup successful
  - `401 Unauthorized`: Invalid token
  - `500 Internal Server Error`: Error setting up

#### Place Bid (Day Ahead)

- **URL**: `/placebid/dayahead`
- **Method**: `POST`
- **Request Body**:
  - `arr`: array of objects (required)
  - `timeslot`: string (required)
  - `volume`: string (required)
  - `price`: string (required)
- **Response**:
  - `200 OK`: Bid placed successfully
  - `401 Unauthorized`: Invalid token
  - `500 Internal Server Error`: Error placing bid

### Error Handling

All error responses will have a JSON body with a `message` property describing the error. The HTTP status code will indicate the type of error:

- `401 Unauthorized`: Authentication or authorization error
- `500 Internal Server Error`: Server-side error

### Security

- All endpoints require a valid JWT token in the Authorization header.
- Passwords are hashed using bcrypt.
- OTPs are stored in memory and expire after 5 minutes.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Twilio account for OTP functionality

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd shakti_platform_backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file with the required environment variables.

## this repo has my previous intern work at a startup called Shakti Energy. Now that they have pivoted to a new product, I'm making this repo public.
