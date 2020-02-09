## [DEV.TO: ▲🔥 Getting started with Next.js + Now + Firebase](https://dev.to/benzguo/getting-started-with-next-js-now-firebase-4ejg)

> This is a tutorial focused on setting up a minimal template project for Next.js, ZEIT Now, and Firebase. 
> - The template project is an extension of the official Next.js [with-firebase-authentication-serverless](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-authentication-serverless) example, with a bit more functionality. 
> - This tutorial provides some extra guidance on setting up environments & keys.
> - I've included lots of screenshots, so even if you aren't starting a new project, you'll get a feel for what working with these tools is like. I think this is a good snapshot of **the state of the art in 2020** for quick-start developer products.

Recently, I started a new side project using:
- [Next.js](https://nextjs.org/) (React framework)
- [ZEIT Now](https://zeit.co/docs) (Hosting)
- Firebase: [Authentication](https://firebase.google.com/docs/auth/), [Storage](https://firebase.google.com/docs/firestore/), & [Functions](https://firebase.google.com/docs/functions/)

I like this combination of tools a lot, so I decided to put together a detailed tutorial. 

You can follow along using this template project:

{% github benzguo/nextjs-now-firebase no-readme %}

The template also includes [Tailwind CSS](https://tailwindcss.com/) (with ~zero styling). Here's what the sign up page looks like:

<img src="https://dev-to-uploads.s3.amazonaws.com/i/6rtjok6xjab61vlzz8or.png" width="400px">

This template app includes:
- Sign up, log in, log out
- Update display name
- Add object to a Firestore collection
- List objects in a Firestore collection (using [firestore-pagination-hook](https://github.com/bmcmahen/firestore-pagination-hook))
- Fetch data with a simple Firebase function (server-side rendering using [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps))


# ▲ Sign up for ZEIT

[[ ⤴️ Sign up for ZEIT ]](https://zeit.co/signup?with-email=1) 

I used the email signup flow, and thought it was pretty nice ✨ You can check out screenshots of the ZEIT onboarding flow [[ ⤵️ here ]](https://dev.to/benzguo/zeit-now-signup-flow-49le).

![ZEIT – empty dashboard](https://dev-to-uploads.s3.amazonaws.com/i/55wy84o7oy0vzmajs1cl.png)


# 🔥 Set up Firebase

[[ ⤴️ Sign up for Firebase ]](https://console.firebase.google.com/) 

Sign into your Firebase account, and create **two** projects (one for your **staging** environment, and another for your **production** environment).

tl;dr: You'll need to do some clicking around to fully configure a new Firebase project. Check out the full Firebase project onboarding walkthrough [[ ⤵️ here ]](https://dev.to/benzguo/firebase-setup-3320).

![Firebase – 2 projects](https://dev-to-uploads.s3.amazonaws.com/i/3fb0iadewxeiz6qe0qxy.png)


# ▲ Set up Now CLI

[Install the Now CLI](https://zeit.co/download) and run `now login`

![now login](https://dev-to-uploads.s3.amazonaws.com/i/pex7mfz3d29xsy5hdqw1.png)

# 🔥 Set up Firebase CLI

[Install the Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm) and run `firebase login`

![firebase login](https://dev-to-uploads.s3.amazonaws.com/i/d62gved7hiqdnizsc79j.png)

If you haven't done this already: 
- generate a new project from the GitHub template repo
- clone it to your machine
- and navigate to the directory in your terminal. 

{% github benzguo/nextjs-now-firebase no-readme %}

Run `firebase use --add` to add the two projects you created to the Firebase CLI. Use "staging" and "production" as your project [aliases](https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html).

![firebase use --add](https://dev-to-uploads.s3.amazonaws.com/i/x02qksb1bfohnm1r6hy3.png)


# ▲🔥 Now + Firebase
## Staging environment

First, we'll configure our project's staging environment with keys from Firebase.

In the Firebase console, open your **staging** project, navigate to the "Service accounts" tab, and click "Generate new private key" to download your admin SDK keys.

![Firebase – admin keys](https://dev-to-uploads.s3.amazonaws.com/i/4tb3z9h1fj0bcz6ttpco.png)

Save the key file in the `functions` directory as `serviceAccount-staging.json`

> 📁 functions
> ├── serviceAccount-staging.json 

<img src="https://dev-to-uploads.s3.amazonaws.com/i/brwrosh6u4gvtrudjif2.png" width="400px">

> ⚠️ Your private key (in your service account key file) gives access to your project's Firebase services. Keep it confidential and **never store it in a public repository**.
>
> Note that `serviceAccount*` files are in the project's `.gitignore`, so they won't be checked into your repository.  Make sure you [follow best practices for keeping these keys safe](https://cloud.google.com/blog/products/gcp/help-keep-your-google-cloud-service-account-keys-safe)! 🔒

Next, find your **app keys** (under Project settings).

![Firebase – app keys](https://dev-to-uploads.s3.amazonaws.com/i/di3le07v1bcs7to3cx74.png)

Enter these variables in the `.env` and `.env.build` files included in the template project.

Create two `env` files:
`$ touch .env`
`$ touch .env.build`

- `.env`: runtime environment variables
- `.env.build`: build step environment variables


Open your your editor, and the content below to the 2 `.env` files, filling in your Firebase keys.

#### .env

```html
# .env
# == Firebase app keys (staging) ==
FIREBASE_API_KEY=■■■■■■■■-■■■■■■■■
FIREBASE_AUTH_DOMAIN=■■■■■■■■.firebaseapp.com
FIREBASE_DATABASE_URL=https://■■■■■■■■.firebaseio.com
FIREBASE_PROJECT_ID=■■■■■■■■
FIREBASE_STORAGE_BUCKET=■■■■■■■■.appspot.com
FIREBASE_MESSAGING_SENDER_ID=■■■■■■■■
FIREBASE_APP_ID=1:■■■■■■■■:web:■■■■■■■■
FIREBASE_MEASUREMENT_ID=G-■■■■■■■■
```

#### .env.build

```html
# .env.build
# == Firebase app keys (staging) ==
FIREBASE_API_KEY=■■■■■■■■-■■■■■■■■
FIREBASE_AUTH_DOMAIN=■■■■■■■■.firebaseapp.com
FIREBASE_DATABASE_URL=https://■■■■■■■■.firebaseio.com
FIREBASE_PROJECT_ID=■■■■■■■■
FIREBASE_STORAGE_BUCKET=■■■■■■■■.appspot.com
FIREBASE_MESSAGING_SENDER_ID=■■■■■■■■
FIREBASE_APP_ID=1:■■■■■■■■:web:■■■■■■■■
FIREBASE_MEASUREMENT_ID=G-■■■■■■■■
# == Firebase admin keys (from serviceAccount-staging.json) ==
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-■■■■@■■■■■■■■.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n■■■■■■■■\n-----END PRIVATE KEY-----\n
```

> ⚠️ These keys give access to your project's Firebase services. Keep them confidential and **never store them in a public repository**.
>
> Note that `.env*` files are in the project's `.gitignore`, so they won't be checked into your repository. Make sure you [follow best practices for keeping these keys safe](https://cloud.google.com/blog/products/gcp/help-keep-your-google-cloud-service-account-keys-safe)! 🔒

Now, you're ready to try running the app locally.

`$ npm install`
`$ npm run dev`

When you open [http://localhost:3000](http://localhost:3000) in your browser, you should see this page:

<img src="https://dev-to-uploads.s3.amazonaws.com/i/6rtjok6xjab61vlzz8or.png" width="400px">

Try creating an account ✅

## Production environment

Now, we'll configure the project's production environment with keys from Firebase.

Open your **production** project in the Firebase console, and follow the same steps as above:

1. Download your **admin keys** to `/functions/serviceAccount-production.json`
2. Find your **app keys** in the Firebase console's Project settings page.

Run the following commands to add your production Firebase keys to Now:

```
$ now secrets add firebase-api-key ■■■■■■■■-■■■■■■■■

$ now secrets add firebase-auth-domain ■■■■■■■■.firebaseapp.com

$ now secrets add firebase-database-url https://■■■■■■■■.firebaseio.com

$ now secrets add firebase-project-id ■■■■■■■■

$ now secrets add firebase-storage-bucket ■■■■■■■■.appspot.com

$ now secrets add firebase-messaging-sender-id ■■■■■■■■

$ now secrets add firebase-app-id 1:■■■■■■■■:web:■■■■■■■■

$ now secrets add firebase-measurement-id G-■■■■■■■■

$ now secrets add firebase-client-email firebase-adminsdk-■■■■@■■■■■■■■.iam.gserviceaccount.com

$ now secrets add -- firebase-private-key "-----BEGIN PRIVATE KEY-----\n■■■■■■■■\n-----END PRIVATE KEY-----\n"
```

# 🔥 Firestore – creating a custom index

Here, we'll walk through creating an index in Firestore. You'll need to do this pretty frequently as you iterate on your app's data model.

Navigate to [http://localhost:3000/spaces](http://localhost:3000/spaces), and open your browser's console. 

You should see an error in the console, with a link to create an index.

![Firestore - create index error](https://dev-to-uploads.s3.amazonaws.com/i/inxdrlvvaa952gp401py.png)

Following the link takes you to the Firestore dashboard, with a modal to create a new index:

<img src="https://dev-to-uploads.s3.amazonaws.com/i/8nk879f55kqrvbxf44w8.png" width="300px">

This workflow is great for prototyping. As you solidify your data model, you can switch to deploying indexes [from the CLI](https://firebase.google.com/docs/firestore/query-data/indexing#use_the_firebase_cli). 

# 🔥 Firebase functions – setup

Here, we'll configure Firebase functions to support deploying to staging & production, and then deploy functions.

Now, navigate to [http://localhost:3000/account](http://localhost:3000/account)

You should see an error. This page makes a request to a Firebase function, and we haven't deployed functions yet.

To set up functions, we'll configure our staging & production projects with an `environment` config variable. Functions [use this config variable](https://github.com/benzguo/nextjs-now-firebase/blob/master/functions/src/index.ts#L6) to decide which keys to use at runtime.

```
$ firebase use staging
Now using alias staging (my-project-staging)

$ firebase functions:config:set app.environment="staging"
✔  Functions config updated.

$ firebase use production
Now using alias production (my-project-production)

$ firebase functions:config:set app.environment="production"
✔  Functions config updated.
```

Now, we can deploy functions to staging and production. 

First, install dependencies:
`$ cd functions && npm install && cd ..`

Deploy to staging:
`$ firebase deploy -P staging --only functions`

Deploy to production:
`$ firebase deploy -P production --only functions`

{% asciinema 299401 %}

Navigate to [http://localhost:3000/account](http://localhost:3000/account). You should be able to load the page without errors ✅

# ▲ Deploy app to production

Finally, we'll run `now` to set up a ZEIT Now project and deploy to production.

`$ now`

{% asciinema 299403 %}

![final](https://dev-to-uploads.s3.amazonaws.com/i/uvh8duoe2cso3qq5cwfs.png)

In the future, you can deploy your app to production using `now --prod`. To run the app locally, use `now dev`.


# 📌 Reference

##### Run app locally (using staging environment)
`$ now dev` 

##### Deploy functions to staging
`$ firebase deploy -P staging --only functions` 

##### Deploy functions to production
`$ firebase deploy -P production --only functions` 

##### Run functions locally
`$ cd functions && npm run shell` 

##### Deploy to production
`$ now --prod` 


### Running functions locally

To run Firebase functions locally, navigate to the functions directory and run `npm run shell`

```
$ cd functions && npm run shell
...
✔  functions: Emulator started at http://localhost:5000
i  functions: Loaded functions: getEnvironment
firebase > getEnvironment({})
Sent request to function.
firebase > 
RESPONSE RECEIVED FROM FUNCTION: 200, {
  "result": {
    "environment": "staging"
  }
}
```

This project [is configured](https://firebase.google.com/docs/functions/local-emulator#set_up_functions_configuration_optional) to use the **staging** environment when running functions locally.

Running functions locally can be convenient for development, but handling authenticated functions can be tricky. Firebase has some [local emulators](https://firebase.google.com/docs/emulator-suite), but it's unclear what the story is for emulating authentication.

Often, I'll just deploy functions directly to staging, and open http://localhost:3000 to verify changes. 






