# Yamify - Cloud Platform for African Developers

Yamify is an AI-powered personal cloud platform designed specifically for African developers. It provides reliable, affordable, and scalable cloud infrastructure with tools and support tailored to the unique needs of developers across Africa.

![Yamify Logo](/public/svgs/yamify_logo_lg.svg)

## 🌟 Overview

Yamify is your personal cloud—AI-powered, preconfigured, and ready to scale with you. Built for reliability and affordability, it gives African developers the tools and support they need to launch, grow, and thrive.

## 🚀 Key Features

### Yam Layers

- **YamRoot**: Your AI-powered virtual datacenter, ready to deploy. Spin up infrastructure in seconds with intelligent defaults and auto-optimization—no ops team required.
  
- **YamLets**: Modular, ready-to-launch solutions for common local needs. Skip the boilerplate. From mobile money auth to local API connectors, Yamlets handle the heavy lifting.
  
- **Germinate**: One-click deploy flow for staging or production. Go live faster with seamless, AI-assisted deployments—zero config, zero drama.
  
- **Farmland**: Your workspace with all the tools and templates you need. A cloud studio that grows with you—CI/CD pipelines, starter kits, AI helpers, and more.
  
- **SeedCycle**: End-to-end release pipeline from idea to production. Turn features into finished products with smart automation for rollouts, updates, and environments.

### Platform Capabilities

- **Cluster Lifecycle Management**: Forget maintenance stress. Upgrades & fixes are on autopilot.
- **Auto Scalability**: Your app scales automatically—up, down, left, right. No babysitting.
- **Multi-Cluster Deployments**: Local to global availability, always online.
- **Security & Compliance**: Role-based access, trusted containers, private networking—secure by default.
- **Observability**: Logs, alerts, dashboards—all built in and always available.
- **Service Mesh & Networking**: Advanced routing and zero-trust architecture baked in.
- **Developer Productivity**: CI/CD and GitOps flows already wired. Ship faster.
- **Cost Optimization**: Pay for what runs. Nothing more. Predictable and smart.
- **OS Support**: Run Windows or Linux in the same cluster, no extra work.

### Bonus Features

- Pay-as-you-go pricing
- Built-in compliance tooling
- Real-time insights into regional cloud performance
- Mobile money & country-based billing
- AI setup enhancer (recommends and automates best deployment config)
- AI support chatbot for real-time infrastructure help
- Feedback loop: you tell us, we build it

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Framer Motion
- **Authentication**: Clerk
- **Database**: Prisma
- **State Management**: Zustand
- **Validation**: Zod
- **Notifications**: React Toastify, Sonner
- **Infrastructure**: Kubernetes

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
