# Todo dApp Frontend

This is the frontend for the Todo dApp built with Next.js, TypeScript, and ethers.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with the following content:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
```
Replace `your_contract_address_here` with your deployed smart contract address.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Connect to MetaMask wallet
- Create, toggle, and delete tasks
- Real-time updates when tasks are modified
- Responsive design with Tailwind CSS

## Technologies Used

- Next.js 13
- TypeScript
- ethers.js
- Tailwind CSS
- MetaMask

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
