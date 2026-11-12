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

- `npm start` - Runs the app in development mode (client-side render, `/pl/` works too)
- `npm run build` - Builds the client, prerenders `/` (EN) and `/pl/` (PL) into static HTML and generates `index.md`, `pl/index.md`, `llms.txt`, `sitemap.xml` and `robots.txt`
- `npm run preview` - Serves the prerendered build locally
- `node generate_cv.cjs` - Regenerates the PDF/HTML CV from `CV_Sebastian_Strzalkowski.md` (needs pandoc and Chrome)

## Project Structure

- `/public` - Static assets
- `/src` - Source code
  - `/components` - React components
  - `/context` - React context providers
  - `/data` - Site content data
  - `/hooks` - Custom React hooks
  - `/locales` - Translation files
  - `/styles` - CSS and Tailwind styles