+++
date = "2023-09-26"
title = "Creating a Comprehensive Hackathon Database with Outerbase and Supabase 🚀🛠️"
description = "Creating a Comprehensive Hackathon Database with Outerbase and Supabase 🚀🛠️"
slug = "Creating a Comprehensive Hackathon Database with Outerbase and Supabase"
authors = ["Nishikanta Ray"]
tags = ["React", "Full-Stack Application" ,"Outerbase","Supabase"]
categories = ["Tech"]
+++

## **Introduction 📝**

In this tutorial, we will walk you through the process of creating a robust hackathon database using Outerbase and Supabase. This database will allow you to efficiently manage hackathon details, challenges, teams, submissions, judges, and judging criteria. 🏆🔍

## **Prerequisites 🧰✅**

Before we begin, make sure you have the following:

1. An account on Supabase: [**Sign up here**](https://supabase.com/). 🌐🔗
    
2. A project set up on Supabase with credentials generated. 🗂️🔑
    

## **Getting Started 🏁🚀**

### **1\. Connecting to Supabase 🌐🔗**

1. Create a project on Supabase, select your region, and generate a password. 🌍🔐
    
2. Go to project settings and then database to find and copy all the necessary connection data. 🖱️📋
    

### **2\. Setting Up Outerbase 🧩🔌**

1. Create an Outerbase account. 🆕🔐
    
2. Connect your Outerbase account to Supabase using the previously copied credentials. 🔗🔑
    

### **3\. Creating a New Base 🗄️🆕**

In Outerbase, create a new base to start building your hackathon database. 🛠️🏗️

## **Creating the Tables 🗃️📊**

Let's begin by creating the necessary tables for our hackathon database. 🗃️📊

### **Hackathon Details Table 📅📝**

* Hackathon\_ID (Unique identifier for each hackathon)
    
* Hackathon\_Name
    
* Start\_Date
    
* End\_Date
    
* Location
    
* Organizer\_ID (Organizer's User\_ID)
    
* Description
    

### **Challenges Table**

* Challenge\_ID (Unique identifier for each challenge)
    
* Hackathon\_ID (Foreign key referencing the Hackathon Details Table)
    
* Challenge\_Name
    
* Description
    
* Difficulty\_Level
    
* Prize
    

### **Teams Table**

* Team\_ID (Unique identifier for each team)
    
* Team\_Name
    
* Hackathon\_ID (Foreign key referencing the Hackathon Details Table)
    
* Team\_Leader\_ID (User\_ID of the team leader)
    
* Team\_Size
    

### **Team Members Table**

* Team\_ID (Foreign key referencing the Teams Table)
    
* User\_ID (Foreign key referencing the Users Table)
    

### **Submissions Table**

* Submission\_ID (Unique identifier for each submission)
    
* Team\_ID (Foreign key referencing the Teams Table)
    
* Challenge\_ID (Foreign key referencing the Challenges Table)
    
* Submission\_Date
    
* Status (e.g., Submitted, In Review, Accepted, Rejected)
    
* Score
    

### **Judges Table**

* Judge\_ID (Unique identifier for each judge)
    
* First\_Name
    
* Last\_Name
    
* Email
    

### **Judging Criteria Table**

* Criterion\_ID (Unique identifier for each criterion)
    
* Challenge\_ID (Foreign key referencing the Challenges Table)
    
* Criterion\_Name
    
* Description
    
* Max\_Score
    

### **Scores Table**

* Submission\_ID (Foreign key referencing the Submissions Table)
    
* Criterion\_ID (Foreign key referencing the Judging Criteria Table)
    
* Score
    

## **Importing Data 📤📥**

1. Import the CSV file containing hackathon details, challenges, teams, etc., into Supabase. 📤📥
    
2. Set the primary keys and save the data into the database. 🔑💾
    

## **Writing Queries 📝🔍**

Now that we have set up our database, let's write some queries to retrieve and manage the data. 📝🔍

1. **Retrieve all hackathons:**
    
    ```sql
    SELECT * FROM Hackathon_Details;
    ```
    
    * **Description**: This query retrieves all records from the "Hackathon Details" table, providing information about all hackathons.
        
2. **Retrieve all challenges for a specific hackathon:**
    
    ```sql
    SELECT * FROM Challenges WHERE Hackathon_ID = <hackathon_id>;
    ```
    
    * **Description**: This query retrieves all challenges associated with a specific hackathon. Replace `<hackathon_id>` with the actual hackathon ID.
        
3. **Retrieve all teams for a specific hackathon:**
    
    ```sql
    SELECT * FROM Teams WHERE Hackathon_ID = <hackathon_id>;
    ```
    
    * **Description**: This query retrieves all teams participating in a specific hackathon. Replace `<hackathon_id>` with the actual hackathon ID.
        
4. **Retrieve all team members for a specific team:**
    
    ```sql
    SELECT * FROM Team_Members WHERE Team_ID = <team_id>;
    ```
    
    * **Description**: This query retrieves all members of a specific team. Replace `<team_id>` with the actual team ID.
        
5. **Retrieve all submissions for a specific team:**
    
    ```sql
    SELECT * FROM Submissions WHERE Team_ID = <team_id>;
    ```
    
    * **Description**: This query retrieves all submissions made by a specific team. Replace `<team_id>` with the actual team ID.
        
6. **Retrieve all submissions for a specific challenge:**
    
    ```sql
    SELECT * FROM Submissions WHERE Challenge_ID = <challenge_id>;
    ```
    
    * **Description**: This query retrieves all submissions made for a specific challenge. Replace `<challenge_id>` with the actual challenge ID.
        
7. **Retrieve the highest scoring submission for a specific challenge:**
    
    ```sql
    SELECT TOP 1 * FROM Submissions WHERE Challenge_ID = <challenge_id> ORDER BY Score DESC;
    ```
    
    * **Description**: This query retrieves the highest scoring submission for a specific challenge. Replace `<challenge_id>` with the actual challenge ID.
        
8. **Retrieve the judges for a specific hackathon:**
    
    ```sql
    SELECT * FROM Judges WHERE Judge_ID IN (SELECT Judge_ID FROM Judging_Criteria WHERE Challenge_ID IN (SELECT Challenge_ID FROM Challenges WHERE Hackathon_ID = <hackathon_id>));
    ```
    
    * **Description**: This query retrieves all judges associated with a specific hackathon. Replace `<hackathon_id>` with the actual hackathon ID.
        
9. **Retrieve judging criteria for a specific challenge:**
    
    ```sql
    SELECT * FROM Judging_Criteria WHERE Challenge_ID = <challenge_id>;
    ```
    
    * **Description**: This query retrieves all judging criteria for a specific challenge. Replace `<challenge_id>` with the actual challenge ID.
        
10. **Calculate the average score for a specific team's submissions:**
    
    ```sql
    SELECT AVG(Score) FROM Submissions WHERE Team_ID = <team_id>;
    ```
    
    * **Description**: This query calculates the average score for all submissions made by a specific team. Replace `<team_id>` with the actual team ID.
        

## **Queries 📝🔍**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695671600139/ce1a4d80-82ce-4706-9e1d-99178bf1d79f.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695671678542/450e28ce-eecd-4900-9ad1-5292cda67904.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695671895819/52a0d783-cdfe-410f-bbbb-abfd99f7a3a3.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695671985713/8b8e101d-9190-4583-9cbd-639e285784c7.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695672102151/d8997b0a-a866-416e-afc4-60104dafad6a.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695673154045/338ccc30-3f5c-4f39-98f5-44c33fea14a2.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695673299165/6c3f7774-34a7-4acc-ab91-8c02502644f2.png)

## **DataBase Tables📤**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695672154348/5813552a-8732-44dc-9567-f172455be94f.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695672193251/b7437cbf-8a69-44c6-aac5-0ae487bb4820.png)

## **Conclusion 🎉🥳**

Congratulations! You have successfully created a comprehensive hackathon database using Outerbase and Supabase. This database will allow you to efficiently manage hackathon events, challenges, teams, submissions, judges, and judging criteria. Feel free to customize and expand the database according to your specific needs. Happy hacking! 🎉🚀