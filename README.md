# T-Shirt Mock up Generator

## Project Overview
This project demonstrates user authentication and basic CRUD functionality. This web application can be used to create simple T-shirt mockups. It allows you to add your own image and styled text. You can create an account to save designs to your profile for future viewing.

## Tech Stack
* React js frontend
* Node js backend
* MongoDB with mongoose

## Features
* User Authentication
* Mock up design editing
* Preview shirt mock up
* Create account
* Save mockups
* Manage saved designs

### User Authentication
I implemented passport js using the "Local Strategy." Once a user is authenticated by logging in with the correct creds, passport js creates cookie and session info that keep track of the current user. Passport js can be used as a middleware for handling request to routes which require authentication.

### Mock up editor
The mock up generator is composed of multiple HTML canvas elements that have controls built into the UI. The canvas elements allow me to render graphics within the pixel grid. This allows me render user images and text which I can modify in the web application. I can select, resize, reposition or remove elements from the editor. I used a library fabric js to help me work with the HTML canvas elements.

### Create Account
The sign up form can be used to create an acount for the application. The form will check if the user already exists and will create the user in the database if there are no conflicts. Once an account is created, newly created mock ups can be saved.

### Save mock ups
After a design is created, it can be saved to your profile after logging in successfully. This creates a design object in the database and associates the user with the design.

### Manage saved designs
After logging in, previously saved designs are visible in the account page. Saved designs can be downloaded onto your device or deleted if they are no longer needed. 
