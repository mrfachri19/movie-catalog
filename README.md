# Movie & TV Show Catalog Web App

**Frontend Developer Test (Middle Level) - Core Task Project**

A responsive and user-friendly web application that showcases movies, TV shows, and popular people data fetched from **TMDB API**. The application demonstrates strong frontend development skills including component reusability, clean code practices, and responsive design.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Source](#api-source)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Demo

[*(Link to deployed app: Vercel / Netlify / Heroku)*](https://movie-catalog-eight-omega.vercel.app/)

---

## Features

- Display **popular movies**, **top rated movies**, **popular TV shows**, and **popular people**  
- Pagination / Infinite scroll for movie, TV show, and people lists  
- Loading state while fetching data  
- Clean and engaging UI inspired by Netflix / Coursera  
- Search functionality for movies, TV shows, and people  
- Add to watchlist / rating functionality *(optional)*  
- Fully responsive design  
- Accessible with keyboard navigation and `aria-*` attributes  

---

## Technology Stack

- **Framework:** React (or Vue)  
- **Styling:** Tailwind CSS  
- **Language:** TypeScript (preferred)  
- **Version Control:** Git (GitHub/GitLab)  
- **Deployment:** Vercel / Netlify / Heroku  
- **API Source:** [TMDB API](https://www.themoviedb.org/documentation/api)  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-tv-catalog.git
cd movie-tv-catalog

npm install
# or
yarn install

REACT_APP_TMDB_API_KEY=your_api_key_here

# Development server

npm start
# or
yarn start

# Build

npm run build
# or
yarn build
