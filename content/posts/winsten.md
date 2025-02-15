+++
date = "2024-09-25"
title = "A Complete Guide to Logging in Node.js with Winston and AWS CloudWatch"
description = "A Complete Guide to Logging in Node.js with Winston and AWS CloudWatch"
slug = "A Complete Guide to Logging in Node.js with Winston and AWS CloudWatch"
authors = ["Nishikanta Ray"]
tags = ["Backend Development","mongodb", "Full-Stack Application","cloudwatch","aws"]
categories = ["Tech"]
+++

Logging is a crucial part of any application development. It helps track application behavior, debug issues, monitor performance, and ensure everything works as expected.

### What is Winston?

**Winston** is a logging library for **Node.js** designed to be simple, flexible, and extensible. It supports multiple logging transports, which means you can send your logs to different destinations such as a file, the console, or even cloud services like AWS CloudWatch.

## Setting Up Winston in Node.js

### Step 1: Installing Winston

Start by installing **Winston** in your Node.js project:

```bash
npm install winston
```

### Step 2: Basic Setup for Winston

Create a new file `logger.js` and add the following code to set up Winston:

```javascript
const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Logs will be in JSON format
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),  // Log errors to error.log
    new winston.transports.File({ filename: 'logs/combined.log' })                // Log all messages to combined.log
  ],
});

// If we're in development, log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Simple output in the console for readability
  }));
}

module.exports = logger;
```

In this setup:

* We log all messages to `combined.log`.
    
* Errors are logged separately to `error.log`.
    
* For development environments, logs are also sent to the console.
    

### Step 3: Using Winston in Your Application

You can now import and use your logger throughout your Node.js app:

```javascript
const logger = require('./logger');

logger.info('Server started successfully');
logger.error('Error occurred during server initialization');
```

---

## Adding Log Rotation with Daily Log Files

Winston has a useful plugin called **winston-daily-rotate-file** that allows you to automatically rotate logs daily.

### Step 1: Install the Daily Rotate File Transport

```bash
npm install winston-daily-rotate-file
```

### Step 2: Set Up Log Rotation

Modify your `logger.js` to include log rotation:

```javascript
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Configure Winston with Daily Rotate File transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
});
```

This setup creates new log files daily, and older logs are automatically deleted after 14 days.

---

## Adding Security Headers with Helmet

Security is another important aspect, especially for web applications. **Helmet** is a middleware that helps secure your Express app by setting HTTP headers.

### Step 1: Install Helmet

```bash
npm install helmet
```

### Step 2: Use Helmet in Your Application

Add Helmet to your Express app to automatically apply security headers:

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// Use Helmet for security
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World with Security Headers!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Uploading Logs to AWS CloudWatch

To manage and monitor logs from various servers or instances, you can use **AWS CloudWatch**. We'll use the **WinstonCloudWatch** transport to send logs directly to CloudWatch.

### Step 1: Install Winston CloudWatch

```bash
npm install winston-cloudwatch aws-sdk
```

### Step 2: Configure Winston with CloudWatch

Modify your `logger.js` to include AWS CloudWatch as a log transport:

```javascript
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

// Configure AWS credentials (optional if using IAM roles)
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// Configure Winston logger with CloudWatch transport
const logger = winston.createLogger({
  transports: [
    new WinstonCloudWatch({
      logGroupName: 'node-app-logs',    // CloudWatch log group name
      logStreamName: 'node-app-stream', // CloudWatch log stream name
      awsRegion: 'us-east-1',
    }),
  ],
});
```

### Step 3: Using the Logger

Now, whenever you use the logger, it will send logs to **AWS CloudWatch**:

```javascript
logger.info('This is an info message');
logger.error('This is an error message');
```

### Step 4: View Logs in CloudWatch

You can view and analyze the logs in the **AWS CloudWatch Console** by navigating to **Log Groups** and selecting your `logGroupName`.

## Automating Log Deletion with Cron Jobs

While Winston rotates and manages logs automatically, you may still want to run custom cron jobs to delete old logs or manage log retention.

### Step 1: Install Node Cron

```bash
npm install node-cron
```

### Step 2: Create a Cron Job for Log Deletion

In `logger.js`, you can set up a cron job to run every day and delete log files older than 14 days:

```javascript
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');

// Set up a cron job to delete old logs every day at midnight
cron.schedule('0 0 * * *', () => {
  fs.readdir(logDirectory, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(logDirectory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        const now = Date.now();
        const fileAge = now - stats.mtimeMs;

        if (fileAge > 14 * 24 * 60 * 60 * 1000) { // 14 days in ms
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`Deleted old log file: ${file}`);
          });
        }
      });
    });
  });
});
```

## Conclusion

By combining **Winston** for logging, **Helmet** for security, and **AWS CloudWatch** for centralized log management, you create a robust, scalable, and secure logging infrastructure for your Node.js application. This setup ensures that logs are handled efficiently, with automatic rotation, cloud-based storage, and optional cron jobs for custom log management.

By integrating these tools, your application becomes easier to monitor, debug, and scale in production environments.