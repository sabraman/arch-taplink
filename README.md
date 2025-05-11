# Arch Taplink

This project is a link-in-bio page for **ARCH**.

## Technology Stack

This project is built with the following technologies:

- **Framework**: [Next.js](https://nextjs.org/) 15 (using App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (configured mobile-first)
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/): For baseline UI components.
  - [Framer Motion](https://www.framer.com/motion/): For animations.
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

### Installation

1. Clone the repo (if you haven't already):
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   ```
2. Navigate to the project directory:
   ```sh
   cd arch-taplink
   ```
3. Install PNPM packages:
   ```sh
   pnpm install
   ```

### Development

To start the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Building for Production

To build the application for production:

```sh
pnpm build
```

## Deployment

This application is ready to be deployed on platforms like [Vercel](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app) (the creators of Next.js) or any other platform that supports Next.js applications.

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about shadcn/ui components.
- [Framer Motion Documentation](https://motion.dev/docs/react-quick-start/) - learn about Framer Motion.
- [pnpm Documentation](https://pnpm.io/motivation) - learn about pnpm.
