+++
date = "2023-07-28"
title = "Building a Feature-Rich Full-Stack Application with AWS Amplify Studio: Admin panel for Studytub"
description = "Building a Feature-Rich Full-Stack Application with AWS Amplify Studio: Admin panel for Studytub"
slug = "Building a Feature-Rich Full-Stack Application with AWS Amplify Studio: Admin panel for Studytub"
authors = ["Nishikanta Ray"]
tags = ["Amplify Studio", "Full-Stack Application"]
categories = ["Tech"]
+++

**Introduction:**

As a full-stack developer, one of the most rewarding experiences is to build a feature-rich, scalable, and user-friendly application quickly. The AWS Amplify framework is a game-changer, providing developers with powerful tools and services that simplify the entire application development lifecycle. In this blog, I will share my experience creating my project using AWS Amplify during a hackathon.

**The Power of AWS Amplify:**

AWS Amplify is a comprehensive set of tools and services provided by Amazon Web Services (AWS) that enables developers to build full-stack applications with ease. Whether you are a seasoned developer or just starting, AWS Amplify abstracts away the complexities of managing infrastructure, databases, and authentication, allowing you to focus on crafting exceptional user experiences.

1. **Getting Started with AWS Amplify**
    

The journey started with setting up my AWS Amplify project. With just a few CLI commands, I initialized a new project and configured the essential services such as authentication, storage, and APIs. Amplify's seamless integration with popular frontend frameworks like React, Angular, and Vue.js made it effortless to start building.

1. **Creating the Notes App**
    

For my dream project, I decided to create a Notes App where users can jot down their thoughts, ideas, and reminders. To get started, I utilized the Amplify Authentication service to handle user sign-up and login securely. With a few lines of code, I added authentication features like user registration, password reset, and session management.

1. **Note Management with Amplify API and Storage**
    

To store and manage notes, I used the Amplify API and Storage services. I defined a GraphQL schema to model the structure of the notes, including fields like name, description, and image. Amplify automatically provisioned a fully managed GraphQL API, enabling seamless communication between the front end and back end. Storing images was a breeze with Amplify's S3 integration through the Storage service.

1. **Real-time Collaboration with AWS AppSync**
    

To take the Notes App to the next level, I leveraged AWS AppSync, a real-time and offline-capable GraphQL service. This allowed multiple users to collaborate on the same note in real time, with instant updates reflecting across all connected devices.

1. **User-Friendly Interface with AWS Amplify UI Components**
    

AWS Amplify UI Components provided a polished and consistent design language that accelerated the development of the front end. Buttons, forms, modals, and other UI elements were easily integrated into the app, resulting in a professional-looking and user-friendly interface.

1. **Deploying and Hosting the App**
    

With AWS Amplify's simple deployment process, I effortlessly deployed the Notes App to the cloud. Amplify's continuous deployment ensured that updates were automatically propagated to the live environment whenever changes were pushed to the code repository.

1. **Scalability and Security**
    

Throughout the development process, I didn't need to worry about scalability and security. AWS Amplify automatically handled the scaling of resources to meet the application's demand, while AWS's robust security practices kept user data safe and secure.

Let's build an Admin panel for [StudyTub](https://studytub.netlify.app/) using AWS Amplify and explain each step in detail. We'll cover setting up the project, adding authentication, creating APIs, and deploying the app.

**Prerequisites:**

* Node.js installed on your machine
    
* AWS Amplify CLI installed (`npm install -g @aws-amplify/cli`)
    

**Step 1: Setting Up the Project**

First, let's create a new React project using Create React App:

`npx create-react-app amplify-notes-app`

`cd amplify-notes-app`

**Step 2: Initialize Amplify**

Next, we'll initialize Amplify in our project:

`amplify init`

Amplify will prompt you to configure your project. For simplicity, choose the default options for now.

**Step 3: Add Authentication**

Let's add authentication to our app using Amplify Auth:

`amplify add auth`

Amplify will prompt you to configure the authentication settings. Choose the default options for now.

Next, push the changes to the cloud to provision the authentication services:

`amplify push`

**Step 4: Create the GraphQL API**

Now, let's create the GraphQL API for managing notes:

`amplify add api`

