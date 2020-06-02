# Store: Site
This is the frontend of a simple site to share items (products, recipes, etc...) easily. 

## Features:
* Site settings:
  * Rename the site
  * Rename the two left menu
  * Some simple layout changes
* Add item without any DB knowledge
* Separate visitor and admin functionality.
* Multi-admin (Allow multiple users to add, remove, or modify items or posts)
* Soft-Delete (Show/Hide items and posts without fully deleting them)


* **NOTE:** This `Site` has to be used with the backend to have any of the above functionality.

## Requirements
* nvm - Follow the instructions on [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
  * `nvm install v12`
* These should install using the command above:
  * Node 12 LTS
  * npm 6
* **Note:** This documentation is for Ubuntu 20.04 LTS. This should also work on Windows or OSX but it has not been 
verified.   

## General Setup
1. Clone this repository on your disk
1. `cd path/to/directory`
1. `npm install`

## Development
To start the development server use `npm run start`. Any changes should trigger reload of the application.

## Test
This project uses Jest with Enzyme for testing the React components.
To run all tests:
* `npm run test`

This project makes use of [Travis CI](https://travis-ci.com/). 
With the current `.travis.yml` any push to `master` or branches starting with `SITE` will trigger a build on
[Travis CI](https://travis-ci.com/)     

## Production
1. `npm run build`
1. Server as a static site using your favourite server application. *I prefer Apache :)*


## Author
Computer Engineering BS from San Jose State University.

On my free time I code and Read about computers.

[@ali_the_coder](https://twitter.com/ali_the_coder)