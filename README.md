## Online Document Manager - Amplify Demo
Online Document Manager is a **web storage solution** where authenticated users can store, access, and share files such as documents, photos, videos, etc. from anywhere with an internet connection. It allows you to keep your files organized, backed up, and easily accessible. You can also save files or documents privately or publicly for all authenticated users using a simple user interface (UI). All text documents can also be analyzed to obtain data such as number of words, tables, forms, keywords, objects, entities and analyze the sentiment in general. 

It was created with the [**AWS Amplify toolset**](https://docs.amplify.aws/). Amplify is a set of tools and services that enables front-end and mobile developers to build scalable full-stack applications by integrating backend cloud services (such as *Simple Storage Service -S3-, Cognito, Comprehend, Textract*, among others) with their web or mobile frontend. The user interface (UI) was created with the [**Cloudscape design**](https://cloudscape.design/), an open source design system to create beautiful web applications. It was built for and is used by Amazon Web Services (AWS) products and services. It was created in 2016 to improve the user experience across web applications owned by AWS services, and also to help teams implement those applications faster.

This project was created using the following Amplify features:
- **Amplify Storage**: Amplify allows you to either setup a app content storage (images, audio, video etc.) backed by Amazon S3 or a NoSQL database backed by Amazon DynamoDB.
- **Amplify Authentication**: The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options backed by Amazon Cognito.
- **Amplify Predictions**: The Predictions category provides a solution for using AI and ML cloud services to enhance your application. Some supported use cases are: text recognition from image, entities recognition, label real world objects, interpretation of text and transcription of text.
- **Amplify Hosting**: Provides a git-based workflow for continuous deployment & hosting of fullstack web apps. Cloud resources created by the Amplify CLI are also visible in the Amplify Console.

### Requirements
 - Have access to a AWS account with Access Key and Secret Access Key
 - Install **NodeJS** and **npm**
 - Install a **JavaScript IDE**
 - Install **AWS CLI**
 - Install **Amplify CLI**

### Steps

 1. [Install Node.js®](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm) if they are not already on your machine.
 2. Verify that you are running at least Node.js version 12.x and npm version 6.x or greater by running `node -v` and `npm -v` in a terminal/console window
 3. Go to your AWS Account and [create an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html). Then [define that user's permissions as narrowly as possible](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege).
2.  [Create the access key under that IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
3. Copy, paste and save in a secret place your Access Key and Secret Access Key. **It is important to keep both keys in a safe place and do not redistribute this keys to anybody.**
4. [Install in your computer the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
5. [Install and configure Amplify CLI.](https://docs.amplify.aws/cli/start/install/) You can follow the guidelines in the previous link on how to install Amplify based on your OS.
6. Download this repository by doing `git clone https://github.com/aws-samples/online-document-manager-amplify` or simply download source code.
7. In your terminal/console window, go to your code root folder and type `npm install` to install all the dependencies.
8. Once finished, initialize AWS Amplify in the new directory by running `amplify init`. After a few configuration questions, you can use `amplify help` at any time to see the overall command structure
9. To deploy all the resources, you can use the Amplify `push` command: `amplify push` and follow guidelines. 
10. Finally, we need to deploy the UI to Amplify Hosting. Execute the following command and follow instructions: `amplify publish`

