+++
date = "2024-08-08"
title = "Handling Errno::ENOMEM and Memory Management in Chunked File Uploads"
description = "Handling Errno::ENOMEM and Memory Management in Chunked File Uploads"
slug = "Memory Management in Chunked File Uploads"
authors = ["Nishikanta Ray"]
tags = ["javascript","file uploads", "Full-Stack Application"]
categories = ["Tech"]
+++

#### **Understanding the** `Errno::ENOMEM` Error

The `Errno::ENOMEM` error is a system-level error indicating that the server has run out of memory. This typically happens when the server tries to allocate more memory than is available, often due to inefficient handling of large files.

When you're uploading files in chunks via JavaScript, each chunk is sent to the server where it is processed. If the server attempts to load too much data into memory simultaneously, it can exhaust available resources, triggering the `Errno::ENOMEM` error.

### Breaking Down Large File Uploads: Handling a 15MB Image with Chunks

When it comes to uploading large files, like a 15MB image, trying to do it all at once can be challenging for your server, especially if it’s not equipped to handle large amounts of data in memory at one time. This can lead to errors, like the dreaded `Errno::ENOMEM`, which occurs when your server runs out of memory.

To avoid this, we can break the file into smaller pieces—called chunks—upload them individually, store each chunk temporarily, and then delete the temporary files once the upload is complete. This approach is both efficient and easy to manage.

### **Understanding the Problem with a Real-Life Example**

Imagine you have a large stack of books (your 15MB image) that you need to move to a new house (upload to the server). If you try to carry the entire stack at once, it’s too heavy, and you’ll likely drop them. Instead, you take a few books simultaneously, making multiple trips until the entire stack is moved. This way, you avoid overloading yourself and can complete the task without any problems.

The same principle applies to uploading large files. By breaking the file into smaller, manageable chunks, you can upload each part without overwhelming your server’s memory, ensuring a smooth upload process.

---

### **Step-by-Step Guide: Uploading a 15MB Image in Chunks**

Let’s walk through how you can implement this in a web application using JavaScript for the client-side and a server-side example in Node.js.

#### **Step 1: Break the Image into Chunks (Client-Side)**

First, we’ll divide the 15MB image into smaller chunks. Suppose we choose a chunk size of 5MB, so we’ll have three chunks in total.

```javascript
const file = document.getElementById('fileInput').files[0];
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB per chunk
let start = 0;

function uploadNextChunk() {
  if (start < file.size) {
    const chunk = file.slice(start, start + CHUNK_SIZE);
    uploadChunk(chunk, start);
    start += CHUNK_SIZE;
  } else {
    console.log('Upload complete!');
  }
}

function uploadChunk(chunk, start) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);
  xhr.setRequestHeader('Content-Range', `bytes ${start}-${start + chunk.size}/${file.size}`);
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      uploadNextChunk();
    } else {
      console.error('Chunk upload failed');
    }
  };

  xhr.send(chunk);
}

uploadNextChunk();
//dummy code it wont work
```

**What’s Happening Here?**

* **Chunk Size**: We set the chunk size to 5MB.
    
* **Slice and Send**: We slice the file into 5MB chunks and upload them one by one.
    
* **Sequential Upload**: After each chunk is uploaded, we move to the next until the whole image is uploaded.
    

#### **Step 2: Store Each Chunk Temporarily on the Server**

On the server side, we’ll store each incoming chunk in a temporary file. Once all chunks are received, the server will combine them to recreate the original file and delete the temporary files.

Here’s how you can handle this in Node.js:

```javascript
const fs = require('fs');
const express = require('express');
const app = express();

app.post('/upload', (req, res) => {
  const tempFilePath = `temp/chunk-${Date.now()}`;
  const writeStream = fs.createWriteStream(tempFilePath);

  req.pipe(writeStream);

  req.on('end', () => {
    // Append the chunk to the final file (not shown in this snippet)
    // You would also check if all chunks are received here
    
    // Simulate finalizing upload
    finalizeUpload(tempFilePath);

    res.status(200).send('Chunk received');
  });

  req.on('error', (err) => {
    console.error('Error:', err);
    res.status(500).send('Server error');
  });
});

function finalizeUpload(tempFilePath) {
  // Example: Append the chunk to the main file (not implemented)
  // Clean up the temp file
  fs.unlink(tempFilePath, (err) => {
    if (err) console.error('Error deleting temp file:', err);
    else console.log('Temp file deleted:', tempFilePath);
  });
}

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
```

**What’s Happening Here?**

* **Temporary Storage**: Each chunk is written to a temporary file.
    
* **Finalizing Upload**: Once all chunks are uploaded, they’re combined into the final image file, and the temporary files are deleted.
    

#### **Step 3: Clean Up Temporary Files**

After the upload is complete and the chunks are combined into the final file, it’s important to delete the temporary files to free up space and keep the server tidy.

```javascript
javascriptCopy codefunction finalizeUpload(tempFilePath) {
  // Combine chunks here (code not shown)
  
  // Delete temporary file
  fs.unlink(tempFilePath, (err) => {
    if (err) console.error('Error deleting temp file:', err);
    else console.log('Temp file deleted:', tempFilePath);
  });
}
```

**Why is Cleanup Important?** Just like in real life, where you wouldn’t leave empty moving boxes cluttering up your new house, in your application, you should delete temporary files to free up space and keep your server running efficiently.

---

### **Conclusion**

By breaking down a large file, like a 15MB image, into smaller chunks and uploading them one by one, you avoid overloading your server’s memory, ensuring a smooth and error-free upload process. After uploading, remember to clean up temporary files to keep your system in top shape.

This chunked upload approach is both practical and necessary when dealing with large files, allowing your application to handle big data gracefully, even with limited server resources.