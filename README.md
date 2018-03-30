# Selenium Webdriverjs Example

## What is this
This repo is a demo on how to setup selenium tests with it's webdriverjs library from scratch. The example includes the following:

- A Todo example as the application to test for
- A config file to define your tests properties
- A test runner which runs your test against the config file
- Running test in parallel, locally and remotely (with saucelabs)
- A basic page object
- A set of plugins to help make writing tests easier (for example, taking screenshots)


## Why I am creating this
There are many examples about how to write a few lines of code to get selenium webdriverjs working. Usually they show you how to get the code, create a driver, go to some website and grab the title to prove it works. However, in real applications we want to have something more organized and scalable, that's when the selenium based test frameworks come to help. 

Despite the good parts, the problem with using these frameworks, say (webdriverio)[https://github.com/webdriverio/webdriverio] or (nightwatch)[https://github.com/nightwatchjs/nightwatch], is they can be too complicated or overkill for a specific projects. They also have a lot dependencies that may not be well maintained, which could cause unstable test outcomes. More and more people went from using the test frameworks, to finally built one that best fit their requirements.

I want to show you it's actually not that hard to create a test runner that works well, with just a few dependencies besides (selenium-webdriver)[https://github.com/SeleniumHQ/selenium], and highly customizable to fit your own needs.


## Todo list
- Adding code