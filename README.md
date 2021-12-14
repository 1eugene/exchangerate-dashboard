# Exchangerate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.


Originally it suposed to be a simple app which connects to the following Foreign Exchange API https://api.exchangerate-api.com/v4/latest/GBP. The app have to format the data in a grid control using other supporting controls with material design (Paging, column sorting & sizing, some sort of simple search/filter…etc.). Couple of unit tests are added to demonstrate automated testing of WebComponents and Services which using controls with material design.

Component planned to upload only GBP latest data, but it designed to show any currency - just change last url part with required currency name like USD, AUD etc.
Addittionally, along with paging, the filtering can be used to find required data.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
