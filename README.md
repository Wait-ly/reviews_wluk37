# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD API Routes

'GET': /api/listings/:restaurantID/reviews
  - finds all reviews for a particular restaurant
  - returns:
  {
    id: Number,
    userID: Number,
    restaurantID: Number,
    review: String,
    overall: Number,
    food: Number,
    service: Number,
    ambience: Number,
    value: Number,
    noiseLevel: String,
    recommendation: Boolean,
    date: Date
  }

'POST': /api/listings/:restaurantID/reviews
  - posts a new review for a particular restaurant
  - returns if operation was successful

'PUT': /api/listings/:restaurantID/reviews/:reviewID
  - updates a review for a particular restaurant
  - returns if operation was successful

'DELETE': /api/:restaurantID/reviews/:reviewID
  - deletes a review for a particular restaurant
  - returns if operation was successful
