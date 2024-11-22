# Vent - Social Media dApp

A decentralized social media application built with Next.js, Wagmi, and RainbowKit.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn or pnpm
- Git

## Environment Variables

Create a `.env` file in the root directory with the following variables:

NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS_PROFILE=your_profile_contract_address
NEXT_PUBLIC_CONTRACT_ADDRESS_POST=your_post_contract_address

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Menh1505/vent_it-client.git
cd vent_it-client
```

2. Install dependencies:
```bash
npm install
or
yarn install
or
pnpm install
or
bun install
```


3. Run the development server:
```bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- 🌙 Dark/Light mode support
- 👤 Web3 Authentication with RainbowKit
- 📝 Create and view posts
- 💬 Comment system
- 👥 User profiles
- 🔍 Search users by wallet address

You can watch this demo video for more information: [Demo](https://www.youtube.com/watch?v=pFuk3JyZDSo)
## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Web3:**
  - Wagmi
  - RainbowKit
  - Viem
- **State Management:** React Context
- **UI Components:**
  - HeadlessUI
  - Heroicons
- **Development Tools:**
  - TypeScript
  - ESLint
  - PostCSS

## Project Structure
vent_it-client/
├── app/
│ ├── components/ # Reusable UI components
│ ├── providers/ # Context providers
│ ├── features/ # Feature-specific logic
│ ├── types/ # TypeScript type definitions
│ └── styles/ # Global styles
├── public/ # Static assets
└── utils/ # Utility functions


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
