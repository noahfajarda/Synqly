# Synqly

## Official Deployed Application: [synqly.vercel.app](https://synqly.vercel.app/)

<div>
<img
src="/public/screenshots/screenshot-1.png"
alt="image1"
/></div>

### Summary

Synqly is a vibrant platform fostering seamless connections among users. This app revolutionizes social networking by enabling effortless syncing between individuals. Seamlessly connecting users, Synqly facilitates an intuitive interface for sharing, communicating, and engaging.

With streamlined synchronization capabilities, users connect easily, building communities around shared interests. Whether it's networking, sharing moments, or sparking conversations, Synqly offers a dynamic space for users to interact.

Utilizing cutting-edge technology, this app ensures secure connections while offering a diverse range of features.

### Technologies Used:

- Next.js
- Shadcn/ui
- [Clerk auth](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages)
- [Clerk dashboard](https://dashboard.clerk.com/apps/app_2YTlBjVWiKloj6ktYZWmnQcPvoW/instances/ins_2YTlBlgPcjg9o168tIE6PjlI4sk)
- [Upload Thing (for file upload)](https://docs.uploadthing.com/getting-started/appdir)
- [Upload Thing dashboard](https://uploadthing.com/dashboard/4uwisvotrk/api-keys)
- Radix-ui
- Zod: Form schema validation
- [MongoDB](https://account.mongodb.com/account/profile/overview)
- [Cloudinary](https://console.cloudinary.com/console/c-a93be4c19875cf5fd32251bfff624e/media_library/folders/c5ffce1e3f093dc3c8b625c03f86299144)
- Redux State
- Express.js
- Node.js
- React.js

### Interacting with the application

First, start by cloning the application to your local drive:

```shell
git clone git@github.com:noahfajarda/Synqly.git
```

Then, register for a [Clerk API](https://clerk.com/) account in order to manage authentication. Retrieve the `PUBLISHABLE_KEY`, `SECRET_KEY`, and `WEBHOOK_SECRET` from the dashboard you are redirected to after account creation and store these values inside the `.env.local` file found inside the repository.

Rename `.env.local` to `.env`. Once these steps are complete your `.env` file will look similar to this:

```shell
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_CLERK_WEBHOOK_SECRET=YOUR_NEXT_CLERK_WEBHOOK_SECRET

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGODB_URL=YOUR_MONGO_URL

UPLOADTHING_SECRET=YOUR_UPLOADTHING_SECRET
UPLOADTHING_APP_ID=YOUR_UPLOADTHING_APP_ID
```

Once your environment variables have been set, you can run the application with the following command:

```shell
npm run start
```
