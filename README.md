# AngularFirebaseReady

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Demo

The simple [demo](https://angular-nestjs.firebaseapp.com) is connected with an [API](https://github.com/martin-trajanovski/nestjs-heroku-ready) deployed on [Heroku](https://quiet-dusk-3137.herokuapp.com//). It is developed using Nest.js (Angular inspired) Node.js framework

## Installation

**BEFORE YOU RUN THE APP:** you need to have angular/cli installed:
```bash
npm install -g @angular/cli
```

## Clone the repository:

```bash
git clone https://github.com/martin-trajanovski/angular-firebase-ready.git
```

## Navigate to the folder and install the dependencies:

```bash
npm install
```

### Serving an AngularFirebaseReady (Angular project) via a development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
**IMPORTANT:** before you start the dev server you need to have your [api](https://github.com/martin-trajanovski/nestjs-heroku-ready) up and running in development mode also. Just clone the repo run `yarn install` and `yarn start` and it should do the thing.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
**IMPORTANT:** If you want your app to be [PWA](https://developers.google.com/web/progressive-web-apps/) you need to run `ng build --prod` because service-worker runs only in production environment.

## Deployment

Create your account (or use existing one) on [firebase](https://firebase.google.com/) go to [console](https://console.firebase.google.com) click add new project and give it a name. Use that name to change `.firebaserc` file with your default project name.

Run `firebase login` and give it a try with `firebase deploy` command to deploy the project.

## Further help

Feel free to [contact](mailto:martin.trajanovski@gmail.com) me for any issues or problems.