Choose "GraphQL" as the API type, and then configure the GraphQL schema:

`type Note @model { id: ID! name: String! description: String! image: String }`

This schema defines a Note model with the fields `name`, `description`, and `image`.

Next, push the changes to the cloud to create the API:

```bash
amplify push
```

**Step 5: Create the React Components**

Now that our backend is set up, let's create the React components for the app.

In the `src` folder, create a new folder named `components`, and inside it, create two files: `CreateNote.js` and `AllNotes.js`.

`CreateNote.js`:

```javascript
jsxCopy codeimport React, { useState } from 'react';
import { API, Storage } from 'aws-amplify';

const CreateNote = () => {
  const [noteData, setNoteData] = useState({ name: '', description: '', image: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setNoteData({ ...noteData, image: file.name });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await API.graphql({
      query: `
        mutation createNote($input: CreateNoteInput!) {
          createNote(input: $input) {
            id
            name
            description
            image
          }
        }
      `,
      variables: { input: noteData },
    });
    if (noteData.image) {
      await Storage.put(noteData.image, noteData.image);
    }
    setNoteData({ name: '', description: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Note Name:</label>
        <input type="text" id="name" name="name" value={noteData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Note Description:</label>
        <input type="text" id="description" name="description" value={noteData.description} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNote;
```

`AllNotes.js`:

```javascript
jsxCopy codeimport React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const apiData = await API.graphql({ query: `query listNotes { listNotes { items { id name description image } } }` });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.image);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  };

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.name}</h3>
          <p>{note.description}</p>
          {note.image && <img src={note.image} alt={`visual aid for ${note.name}`} style={{ width: '200px' }} />}
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
```

**Step 6: Integrate the Components**

Finally, let's integrate the components into the `App.js`:

```javascript
jsxCopy codeimport React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import CreateNote from './components/CreateNote';
import AllNotes from './components/AllNotes';

const App = () => {
  return (
    <div>
      <h1>My Notes App</h1>
      <CreateNote />
      <AllNotes />
    </div>
  );
};

export default withAuthenticator(App);
```

**Step 7: Run the App**

Now, run your app:

```bash
npm start
```

You should see your app running at [`http://localhost:3000`](http://localhost:3000). The app will allow users to create notes with names, descriptions, and optional images. All the notes will be displayed in a list below the Create Note form.

**Conclusion:**

In this blog, we learned how to build a simple Notes App using AWS Amplify. We covered setting up the project, adding authentication, creating a GraphQL API, and deploying the app. AWS Amplify's ease of use and integration with React made it a breeze to create this full-stack application. With AWS Amplify, developers can quickly build feature-rich, scalable, and secure applications without getting bogged down by the complexities of managing infrastructure. Happy hacking!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690484235702/a9f7a59d-7779-44dd-9f04-517f5fad713c.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690484260862/d2ba45cb-5b91-4d25-aa3a-08d5e7de836c.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690484287333/1b3334a4-5e14-4676-aa93-b63c726946fe.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690484311499/1ef56595-4a28-446b-94c4-0ecc729d0c48.png)

**Introduction to Amazon Polly:**

Amazon Polly is a cloud-based service provided by Amazon Web Services (AWS) that revolutionizes the way we interact with text. As an advanced text-to-speech (TTS) technology, Polly is designed to convert written text into lifelike speech, offering a natural and human-like audio output. With its wide range of languages and voices, Polly empowers developers, businesses, and individuals to create engaging and dynamic applications with speech capabilities.

Developers can easily integrate Polly into their applications through APIs, allowing them to generate speech in real time. Whether it's producing audiobooks, creating voice-enabled user interfaces, or enhancing accessibility for visually impaired users, Amazon Polly opens up new possibilities for delivering information and content through natural-sounding voices. Embrace the power of Polly to bring your applications to life with captivating and immersive voice experiences.

[Video Link](https://youtu.be/Wdr55u1PO4A)


[github](https://github.com/NishikantaRay/AWS-AMPLIFY-HACKATHON)

[**#AWSAmplif**](https://hashnode.com/n/aws-amplify)**y** [**#AWSAmplifyHackathon**](https://hashnode.com/n/awsamplifyhackathon)