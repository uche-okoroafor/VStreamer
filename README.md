## VStreamer

This project is a video streaming website that allows users to upload video to their account, the video can be watched or viewed by other users who have access to the website.

## Contributors:

[Uchechukwu Okoroafor](https://github.com/uche-okoroafor)

## Built With:

### Frontend

- [React/Typescript](https://reactjs.org/) - The framework used for developing the components and UI.
- [Material UI](https://material-ui.com/) - Javascript framework for styling and CSS compartmentalization.
- [ReactPlayer](https://github.com/feross/simple-peer) - ReactPlayer is used for the video player.

### Backend

- [Node JS](https://reactjs.org/)/[Express JS](https://expressjs.com/) - Backend used for our API routes.
- [Mongo DB/Atlas](https://www.mongodb.com/) - Database used to store our user and application data.
- [AWS Bucket](https://aws.amazon/) - AWS bucket is used for storing of user profile Image.
- [Cloudinary](https://cloudinary.com/) - Cloudinary is used for storing of videos.

## Features:

- User login/sign up authentication.
- Upload videos.
- Users are able to watch videos which is streamed from the server.
- Delete videos.
- upload profile image.
- update user profile.
- Comment on a Video.
- Like or dislike a Video.
- Like or dislike a Comment.

## Installation:

If you want to run the application locally, follow the instructions below:

1. Clone repository
2. Install Dependencies - Run `npm install` in the root directory and client directory
3. Create a file with the name `.env`
4. Add the application secret key for authentication using `SECRET_KEY` to `.env`
5. Add the application mongo uri `MONGO_LOCAL_URI` to `.env`. Additional information to run mongoDB locally can be found [here](https://docs.mongodb.com/manual/installation/). Alternatively you can use Mongo Atlas [here](https://www.mongodb.com/cloud/atlas).
6. To run code from the code editor, create an account on [glot.io](https://glot.io/). You can find your api key after registering [here](https://glot.io/account/token). Add glot token `GLOT_TOKEN` to `.env`.
7. Sign up for [AWS S3](https://aws.amazon.com/s3/) and add `S3_ACCESS_KEY`, `S3_ACCESS_SECRET` and `S3_BUCKET_NAME` to `.env`
8. Final `.env` appear should like below:

```
SECRET_KEY=<Secret key for passport.js>
MONGO_LOCAL_URI=<Your mongo uri>
AWS_BUCKET_NAME=<your aws bucket name>
AWS_BUCKET_REGION=<your aws bucket data base region>
AWS_BUCKET_ACCESS_KEY=<  your aws access key>
AWS_BUCKET_SECRET_ACCESS_KEY=< your aws secret access key>
CLOUDINARY_NAME=< your cloudinary account name>
CLOUDINARY_API_KEY=< your cloudinary api key>
CLOUDINARY_API_SECRET=<your cloudinary api secret key>
```

9. Run `npm run dev` to start the server on the root directory and `npm start` on client to start the application

## Features:

### Watch the video to see the site performance

[![VStreamer](https://user-images.githubusercontent.com/71725892/145043084-3fff7691-61b1-41a4-b322-e72cf313e546.jpg)](https://user-images.githubusercontent.com/71725892/145594851-61671072-ca9c-4242-a4a0-6642d7479b79.mp4)
