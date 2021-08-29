# Skolera Front-End App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 
### Versions
Angular CLI: `7.1.4` <br>
Node: `10.15.3` <br>
Angular: `7.1.4`

## Getting Started

### Clone the repo
`git clone https://github.com/bedopedia/skolera-angular`
### Install npm
`cd skolera-angular` then
`npm install`
### Run The Application
Run `ng serve` or `npm start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Statging

Run `ng serve -c=staging` to serve the app in staging environment.

## Production

Run `ng serve --prod` to serve the app in production environment.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment
first install heroku cli <br /> <br />
[heroku download page](https://devcenter.heroku.com/articles/heroku-cli)
<br /> <br /> create an account if you haven't and login by running</p>
<code>heroku login </code> then ask to be added as a
<strong>collaborator</strong>
<h4>To deploy you can Deploy manually from Heroku Site <strong>IF YOU HAVE ACCESS</strong></h4> 

[Heroku Deploy Page](https://dashboard.heroku.com/apps/skolera/deploy/github).

press the deploy button in the manual deploy section

<h4><strong>OR</strong> from your command line.</h4> <br /> <br/> <strong>Run these steps to
get your code deployed after it's merged to MASTER branch</strong> <br />
<pre><code>git checkout master</code></pre>
<pre><code>git pull origin master</code></pre>
<pre><code>git pull heroku master</code></pre> 
<pre><code>git push heroku master</code></pre>
<strong> for further help check this tutorial </strong> <br/>

[Deploy Angular app on Heroku](https://medium.com/@shubhsharma10/how-to-deploy-angular-6-app-to-heroku-52b73ac7a3aa).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
