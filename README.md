# Panchshil Realty — Frontend

The frontend application for the official **Panchshil Realty** corporate website, showcasing its real-estate portfolio, services, developments, and corporate initiatives.

- **Live Website:** https://panchshil-corp.netlify.app/
- **Repository:** https://github.com/rohitdevc/panchshil-frontend

## Overview

Panchshil Realty is a real-estate developer with a portfolio spanning luxury residences, office parks, hospitality, retail and food and beverage, and data centres. This frontend provides a digital experience for exploring the company's developments, services, milestones, news, events, and corporate information.

The application uses Next.js App Router and integrates with CMS APIs to retrieve website content, property information, featured developments, banners, navigation, metadata, and footer sections.

## Features

- **Corporate Homepage** — Hero banners, company introduction, milestones, and featured content.
- **Property Portfolio** — Browse developments by category and explore property details.
- **Featured Developments** — Highlighted residential and hospitality projects.
- **Services** — Information about asset management, project management, facility management, architecture and interior design, fit-out management, and residential leasing and resale.
- **About Panchshil** — Company history, vision, mission, values, milestones, clients, partners, and ESG initiatives.
- **Media and News** — Media coverage, featured articles, blogs, and events.
- **Careers** — Career information, work culture, growth opportunities, and company life.
- **Contact and Enquiries** — Contact forms and newsletter subscription.
- **Search** — Search-index generation and Fuse.js-based search support.
- **Interactive UI** — Carousel interactions, animations, and responsive navigation.
- **Google Maps Integration** — Google Maps JavaScript API loader.
- **SEO Support** — Dynamic page metadata, canonical URLs, Open Graph and Twitter metadata, and route redirects.
- **Responsive Design** — Tailwind CSS-based styling for different screen sizes.
- **CMS Integration** — API-driven content for properties, services, milestones, media, and corporate pages.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and App Router |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling |
| Zustand | Client-side state management |
| Embla Carousel | Carousel and autoplay functionality |
| Fuse.js | Search functionality |
| Google Maps JS API Loader | Google Maps integration |
| `html-react-parser` | HTML content parsing |
| Lodash | Utility functions |
| Day.js | Date utilities |
| React Icons | Interface icons |
| ESLint | Code quality |
| Prettier | Code formatting |
| Husky and lint-staged | Git hooks and staged-file checks |
| Docker | Containerized deployment |
| Netlify | Hosting |

## Getting Started

### Prerequisites

- Node.js 20 or a compatible version
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rohitdevc/panchshil-frontend.git
cd panchshil-frontend
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and configure the values required for your environment.

```dotenv
NEXT_PUBLIC_BASE_API_ENDPOINT=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
X_SECRET_KEY=
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_API_ENDPOINT` | Base endpoint for CMS and application API requests |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps integration |
| `X_SECRET_KEY` | Secret key used by the API authentication-token request |

The API service modules use `X_SECRET_KEY` when requesting an authentication token. The Docker configuration also passes the API endpoint and Google Maps key as build arguments.

Confirm the expected API URL and any additional runtime configuration in the API constants and service modules before running the application.

**Security:** `NEXT_PUBLIC_` variables can be included in client-side bundles. Never put private credentials in a `NEXT_PUBLIC_` variable. Review how `X_SECRET_KEY` is exposed and used in the application, and avoid committing secret values to Git.

### 4. Start the development server

```bash
npm run dev
```

Open the application at:

http://localhost:2982

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server on port `2982` |
| `npm run build` | Generates the production build; the prebuild script generates the search index first |
| `npm run start` | Starts the production server on port `2982` |
| `npm run lint` | Runs ESLint |
| `npm run lint:fix` | Runs ESLint and fixes supported issues |
| `npm run format` | Formats files with Prettier |
| `npm run format:check` | Checks formatting |
| `npm run type-check` | Runs TypeScript type checking |

## Project Structure

```text
panchshil-frontend/
├── .github/
│   └── workflows/       # GitHub Actions deployment workflow
├── api/                 # API clients, CMS services, and API constants
├── app/                 # Next.js routes, layouts, and page components
├── assets/              # Application assets
├── components/          # Reusable UI components
├── contexts/            # React contexts
├── generated/           # Generated application resources
├── hooks/               # Custom React hooks
├── interfaces/          # TypeScript interfaces
├── lib/                 # Shared utilities and application logic
├── public/              # Static assets
├── scripts/             # Build-time scripts, including search-index generation
├── store/               # Zustand stores
├── types/               # Shared type definitions
├── utils/               # Utility functions
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker Compose configuration
├── next.config.ts        # Next.js configuration and redirects
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked npm dependency versions
├── eslint.config.mjs     # ESLint configuration
├── .prettierrc           # Prettier configuration
└── tsconfig.json         # TypeScript configuration
```

## Production Build

To build and run the application locally:

```bash
npm run build
npm run start
```

The production server listens on port `2982` by default.

## Docker Deployment

The repository includes a multi-stage Dockerfile using Node.js 20 Alpine and Next.js standalone output.

### Build and start

After setting the required values in `.env`, run:

```bash
docker compose up -d --build
```

### View logs

```bash
docker compose logs -f frontend
```

### Stop the application

```bash
docker compose down
```

The Docker Compose service and container are both named `panchshil-frontend`. Port `2982` is mapped from the host to the container.

The API endpoint and Google Maps key are passed as build arguments, so update the values and rebuild the image when build-time configuration changes.

## Netlify Deployment

The live website is hosted on Netlify. To configure a deployment:

1. Connect the GitHub repository to Netlify.
2. Configure the required environment variables in Netlify site settings.
3. Use a compatible Node.js version.
4. Ensure the build command runs `npm run build`, including the prebuild search-index generation.
5. Verify the API endpoint, Google Maps functionality, and any required public asset configuration.
6. Deploy and test the major routes, property detail pages, search, contact forms, and newsletter subscription.

The Next.js configuration includes custom redirects and remote image host allowlists. Confirm that these settings match the intended production domain and image sources.

## Code Quality

Before submitting changes, run:

```bash
npm run lint
npm run format:check
npm run type-check
npm run build
```

The repository also includes Husky and lint-staged for Git hooks and checks on staged files.

## Deployment Workflow

The repository includes a GitHub Actions workflow triggered by pushes to `main`. It runs on a self-hosted runner and pulls the latest source into the configured production checkout.

For secure deployment:

- Protect the `main` branch and review production changes.
- Restrict access to the self-hosted runner.
- Use a dedicated, read-only deployment SSH key where appropriate.
- Keep private keys and sensitive environment values outside the repository.
- Confirm that the server's build and restart procedure is managed separately if required.

## License

No explicit open-source license is documented in this README. Contact the repository owner for permission before redistributing or reusing the source code.

---

**Project:** Panchshil Realty Corporate Website  
**Framework:** Next.js · React · TypeScript · Tailwind CSS  
**Hosting:** Netlify  
**Repository:** https://github.com/rohitdevc/panchshil-frontend