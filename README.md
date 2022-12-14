# Strello - Project management app inspired by Trello 
[Here is a link to the project](https://strello-app.onrender.com/).

![alt text][board]
***
### Table of Contents

[board]: https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/appScreenshot.png

* [Trello Description](#trello-description)
* [Application Features](#application-features)
* [Technologies](#technologies)
* [Getting started](#getting-started)
* [Showcase](#showcase)

## Trello Description

Trello is an app in which you can manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects to do in the project. Users can modify the board and change list and card locations using Drag and Drop. Users can work together and watch live changes. There are many other features in Trello, such as labels, due date for tasks, members and more.

## Application Features
* Boards - Create and manage projects: Using D&D, create, remove, and update lists and tasks.
* Tasks - Create, edit and delete to the deepest level: labels, due date, members, cover images, checklists, attachments, activity log and comments.
* Filtering - Filter boards based on title.
* Side Menu - Change the background of the board with the Unsplash Photos and a full board Activity Log!

We spent a lot of effort on making sure that the app is as close as possible to the original trello both in design and in functionality.

## Technologies
The technology stack we used was MERN - MongoDB, Express, React, Node.js. The app uses webSockets to update the board in real-time. The API calls to the backend are done with the REST API method, and we used middlewares to authenticate and authorize actions.

We have used many third side libraries for many goals, such as D&D and more. The layout and pixel-perfect were made with Sass.

## Getting started
Head to the repositories 'strello-frontend' and 'strello-backend' in my profile and clone the project or download the files.

```
git clone https://github.com/maorlayani/strello-frontend.git
```
```
git clone https://github.com/maorlayani/strello-backend.git
```
Enter the backend part of the project and make sure you have node_modules installed. After that we will initiate the server with 'npm start':
```
npm i
npm start
```
You shuold get a console output that the server is up and running at port 3030. Enter the frontend section of the project and repeat the same process.
```
npm i
npm start
```
You shuold get a console output that that the server is up and running at localhost:3000.

That's it! The App should open automatically, enjoy!

## Showcase
#### Homepage
The landing page in which the user can sign up / login, or press the call to action button to start demo with no need for registration.

![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/home-page.png)

#### Workspace
All of the user's boards. Here the user can create new boards and visit existing ones.
![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/workspace.png)

### Board
All the functionality that you have in Trello, D&D, live-updates, editing tasks to the deepest level, side-menu, editing board members and much more - [just check it out...!](https://strello-app.onrender.com/)

![alt text][board]

### Signup
We created a sign up system with authentication flow, including encrypting the user's details and midelwears.
![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/signup.png)

### Task details
Here the user can edit his tasks and watch it happens live, on this page and behind it on the board.

<img width="947" alt="task-details" src="https://user-images.githubusercontent.com/109607661/207602294-a1dcdbbd-6c1a-4131-b80d-a3b2bee624f9.png">

### Side menu
The menu on the right which is opened by pressing the "Show menu" button enables the user to change the board's background with Images from unsplash and watch the activities of the board.

![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/side-menu.png)

### Some mobile!
Just a taste of the mobile experience. We used different mixins, conditional rendering and the "mobile first" approach.

<!-- ![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/mobile-home-page.png) -->
<!-- ![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/mobile-workspace.png) -->
<!-- ![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/mobile-board.png) -->
<!-- ![alt text](https://github.com/maorlayani/strello-frontend/blob/4872109c4011386f29737998143658a2584e262e/src/assets/img/mobile-task-details.png) -->
<p float="left">
<img width="196" alt="mobile-home-page" src="https://user-images.githubusercontent.com/109607661/207602837-794e8def-ed7f-4265-a17b-ec2efe14d01b.png">
<img width="197" alt="mobile-workspace" src="https://user-images.githubusercontent.com/109607661/207602826-b9ebe206-4a87-46b9-8dd6-f35fc388afef.png">
<img width="194" alt="mobile-board" src="https://user-images.githubusercontent.com/109607661/207602843-c473ce6c-20e3-410a-a3c4-0c460daac857.png">
<img width="197" alt="mobile-task-details" src="https://user-images.githubusercontent.com/109607661/207602840-694070a8-7291-435e-b82d-38148da885a8.png">
 </p>
