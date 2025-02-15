+++
date = "2024-06-01"
title = "Advanced Aggregation Techniques: $unwind, $group, and $project"
description = "Advanced Aggregation Techniques: $unwind, $group, and $project"
slug = "Advanced Aggregation Techniques: $unwind, $group, and $project"
authors = ["Nishikanta Ray"]
tags = ["Backend Development","mongodb", "Full-Stack Application"]
categories = ["Tech"]
+++


MongoDB's aggregation framework is a versatile tool for transforming and analyzing data. Combining `$unwind` with other aggregation stages allow you to perform even more complex queries and gain deeper insights from your data.

### Understanding `$unwind`

The `$unwind` stage in MongoDB's aggregation pipeline deconstructs an array field from the input documents to output a document for each element of the array. This effectively "flattens" the array, creating multiple documents from a single document that contains an array.

```javascript
{
  $unwind: {
    path: <arrayFieldPath>,
    includeArrayIndex: <string>, // Optional
    preserveNullAndEmptyArrays: <boolean> // Optional
  }
}
```

### **How** `$unwind` Works

Consider the following collection `users`:

```json
[
  { "_id": 1, "name": "Alice", "hobbies": ["reading", "cycling", "swimming"] },
  { "_id": 2, "name": "Bob", "hobbies": ["painting", "drawing"] },
  { "_id": 3, "name": "Charlie", "hobbies": [] },
  { "_id": 4, "name": "David" }
]
```

Applying the `$unwind` stage on the `hobbies` field:

{ $unwind: "$hobbies" }

```json
[
  { "_id": 1, "name": "Alice", "hobbies": "reading" },
  { "_id": 1, "name": "Alice", "hobbies": "cycling" },
  { "_id": 1, "name": "Alice", "hobbies": "swimming" },
  { "_id": 2, "name": "Bob", "hobbies": "painting" },
  { "_id": 2, "name": "Bob", "hobbies": "drawing" }
]
```

To retain documents with empty or non-existent arrays, you can use the `preserveNullAndEmptyArrays` option:

`{ $unwind: { path: "$hobbies", preserveNullAndEmptyArrays: true } }`

```json
[
  { "_id": 1, "name": "Alice", "hobbies": "reading" },
  { "_id": 1, "name": "Alice", "hobbies": "cycling" },
  { "_id": 1, "name": "Alice", "hobbies": "swimming" },
  { "_id": 2, "name": "Bob", "hobbies": "painting" },
  { "_id": 2, "name": "Bob", "hobbies": "drawing" },
  { "_id": 3, "name": "Charlie", "hobbies": null },
  { "_id": 4, "name": "David", "hobbies": null }
]
```

### **Practical Use Cases for** `$unwind`

#### **1\. E-Commerce Order Processing**

Consider an e-commerce database where each order document contains an array of items purchased:

```json
{
  "_id": 101,
  "customer": "John Doe",
  "items": [
    { "product": "Laptop", "quantity": 1, "price": 1200 },
    { "product": "Mouse", "quantity": 2, "price": 40 }
  ]
}
```

Using `$unwind`, we can flatten the items array to analyze sales data more effectively:

```json
{ $unwind: "$items" }
```

Result:

```json
[
  { "_id": 101, "customer": "John Doe", "items": { "product": "Laptop", "quantity": 1, "price": 1200 } },
  { "_id": 101, "customer": "John Doe", "items": { "product": "Mouse", "quantity": 2, "price": 40 } }
]
```

#### **2\. Social Media Analytics**

In a social media platform, each user document might contain an array of posts. To generate reports on individual posts, `$unwind` can be used to flatten the posts array:

```json
{
  "_id": 202,
  "username": "janedoe",
  "posts": [
    { "post_id": 1, "content": "Hello World!" },
    { "post_id": 2, "content": "MongoDB is awesome!" }
  ]
}
```

Using `$unwind` on the posts array:

```json
{ $unwind: "$posts" }
```

Result:

```json
[
  { "_id": 202, "username": "janedoe", "posts": { "post_id": 1, "content": "Hello World!" } },
  { "_id": 202, "username": "janedoe", "posts": { "post_id": 2, "content": "MongoDB is awesome!" } }
]
```

### **Combining** `$unwind` with `$match`, `$group`, and `$project`

To demonstrate the combined power of these stages, let's work with an example collection called `orders`. This collection stores customer orders, each containing an array of items.

#### **Sample Data**

