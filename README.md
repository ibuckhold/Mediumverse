# Mediumverse

[Mediumverse](https://mediumverse-voyager.herokuapp.com/) is a clone of the popular article and story site, [Medium](https://medium.com/), thematically based in the Marvel Universe! Users can create and edit their own stories, upload a custom cover photo, and publish it publicly to make it available for site-wide reading. Users can also like and comment on stories, as well as follow any users that they might be interested in. Keep reading to get a preview!

## Tech Stack
   - Javascript
   - Node.js
   - Express.js
   - PostgreSQL
   - Multer
   - HTML
   - CSS

## Features
   - User authentication. (*Login*, *Signup*)
   - Users can add/edit/delete their stories.
   - Users can choose to like/unlike stories.
   - Users have the ability to comment on stories, and edit/delete their comments.
   - Users can follow/unfollow other users, and can also follow themselves.
   - Users can upload their own custom cover photo for any of their stories.

## Site Walk-through
### Welcome Page
This is the initial splash page that users land on. It has navigation links so that users can sign up or log in as an existing user. For convenience's sake, we also allow users to log in as a demo user without credentials in case they just want to look around our site.  

![image](https://user-images.githubusercontent.com/74396674/121714399-65b87700-caa3-11eb-8eb6-3e7b8f40d991.png)

### User page
This is the page that shows a user's published stories, along with the cover image that the user chose to upload with it. We display some additional details, like the date the story was published, and a sneak peek at the story's contents. If you're logged in as the user that's displayed on the page, you'll also have the option to edit or delete your story directly from this site.  
  
This is also where you can view who the user is following, as well as the place where you can choose to follow this user. You can see that we're currently following this user because the 'following' button is filled out.  

![image](https://user-images.githubusercontent.com/74396674/121714659-af08c680-caa3-11eb-91fe-e2472b1130b0.png)

### Create/Edit Story
This is the interface that users can use to create or edit their story. We include a list of selectable tags that users can choose from to group their story into a specific category. This is also where you can choose to upload a custom image! We use the third-party middleware Multer to handle file uploads. If a user chooses not to upload a custom image, a default image will be used in its place.  

![image](https://user-images.githubusercontent.com/74396674/121714770-c942a480-caa3-11eb-88ef-217fb9f2f271.png)

### Story page
![image](https://user-images.githubusercontent.com/74396674/121714876-e7100980-caa3-11eb-8ea2-0f29d2cc7768.png)

## Further Documentation
https://github.com/icarusbuckhold/Team_Voyager_Project/wiki

## Installation / Updating App
Download the repo and run "npm install" which will download all the required packages to run the web app. To view it in localhost for local testing, run "npm start".

### Media Credits
   - Splashpage Banner Image: HIClipart
   - Esquire

