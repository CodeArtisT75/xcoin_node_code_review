# XCoin interview backend project

this is a simple expressjs app that exposes some APIs. it uses MongoDB as its database and mongoose as its ODM.

I've made some improvements to this project that are listed below:

- [1. Add dev tools to the project](#1-add-dev-tools-to-the-project)
- [2. Create an example for .env file](#2-create-an-example-for-env-file)
- [3. Remove unused codes in production (and console logs)](#3-remove-unused-codes-in-production-and-console-logs)
- [4. Use ES6 features and improve code quality](#4-use-es6-features-and-improve-code-quality)
- [5. Improve database schema and mongoose models](#5-improve-database-schema-and-mongoose-models)
- [6. Use better convention and version for routes](#6-use-better-convention-and-version-for-routes)
- [7. Create better responses for end-user](#7-create-better-responses-for-end-user)
- [8. Add validation for user inputs](#8-add-validation-for-user-inputs)
- [9. Add pagination for APIs](#9-add-pagination-for-apis)
- [10. Create logger service for the project](#10-create-logger-service-for-the-project)
- [11. Add MongoDB connection lost handler](#11-add-mongodb-connection-lost-handler)
- [12. Add helmet for better security (+ some advices)](#12-add-helmet-for-better-security-advice)
- [13. Handling errors in some cases](#13-handling-errors-in-some-cases)
- [13. Improve seeder](#14-improve-seeder)
- [14. Remove unused packages](#15-remove-unused-packages)

### 1. Add dev tools to the project

I added some dev tools to the project for better development. first, I added a .gitignore file add all ignored files for
source control. after that, I added prettier and eslint and I config them based on the project. also, I added commitlint
for better commit messages. for automation of the dev tools (linter, etc), I added husky and lint-staged to the project.

finally, I ran linter and prettier, fix the problems and commit a new refactored codebase.

### 2. Create an example for .env file

if we run code without environment variables, the application will crash. also, there are multiple env variables and
every developer must be informed about them. for this reason, I created a .env.example file for the project and anyone who
wants to work on this project can create a .env file based on the given example.

### 3. Remove unused codes in production (and console logs)

when I added linter to the project, it detects some unused code and imports. I removed them. also, I removed some
useless console logs from the code. if we need some logs, we can use a better logger system. I added `winston` package as a logger
and in some cases, I logged some errors.

### 4. Use ES6 features and improve code quality

With the help of eslint, some ES5 codes have been transferred to the ES6 standard. like converting var to const or let.
also, some minor problems like typos have been fixed.

### 5. Improve database schema and mongoose models

first, by checking seeder and user inputs (from APIs), I recognized there are some fields that are not stored in the
database. so I added them to the mongoose model. they mostly belong to `Simulator` model.

after that, I made some improvements to models and schema.

in the `profiles` collection, the `capital` field can have a default value. so I set a default value for it. also, in my
opinion It's a good idea to know when the document is created and when the last update has happened. so I
added `timestamps` to the model.

in the `favorites` collection, I think it's a better idea to save favorites as an Array (instead of storing them one by
one). so I changed the type of favorites from multiple `String` fields to just one `Array`. also, I changed the type of
profileId from `String` to mongoose `ObjectId` and referenced it to the `Profile` model. we could store favorites
in the `Profile` model itself. but in some cases I preferred not to do that and keep favorites separated from profiles
collection. one of my reasons was to create multiple favorite groups. each group has its own name and array of
favorites.

in the `simulators` collection, I added some new fields and do some improvements.

finally, in all models, I preferred to use camelCase instead of snake_case. because in my opinion, it's more like
javascript environment.

### 6. Use better convention and version for routes

If we want to create better and meaningful APIs, we can use a good convention for our routes. I changed singular
routes to plural based on their resource. for example, I changed `/profile` routes to `/profiles` because it referred to
a specific resource `(Profile)`. and I changed route params from snake_case to camelCase style.

Also, we need to add a version to our endpoints because if we make some changes to APIs, the old clients will break. so I
added `/v1` to the endpoints.

### 7. Create better responses for end-user

It's a good idea to have the same response format for the client. so, I changed the response type to something like this:

```json
{
  "DATA_KEY": "DATA_VALUE",
  "message": "NEEDED MESSAGE"
}
```

anything likes response of `profiles` or `simulators` or even `errors` can fit in DATA. and if we need a message for the
result of the operation, we can put it in the `message` key.

also, we should use a suitable status code for the response. I set a status code based on the result of the operation.

in some cases, I preferred to hide some fields in response. for example, I hide the profileId from some responses.
because the client itself sends the profileId in the route param. so we can reduce the size of the response. maybe we can
hide more fields from the response. it's based on the business logic of the application.

### 8. Add validation for user inputs

one of the important refactors was adding Validation to user inputs. It's done thanks to express-validation packages. every params, query, or body item sent by the user validate by the validators, and if any problem is found, it will return an error array with the status code of `400`.

furthermore, some special validations are performed on the user inputs. like checking the type of profileId sent. it must be a valid mongoose ObjectId. also, It must exist in the collection. otherwise, an error will be returned to the response.

all validators are in the `validators` folder.

### 9. Add pagination for APIs

a big response of documents will cost too many resources both in the server and in the client. so, for the lists, I preferred to use pagination and send two different keys to the client. one for array of results and one for a meta description of the documents as the `meta` key. the meta contains the current page, last page, the total number of docs, and the number of docs on each page. I also validate the `page` and `perPage` keys sent from the user.

### 10. Create logger service for the project

I've created a logger service for the project and used `winston` package as the logging library. logger service is in the `services` folder.

### 11. Add MongoDB connection lost handler

if for any reason the connection pool of MongoDB is lost, I preferred to exit the express application, and the process managers like `pm2` can handle and restart the application. It will automatically try to connect to MongoDB again.

### 12. Add helmet for better security (+advice)

for better security, I added the `helmet` package to the project and use it as a middleware in the express app. It will change and hide some headers in the response.

also, if we want to have better security, there is more to do. for example, we can use a request limiter to stop brute force attacks on our application.

### 13. Handling errors in some cases

in some cases, I used a try/catch block and handle the error by sending the response with status code `500` to the client and logging the error with logger service. I also added express-winston middleware for logging all errors in the express app.

### 14. Improve seeder

I added `faker` package for better and meaningful seeding in the seed script.

### 15. Remove unused packages

finally, I removed some unused packages from the packages.json