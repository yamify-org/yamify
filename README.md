# Yamify - Cloud Platform for African Developers

Yamify is an AI-powered personal cloud platform designed specifically for African developers. It provides reliable, affordable, and scalable cloud infrastructure with tools and support tailored to the unique needs of developers across Africa.

![Yamify Logo](/public/svgs/yamify_logo_lg.svg)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yamify.git
   cd yamify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
yamify/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
│   ├── images/          # Image assets
│   └── svgs/            # SVG assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   └── auth/        # Authentication pages
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── libs/            # Utility libraries
│   ├── server/          # Server-side code
│   │   ├── module/      # Server modules
│   │   ├── repository/  # Data repositories
│   │   └── service/     # Business logic services
│   ├── stores/          # Zustand stores
│   └── styles/          # CSS and SCSS styles
├── .env.local           # Environment variables (create this)
├── next.config.ts       # Next.js configuration
└── package.json         # Project dependencies
```

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute to Yamify, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

For questions or feedback, please reach out to us at [contact@yamify.com](mailto:contact@yamify.com).

---

Designed for Africa, Built for Developers. We get you. You're not alone.
