# Installing and Deploying NextMerce

## Install and Deploy NextMerce

In this part of the documentation we will show you how to install NextMerce.

<Callout type="info">
  Before moving forward, make sure you have Node.js installed on your machine.
  Otherwise the installation commands will not work.
</Callout>

**1.** Download template and extract it. Then CD into that directory and run this command to install the dependencies:

```bash
npm install --legacy-peer-deps
# or
yarn install
```
    
> Some included packages causes peer-deps issue with React 19 while installing.
> With npm the `--legacy-peer-deps` flag is a workaround for that at the moment.

**2.** After completing the installation run this command to start the developement server:

```bash copy
npm run dev
```

or

```bash copy
yarn dev
```

### Next Steps

Once the installation is done,  
Follow these steps to complete the installation.

1. [Database Integration - PostgreSQL on Vercel ](https://nextmerce.com//docs/database/postgresql)

<Callout type="info">
  **Note:** you can use any PostgreSQL you want. Just save the database url in
  the env using this name:
</Callout>

```
DATABASE_URL=YOUR_DB_CONNECT_URL
```

2. [Authentication](https://nextmerce.com//docs/authentication)
3. [Sanity Integration](https://nextmerce.com//docs/sanity)

Follow the Sanity Integration guide to setup the project. After that take the Sanity ProjectID and title, and save them in the .env file under these variable names:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_PROJECT_TITLE=""
```

4.[Sanity API integration](https://nextmerce.com//docs/sanity/api-integration)

5.[Sanity Webhook integration](https://nextmerce.com//docs/sanity/webhook-integration)

6.[Stripe Integration](https://nextmerce.com//docs/stripe)

7.[Algolia Integration](https://nextmerce.com//docs/algolia)

---

## Deploying to server

After the installation and customization are done you have to deploy the template.
Here are the steps you need to follow to deploy the template:

Build the template locally and then deploy it to the server.
Build the template using the following command, When you run this command you’ll get a build folder. Now you can upload this folder to your server and your site will be live.

```bash copy
npm run build
```

or

```bash copy
yarn build
```

## Update Logs

Version 1.2.1 - Features - [Feb 13, 2025]

- Upgraded to Next15
- Upgraded to Tailwind v4
- Form validation using React Hook Form
- Fully functional checkout page(with input validation and state changes)
- Refactored products filtering; querying from Sanity.
- Managing user addresses(Shipping and Billing) on database.
- Improve re-usability, code refactoring etc.

Version 1.0.1 - Patches - [Feb 02, 2025]

- Fix countdown timer
- Showing indicator if product has been added to wishlist
- Redesign *Empty Cart* page
