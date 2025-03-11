# Personal Portfolio Website

A modern, responsive portfolio website built with React, featuring a bilingual interface (English and Polish) and highlighting my skills, projects, and professional experience.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Bilingual Support**: Switch between English and Polish language
- **Interactive Sections**: About, Experience, Projects, and Contact
- **Modern UI**: Built with React and Tailwind CSS
- **Smooth Scrolling**: Enhanced user experience with smooth section transitions

## Technologies Used

- React
- Tailwind CSS
- i18next (for internationalization)
- React Scroll

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

This project is configured to be deployed to Amazon S3 using GitHub Actions.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects the CRA configuration (one-way operation)

## Project Structure

- `/public` - Static assets
- `/src` - Source code
  - `/components` - React components
  - `/context` - React context providers
  - `/data` - Site content data
  - `/hooks` - Custom React hooks
  - `/locales` - Translation files
  - `/styles` - CSS and Tailwind styles