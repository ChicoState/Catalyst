# Catalyst

Catalyst is a goal-oriented task management application designed to help users identify and achieve their objectives efficiently. Users fill out a questionnaire about their goals, and Catalyst generates a customized list of tasks with estimated time commitments. Users can then choose which tasks to commit to, tailoring their path towards achieving their goals.

## Features

- **Goal Specification**: Users can input specific goals they want to achieve.
- **Task Generation**: Based on the input goals, the app provides a list of possible tasks along with the estimated time needed for each.
- **Custom Task Selection**: Users have the freedom to select which tasks they wish to undertake from the generated list.
- **Task Tracking**: Track progress on selected tasks and adjust goals as needed.

## Getting Started

### Prerequisites

You will need to have Node.js and npm installed on your machine. To check if you have Node.js installed, run the following command in your terminal:
```
node -v
```
To confirm that npm is installed, you can run:
```
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChicoState/Catalyst
   cd Catalyst
   ```

2. **Set up environment variables:**
   Navigate to the `catalyst` directory and create a `.env` file with the following required keys:
   ```plaintext
   REACT_APP_API_KEY='Your_API_Key_Here'
   DB_URI="Your_MongoDB_URI_Here"
   JWT_SECRET="Your_JWT_Secret_Here"
   ```
   Replace `Your_API_Key_Here`, `Your_MongoDB_URI_Here`, and `Your_JWT_Secret_Here` with your actual API keys and URI.


3. **Install dependencies:**
   Install all dependencies listed in `package.json` by running:
   ```bash
   npm install
   ```

4. **Start the application:**
   Utilizing the concurrent script set up in your `package.json`, you can start both the React application and your backend server simultaneously:
   ```bash
   npm start
   ```
   This script executes both `react-scripts start` and `node src/server.js` in parallel, making development easier.

### Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Task Generation**: Powered by Gemini API

## Development

- **Running Tests**: Execute the test suite with:
  ```bash
  npm test
  ```
- **Building the App**: Build the app for production with:
  ```bash
  npm run build
  ```