```json
[
  {
    "_id": 1,
    "customer": "John Doe",
    "orderDate": "2023-05-01",
    "items": [
      { "product": "Laptop", "quantity": 1, "price": 1200 },
      { "product": "Mouse", "quantity": 2, "price": 25 }
    ]
  },
  {
    "_id": 2,
    "customer": "Jane Smith",
    "orderDate": "2023-05-02",
    "items": [
      { "product": "Keyboard", "quantity": 1, "price": 100 },
      { "product": "Monitor", "quantity": 1, "price": 300 },
      { "product": "Mouse", "quantity": 1, "price": 25 }
    ]
  }
]
```

### **Step-by-Step Aggregation**

#### **1\.** `$unwind`

First, we use `$unwind` to deconstruct the `items` array in each order document. This will create separate documents for each item in an order.

```json
{ $unwind: "$items" }
```

Output:

```json
[
  { "_id": 1, "customer": "John Doe", "orderDate": "2023-05-01", "items": { "product": "Laptop", "quantity": 1, "price": 1200 } },
  { "_id": 1, "customer": "John Doe", "orderDate": "2023-05-01", "items": { "product": "Mouse", "quantity": 2, "price": 25 } },
  { "_id": 2, "customer": "Jane Smith", "orderDate": "2023-05-02", "items": { "product": "Keyboard", "quantity": 1, "price": 100 } },
  { "_id": 2, "customer": "Jane Smith", "orderDate": "2023-05-02", "items": { "product": "Monitor", "quantity": 1, "price": 300 } },
  { "_id": 2, "customer": "Jane Smith", "orderDate": "2023-05-02", "items": { "product": "Mouse", "quantity": 1, "price": 25 } }
]
```

#### **2\.** `$match`

Next, we use `$match` to filter documents. For example, let's find all orders containing the product "Mouse".

```json
{ $match: { "items.product": "Mouse" } }
```

Output:

```json
[
  { "_id": 1, "customer": "John Doe", "orderDate": "2023-05-01", "items": { "product": "Mouse", "quantity": 2, "price": 25 } },
  { "_id": 2, "customer": "Jane Smith", "orderDate": "2023-05-02", "items": { "product": "Mouse", "quantity": 1, "price": 25 } }
]
```

#### **3\.** `$group`

To aggregate data, we can use `$group`. Let's sum up the total quantity and revenue for each product.

```json
{
  $group: {
    _id: "$items.product",
    totalQuantity: { $sum: "$items.quantity" },
    totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
  }
}
```

Output:

```json
[
  { "_id": "Mouse", "totalQuantity": 3, "totalRevenue": 75 },
  { "_id": "Keyboard", "totalQuantity": 1, "totalRevenue": 100 },
  { "_id": "Monitor", "totalQuantity": 1, "totalRevenue": 300 },
  { "_id": "Laptop", "totalQuantity": 1, "totalRevenue": 1200 }
]
```

#### **4\.** `$project`

Finally, we use `$project` to format the output. Let's create a more readable output that renames fields and calculates the average price per unit.

```json
{
  $project: {
    _id: 0,
    product: "$_id",
    totalQuantity: 1,
    totalRevenue: 1,
    avgPrice: { $divide: ["$totalRevenue", "$totalQuantity"] }
  }
}
```

Output:

```json
[
  { "product": "Mouse", "totalQuantity": 3, "totalRevenue": 75, "avgPrice": 25 },
  { "product": "Keyboard", "totalQuantity": 1, "totalRevenue": 100, "avgPrice": 100 },
  { "product": "Monitor", "totalQuantity": 1, "totalRevenue": 300, "avgPrice": 300 },
  { "product": "Laptop", "totalQuantity": 1, "totalRevenue": 1200, "avgPrice": 1200 }
]
```

### **Full Aggregation Pipeline**

Combining all these stages, the complete aggregation pipeline looks like this:

```json
[
  { $unwind: "$items" },
  { $match: { "items.product": "Mouse" } },
  {
    $group: {
      _id: "$items.product",
      totalQuantity: { $sum: "$items.quantity" },
      totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
    }
  },
  {
    $project: {
      _id: 0,
      product: "$_id",
      totalQuantity: 1,
      totalRevenue: 1,
      avgPrice: { $divide: ["$totalRevenue", "$totalQuantity"] }
    }
  }
]
```

### **Conclusion**

Using `$unwind` in conjunction with other aggregation stages like `$match`, `$group`, and `$project` allows you to perform sophisticated data transformations and analysis in MongoDB. Whether you are analyzing e-commerce data, social media interactions, or any other type of array-based data, these techniques can help you unlock deeper insights and create more meaningful reports.