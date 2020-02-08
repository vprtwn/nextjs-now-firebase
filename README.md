This tutorial walks through setting up a new project using:
- [Next.js](https://nextjs.org/) (React framework)
- [ZEIT Now](https://zeit.co/docs) (Hosting)
- Firebase ([Authentication](https://firebase.google.com/docs/auth/), [Storage](https://firebase.google.com/docs/firestore/), [Functions](https://firebase.google.com/docs/functions/))

I've also included [Tailwind CSS](https://tailwindcss.com/) (with ~zero styling). Here's what the sign up page looks like :)

<img src="https://dev-to-uploads.s3.amazonaws.com/i/yo9xmba1cv05dxfbj09g.png" width=200px> 

You can follow along using this ↗️ [template project](https://github.com/benzguo/nextjs-now-firebase)


---------


## Firebase [ SETUP ]

First, create 2 Firebase projects:
1. `my-project-staging`
2. `my-project-production`

You'll need to click some buttons to fully set up a project:
- add a web app
- enable X
- enable Y


Next, add these two projects using the Firebase CLI, and [alias](https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html) them to "staging" and "production".

```
⟩ firebase use --add
⟩ ? Which project do you want to add? (Use arrow keys)
  my-project-production
> my-project-staging
? What alias do you want to use for this project? (e.g. staging) staging
Created alias staging my-project-staging.
Now using alias staging (my-project-staging)

```


## ZEIT Now [ SETUP ]

... todo ...



## Now & Firebase [ SETUP ]

### secrets – staging

Back in the Firebase console, open your __staging__ project and find your web app configuration variables (under Project Settings).

Enter these variables in the `.env` and `.env.build` files included in the template project.

├── [.env](https://github.com/benzguo/nextjs-now-firebase-template/blob/master/.env)
├── [.env.build](https://github.com/benzguo/nextjs-now-firebase-template/blob/master/.env.build)


> note: these `.env` files are in the template project's [`.gitignore`](https://github.com/benzguo/nextjs-now-firebase-template/blob/master/.gitignore) 🔒


## secrets – production

Back in the Firebase console, open your _production_ project and find your web app configuration variables (under Project Settings). 

For this step, you'll also need your `client email` and `private key` from your `serviceAccount-production.json`.

```
now secrets add firebase-api-key YOUR-API-KEY

now secrets add firebase-auth-domain your-project-id.firebaseapp.com

now secrets add firebase-database-url https://my-project-id.firebaseio.com

now secrets add firebase-project-id your-project-id

now secrets add firebase-storage-bucket your-project-id.appspot.com

now secrets add firebase-messaging-sender-id your-sender-id

now secrets add firebase-app-id your-app-id

now secrets add firebase-measurement-id G-YOUR-MEASUREMENT-ID

now secrets add firebase-client-email your-client-email.iam.gserviceaccount.com

now secrets add -- firebase-private-key "-----BEGIN PRIVATE KEY-----YOUR/PRIVATE/KEY---END PRIVATE KEY-----\n"
```


...


## Functions [ SETUP ]

To set up Firebase functions, you'll need to [download service account keys](https://firebase.google.com/docs/admin/setup?authuser=0#initialize-sdk) for your `production` and `staging` projects.

Rename the two key files (`serviceAccount-{environment}.json`), and move them to the root of your `/functions` directory:
```
/functions
├── serviceAccount-staging.json 
├── serviceAccount-production.json 
```

> keep these secrets safe! these files are in the template project's `.gitignore`, so make sure you're storing them somewhere else 🔒

Next, configure your staging & production projects with an `environment` config variable. Functions [use this config](https://github.com/benzguo/nextjs-now-firebase-template/blob/master/functions/src/index.ts#L6) variable to decide which keys to use at runtime.

```
⟩ firebase use staging
Now using alias staging (my-staging-project)

⟩ firebase functions:config:set app.environment="staging"
✔  Functions config updated.

⟩ firebase use production
Now using alias production (my-production-project)

⟩ firebase functions:config:set app.environment="production"
✔  Functions config updated.
```


## Functions [ DEVELOP ]

To develop functions locally, use `npm run shell`:

```
⟩ npm run shell
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

This project [is configured](https://firebase.google.com/docs/functions/local-emulator#set_up_functions_configuration_optional) to use _staging_ when running functions locally.

## Functions [ DEPLOY ]

Deploy to staging:
`firebase deploy -P staging --only functions`

Deploy to production:
`firebase deploy -P production --only functions`




