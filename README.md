# Would You Rather Project

Would You Rather is a web app project which present question poll to user. Each question has 2 option, Not only user can create a question but also answer any question in question pool but answer cannot be changed afterward.

* Homepage
    * Poll divided into 2 section, one of them is "answered" other one "unanswered"
* New Poll
    * User can create new poll
* Leader Board
    * Show user ranking on total number of answered and unanswered questions
* Poll Result shows
    * Text of option
    * Shows number of people who voted for option
    * Percentage of people who voted for option

It's built with React, Redux, React Router, & Redux Thunk.

This app is the second of three projects required for [Udacity's React Nanodegree program]

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

## Installation / Prerequisites

* To get started developing right away:

* Fork or clone repository from `https://github.com/bguneser/react_redux_would_you_rather_project.git`
* After cloning this repository, go to directory `cd would_you_rather_project_bguneser`
* install all project dependencies with `npm install`
* After you have installed all dependencies start the development server with `npm start`
* App should be running in `localhost:3000`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
    └── images # includes avatar icons
├── semantic # Sematic UI React modules includes collection,elements,views and themes
└── src
    ├── App.css # Styles for app. 
    ├── index.js # This is the root of app. Contains Provider
    ├── index.css # Styles for app
    ├── actions
        └── authedUser # actions related to authedUser
        └── question # actions related to questions
        └── shared # shared actions
        └── users # actions related to users
    ├── components # React Components
        └── App.js # handles which component to render
        └── Home.js # contains details about user's answered and unanswered questions
        └── Leaderboard.js # shows Users are ordered in descending order based on sum of number of questions asked and number of                         questions answered.
        └── Signin.js # allow user to sign in with one of the registered user
        └── Navbar.js # contains links to different pages and logged in user
        └── NewQuestion.js # area to create new question
        └── Error.js # show 404 error when page does not exists
        └── PollQuestion.js # shows two question options with a submit button
        └── PollResult.js # shows two question options with a submit button
        └── PollTeaser.js # shows poll preview 
        └── UserCard.js # displaying each of the following child components based on the context
    ├── middleware # React Components
        └── index.js # apply thunk and logger middleware
        └── logger.js # output action and state
    ├── reducers # React Components
        └── authedUser.js # reducer for authedUser
        └── index.js # combine reducers
        └── questions.js # reducer for questions
        └── users.js # reducer for to users
    ├── utils # React Components
        └── _DATA.js # includes fake database and methods that let you access the data
        └── api.js # includes api call methods
        └── helpers.js # contains styles
```
        

## Data

There are two types of objects stored in our database:

* Users
* Questions

## UI

    "Sematic UI React" and "material-ui" are settled it provides UI layout and flexibility suits requirements
* yarn add semantic-ui-react can install react components

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Code talks to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Developed by

Güneşer Birgün
