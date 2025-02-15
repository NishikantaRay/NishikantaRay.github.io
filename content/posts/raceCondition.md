+++
date = "2024-06-16"
title = "🖼️ Understanding Race Conditions in Image Uploads"
description = "🖼️ Understanding Race Conditions in Image Uploads"
slug = "Race Conditions in Image Uploads"
authors = ["Nishikanta Ray"]
tags = ["Backend Development", "Full-Stack Application"]
categories = ["Tech"]
+++

In the world of concurrent programming, race conditions are subtle bugs that can lead to unpredictable behavior and data corruption.

*<mark>"when two threads access the same location in memory at the same time, and at least one of the accesses is a write."</mark>*

### 🚦 What is a Race Condition?

A race condition arises when multiple threads access and attempt to modify shared data concurrently. Since thread scheduling can switch between threads unpredictably, the sequence of access and modification is uncertain. As a result, the final outcome depends on the timing of these threads, effectively causing them to "race" to update the data.

<mark>You are planning to go to a movie at 5 pm. You inquire about the availability of the tickets at 4 pm. The representative says that they are available. You relax and reach the ticket window 5 minutes before the show. I'm sure you can guess what happens: it's a full house. The problem here was in the duration between the check and the action. You inquired at 4 and acted at 5. In the meantime, someone else grabbed the tickets. That's a race condition - specifically a "check-then-act" scenario of race conditions.</mark>

```javascript
if (x == 5) // The "Check"
{
   y = x * 2; // The "Act"

   // If another thread changed x in between "if (x == 5)" and "y = x * 2" above,
   // y will not be equal to 10.
}

// Obtain lock for x
if (x == 5)
{
   y = x * 2; // Now, nothing can change x until the lock is released. 
              // Therefore y = 10
}
// release lock for x
```

```plaintext
  +---------+        +---------+
  | Thread A|        | Thread B|
  +---------+        +---------+
       |                  |
 Check existence of    Check existence of
    a filename            a filename
       |                  |
       v                  v
   Does not exist      Does not exist
       |                  |
       v                  v
  Create the file      Create the file
       |                  |
       v                  v
Write to the file     Write to the file
       |                  |
       v                  v
  🛑 Data Corruption 🛑 Data Corruption
```

### 📸 Race Condition in Image Uploads

Race conditions in image uploads typically occur when multiple users attempt to upload files simultaneously, and the server handles these requests to allow concurrent access to shared resources. Here’s a simple example of how a race condition can manifest:

**Thread A and Thread B both attempt to upload images nearly at the same time.**

1. **Thread A checks if a filename already exists in the storage.**
    
2. **Thread B also checks for the same filename (before Thread A saves its file).**
    
3. **Both threads find that the filename does not exist.**
    
4. **They proceed to save their images using the same filename.**
    

As a result, **one file overwrites the other** because both threads were operating based on outdated information about the file's existence.

### 🔧 Solutions to Avoid Race Conditions

### **🏃** *Using Queues*

Queues serialize access to shared resources by processing tasks sequentially. This ensures that only one task accesses a resource at a time.

### 🔒 *Using Locks*

Locks ensure mutual exclusion by allowing only one thread to access a resource at a time. `async-mutex` can be used to implement locks in Node.js.

### **🔄** *Atomic Operations*

Use atomic file operations like `fs.rename`, which are designed to be indivisible.

### **🆔** *Unique Identifiers*

Generate unique filenames to prevent conflicts and ensure each file has a distinct name.

### **💾** *Database Transactions*

Manage file metadata and operations within a transactional context to ensure consistency.

### 🤞 *Optimistic Concurrency Control*

Check if a resource has been modified before acting

### **📂** *File System Atomic Functions*

Use atomic file creation functions to avoid race conditions. and retry if necessary.

### 🎯 Conclusion

Race conditions can lead to data corruption and unpredictable behavior in concurrent environments like image uploads.

<mark>The best thing would be to create side-effect free and stateless functions, use immutables as much as possible. But that is not always possible. So using java.util.concurrent.atomic, concurrent data structures, proper synchronization, and actor based concurrency will help.</mark>

```plaintext
+-----------------+------------------------+
|   Problem       |        Solution        |
+-----------------+------------------------+
| Concurrent file | Serialize access using |
| operations      | queues                 |
|                 |                        |
| Filename        | Use unique identifiers |
| conflicts       | to avoid conflicts     |
|                 |                        |
| Data            | Use atomic operations  |
| corruption      | and locks              |
+-----------------+------------------------+
```