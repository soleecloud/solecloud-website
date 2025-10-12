# Sole Cloud Website

A modern, tech-focused website for Sole Cloud built with Next.js and Tailwind CSS.

## Features

- Modern, responsive design with dark theme
- Interactive components using React
- Fast loading with Next.js App Router
- Fully responsive for all device sizes
- Sleek animations and transitions

## Pages

- Home: Features a hero section with company slogan and services overview
- About: Information about the company, mission, and values
- Services: Detailed descriptions of offered services
- Contact: Contact form and company information

## Tech Stack

- **Next.js**: React framework for building the application
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript for better development experience
- **React Icons**: Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/solecloud-website.git
cd solecloud-website
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build for Production

```bash
npm run build
# or
yarn build
```

## Running in Production

```bash
npm run start
# or
yarn start
```

## Project Structure

```
solecloud-website/
├── app/                 # App Router structure
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── services/        # Services page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/          # Reusable components
│   ├── Navbar.tsx       # Navigation component
│   └── ServiceCard.tsx  # Service display component
├── public/              # Static assets
│   └── solecloud-logo.png # Company logo
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```
