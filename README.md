# Meme Trivia

A quiz application that tests your meme knowledge.

## Features

- **Anonymous Play:** You can play without logging in.
- **Registered Users:** Log in to access additional features.
  - Username: johndoe
    - Password: testpassword
  - Username: asd
    - Password: asd

## Technology Stack

- **Backend:** Express.js
- **Frontend:** React (bundled with Vite)
- **Database:** SQLite

## Gameplay

- **Logged-in Users:**
  - Each game consists of three questions.
  - Game results are recorded and accessible through the user's profile.
  
- **Anonymous Users:**
  - Each game consists of one question.
  - Game results are not recorded.

## Installation and Setup

To run Meme Trivia locally, follow these steps:

**Clone the repository** and navigate to the directory:
- `git clone https://github.com/TheZeta/meme-trivia.git`
- `cd meme-trivia`

**Install dependencies:**
- Navigate to the server directory and run `npm install`
- Navigate to the client directory and run `npm install`

## Running the Application

**Start the server:**
- Navigate to the server directory and run `node index.mjs`

**Start the client:**
- Navigate to the client directory and run `npm run dev`
