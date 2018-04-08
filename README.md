# Selenium Webdriver Runner

[![Build Status](https://travis-ci.org/ryancat/selenium-webdriver-runner.svg?branch=master)](https://travis-ci.org/ryancat/selenium-webdriver-runner) [![Build Status](https://saucelabs.com/buildstatus/selenium-webdriver-runner)](https://saucelabs.com/beta/builds/selenium-webdriver-runner)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/selenium-webdriver-runner.svg)](https://saucelabs.com/u/selenium-webdriver-runner)

## What is this
This is a demo on how to setup selenium tests with the official [selenium-webdriver](https://github.com/SeleniumHQ/selenium) library from scratch. The package also provide an nodejs executable runner for those who just want to try it out. This example includes the following:

- A Todo app as the application to test for (more demo may be added in the future)
- A config file to define your tests properties
- A test runner which runs your test against the config file
- Running test in parallel, locally and remotely (with saucelabs)
- page object setup for the examples
- A set of mixins that extends the test runner and webdriver features, allow you to run visual regression tests by screenshots, using mocha to write tests, pipe driver instructions, connect with saucelabs, generate coverage report, etc.


## Why I am creating this
There are many examples about how to write a few lines of code to get selenium webdriverjs working. Usually they show you how to get the code, create a driver, go to some website and grab the title to prove it works. However, in real applications we want to have something more organized and scalable, that's when the selenium based test frameworks come to help. 

Despite the good parts, the problem with using these frameworks, say [webdriverio](https://github.com/webdriverio/webdriverio) or [nightwatch](https://github.com/nightwatchjs/nightwatch), is they can be too complicated or overkill for a specific projects. They also have a lot dependencies that may not be well maintained, which could cause unstable test outcomes. More and more people went from using the test frameworks, to finally built one that best fit their requirements.

I want to show you it's actually not that hard to create a test runner that works well, with just a few dependencies besides [selenium-webdriver](https://github.com/SeleniumHQ/selenium), and highly customizable to fit your own needs.


## How to use
For fork and customize the code, checkout the [test.default.config.js](test.default.config.js) for more details on available configurations. In the todo app, you can create your own [test.config.js](demoApps/todoApp/test.config.js) to overwrite the default one. 

For direct download and use the test runner, simply run

```
npm install selenium-webdriver-runner
```

And you will be able to run the test by

```
selenium-webdriver-runner --config [your config file path]
```

## Todo list
- Documentation