```javascript
// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getPost: build.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({ url: `post/${id}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Post", id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
    }),
  }),
});
```

This code defines a **Redux Toolkit Query API slice** using `createApi` from `@reduxjs/toolkit/query`. It provides a structured way to fetch data (in this case, posts), handle caching, and manage API request lifecycles. Let's break down the code step by step:

### 1. **Importing `createApi` and `fetchBaseQuery`**

- **`createApi`**: This is the main function used to define an API slice in Redux Toolkit Query. It automatically generates hooks (e.g., `useGetPostQuery`) to fetch data and handles caching, invalidation, and request lifecycle.
- **`fetchBaseQuery`**: A lightweight wrapper around `fetch`, which is used as the base query to make HTTP requests.

### 2. **Defining the API with `createApi`**

```js
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    // Define endpoints here
  }),
});
```

- **`baseQuery: fetchBaseQuery({...})`**: Configures the base URL for API requests. In this case, the base URL is `'/'`, meaning requests will append to this base URL.
- **`tagTypes: ['Post']`**: Defines tags that can be used for cache invalidation and updates. Here, a `'Post'` tag is declared, which can be useful for identifying cached posts.

### 3. **Defining the `getPost` Endpoint**

```js
getPost: build.query({
  query: (id) => ({ url: `post/${id}` }),
  transformResponse: (response, meta, arg) => response.data,
  transformErrorResponse: (response, meta, arg) => response.status,
  providesTags: (result, error, id) => [{ type: "Post", id }],
});
```

- **`query: (id)`**: Defines how to fetch a specific post by `id`. The query function takes an `id` and returns an object with the `url` for the request (`post/${id}`).
- **`transformResponse`**: This function is used to process the raw response from the server before it is returned. Here, it's extracting the `data` property from the response (i.e., `response.data`), so when the data is accessed in the UI, it's not nested.

- **`transformErrorResponse`**: This function processes the error response and extracts the HTTP status code (`response.status`).

- **`providesTags`**: This is used to tag the cached result of this query. It associates the query result with a tag `Post` and the specific `id` of the post. This is useful for cache invalidation when an update or delete occurs.

### 4. **Lifecycle Methods: `onQueryStarted` and `onCacheEntryAdded`**

These lifecycle methods allow you to perform additional actions when certain events occur, such as when a query starts or when a cache entry is added.

- **`onQueryStarted`**: This method is triggered when the query starts. It can be used to perform side effects such as optimistic updates. It provides access to:

  - **`dispatch`**: Redux store's `dispatch` method, allowing you to trigger other actions.
  - **`getState`**: Access to the current Redux state.
  - **`requestId`**: The unique ID for the current request.
  - **`queryFulfilled`**: A promise that resolves when the query successfully completes.
  - **`updateCachedData`**: Allows you to modify the cache data optimistically before the server responds.

- **`onCacheEntryAdded`**: This method is called when a new cache entry is added. It provides access to:
  - **`cacheEntryRemoved`**: A promise that resolves when the cache entry is removed.
  - **`cacheDataLoaded`**: A promise that resolves when the cache data is loaded.
  - **`updateCachedData`**: Similar to `onQueryStarted`, this can be used to modify cached data when the cache is updated.

### Summary

This code defines a **Redux API slice** that allows fetching posts based on their `id`. It provides several important features:

- **Fetching data** from a given URL (`post/{id}`).
- **Transforming responses** to simplify data access.
- **Tagging cached data** to facilitate invalidation and cache management.
- **Lifecycle hooks** for handling side effects and cache updates, such as optimistic updates.

By setting this up, you can easily use the generated hooks like `useGetPostQuery` in your components to fetch and manage posts efficiently.

---

### Explaination

**`transformResponse`**: This function is used to process the raw response from the server before it is returned. Here, it's extracting the `data` property from the response (i.e., `response.data`), so when the data is accessed in the UI, it's not nested.

### Solution

Sure! Let's break down the use of `transformResponse` with a concrete example to show why it's helpful.

### Scenario:

Suppose you're fetching a post from an API, and the API response looks like this:

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "title": "Understanding Redux Toolkit",
    "content": "Redux Toolkit makes state management easier.",
    "author": "John Doe"
  }
}
```

In a typical response, the actual post data is nested under the `data` property. If you use this response directly in your React component without any transformation, you'd need to access the data like this:

```js
const { data: postData } = useGetPostQuery(1);

console.log(postData);
// Output: { status: 200, data: { id: 1, title: "..." } }

// To access the title, you would have to do:
console.log(postData.data.title); // "Understanding Redux Toolkit"
```

Notice how you'd have to always reference `postData.data` to get the actual post information, which makes it a bit cumbersome.

### Using `transformResponse`

By adding `transformResponse`, you can simplify how you access the post data. You can automatically extract the `data` field from the response so that you don't need to deal with the extra nesting in your component.

Here's how it works:

```js
getPost: build.query({
  query: (id) => ({ url: `post/${id}` }),

  // Transform the response to extract the "data" field
  transformResponse: (response) => response.data,
});
```

With `transformResponse`, now when you use the `useGetPostQuery` hook, the `data` is automatically flattened.

### Example Without `transformResponse`

Here’s what your component might look like **without** `transformResponse`:

```js
const Post = ({ postId }) => {
  const { data: postData, error, isLoading } = useGetPostQuery(postId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  // Without transformResponse, you'd need to access postData.data
  return (
    <div>
      <h1>{postData.data.title}</h1>
      <p>{postData.data.content}</p>
      <p>
        <strong>Author:</strong> {postData.data.author}
      </p>
    </div>
  );
};
```

### Example With `transformResponse`

Now, after using `transformResponse` to remove the extra `data` nesting, the component becomes cleaner:

```js
const Post = ({ postId }) => {
  const { data: postData, error, isLoading } = useGetPostQuery(postId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  // Now, no need to access postData.data, it's already transformed!
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>
      <p>
        <strong>Author:</strong> {postData.author}
      </p>
    </div>
  );
};
```

### Why Use `transformResponse`?

1. **Cleaner Code:** It removes the need to deal with extra nesting in your component, making your code more readable.
2. **Reusable Transformation:** You can centralize the transformation logic in the API slice, so if the structure of the API response changes, you can handle it in one place instead of modifying every component.

### Summary

- Without `transformResponse`, you would need to dig through nested properties (like `postData.data.title`).
- By using `transformResponse`, you simplify the structure and directly access `postData.title` in your components.

This way, the `transformResponse` function makes working with API data easier and cleaner, especially if the API response structure is complex or deeply nested.

---

### Explaination

**`providesTags`**: This is used to tag the cached result of this query. It associates the query result with a tag `Post` and the specific `id` of the post. This is useful for cache invalidation when an update or delete occurs.

Sure! Let’s dive deeper into **`providesTags`** and explain it with a clear example.

### What is `providesTags`?

`providesTags` is used to mark or "tag" the data fetched by a query so that the cache can be invalidated when the data is updated or deleted. This allows Redux to automatically refetch the data if necessary, keeping your UI in sync with the backend without having to manually manage caching logic.

By associating API results with tags, you can:

- Invalidate or update specific cache entries when mutations (like updates or deletions) occur.
- Automatically refetch data when certain actions take place.

### Example Scenario:

Imagine you have an app that shows posts, and you have an API to **fetch a post by its ID** and another API to **delete a post**.

Whenever a post is deleted, you want the cached data for that post to be invalidated, ensuring that the list of posts or any UI elements depending on that data stay updated.

### Step 1: Fetching a Post with `providesTags`

In this example, we will fetch a post and tag it with its `id`. We will use `providesTags` to associate the post data with a `'Post'` tag and its unique `id` so that it can be easily invalidated later if needed.

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// Define the API
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Your API base URL
  }),
  tagTypes: ["Post"], // Define the 'Post' tag type for cache invalidation
  endpoints: (builder) => ({
    // Fetch a post by its ID
    getPost: builder.query({
      query: (id) => `post/${id}`,
      // Provide a tag based on the post ID
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    // Other endpoints (e.g., mutations) go here
  }),
});

export const { useGetPostQuery } = api;
```

Here:

- **`providesTags: (result, error, id) => [{ type: 'Post', id }]`**: This associates the cached post with a `Post` tag and its unique `id`. So, the post with a particular `id` will be cached and tagged.

### Step 2: Deleting a Post and Invalidating the Cache

Now, let's assume you have an API endpoint that **deletes a post**. When a post is deleted, you want to **invalidate the cached post** so that the UI reflects the deletion (for example, removing the post from a list).

Here’s how you can use **`invalidatesTags`** to automatically invalidate the cached data when a post is deleted:

```js
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    // Define a mutation for deleting a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      // When the post is deleted, invalidate its cache by its ID
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const { useGetPostQuery, useDeletePostMutation } = api;
```

Here:

- **`invalidatesTags: (result, error, id) => [{ type: 'Post', id }]`**: This tells Redux to invalidate the cache for the post with the given `id` whenever the `deletePost` mutation is called. This ensures that any stale data is removed from the cache.

### Step 3: Using the Hooks in Your Components

Now, let’s look at how you would use the generated hooks to **fetch** and **delete** a post in your component.

#### Fetching a Post:

```js
const PostDetails = ({ postId }) => {
  const { data: post, isLoading, error } = useGetPostQuery(postId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};
```

#### Deleting a Post:

```js
const DeletePostButton = ({ postId }) => {
  const [deletePost, { isLoading, error }] = useDeletePostMutation();

  const handleDelete = async () => {
    await deletePost(postId);
    alert("Post deleted!");
  };

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      {isLoading ? "Deleting..." : "Delete Post"}
    </button>
  );
};
```

### How It Works:

- When `useGetPostQuery(postId)` is called, the post data is fetched and tagged with `Post` and its `id`.
- When `useDeletePostMutation(postId)` is called to delete the post, the cache for the post with that `id` is **invalidated** automatically by Redux Toolkit.
- This triggers any component that depends on the post data to **refetch** or remove the stale data from the UI.

### Benefits of `providesTags` and `invalidatesTags`:

1. **Automatic Cache Invalidation**: You don’t need to manually clear or manage the cache; the invalidation happens automatically when mutations occur.
2. **Efficient UI Updates**: The UI stays in sync with the server without needing manual refetching after every operation.
3. **Improved Developer Experience**: Less boilerplate code and more declarative handling of cache updates.

### Summary:

- `providesTags`: Tags cached data with a specific type and identifier (e.g., `'Post'` with a specific `id`).
- `invalidatesTags`: Invalidates cached data when a mutation occurs, ensuring that the cache stays fresh and the UI reflects the latest data.

### 4\. **Lifecycle Methods: `onQueryStarted` and `onCacheEntryAdded`**

Let's explore the **lifecycle methods** `onQueryStarted` and `onCacheEntryAdded` in detail with an example. These methods allow you to perform actions at different stages of a query's lifecycle.

### Lifecycle Methods Overview:

- **`onQueryStarted`**: This runs when a query starts (before the network request is made). It's often used for **optimistic updates** (updating the UI before the server responds).
- **`onCacheEntryAdded`**: This runs when a new cache entry is created or added. It’s useful for handling real-time updates, listening to WebSocket events, or running cleanup logic when a cache is removed.

---

### Example Scenario:

Imagine you are building a to-do app. When the user creates a new to-do item, you want to:

- **Optimistically update** the UI to show the new to-do item immediately, before the server confirms the action.
- **Remove the cached entry** if it becomes outdated (e.g., a WebSocket event tells you the list of to-dos has changed on another device).

### Step 1: Defining the API

Here, we define a query to fetch the to-dos and a mutation to add a new to-do.

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const todoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      // Optimistic update using onQueryStarted
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        // Optimistically update the cache with the new to-do
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draftTodos) => {
            draftTodos.push(newTodo); // Add new to-do to the list
          })
        );
        try {
          // Wait for the server to confirm the mutation
          await queryFulfilled;
        } catch {
          // If it fails, roll back the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
```

### Step 2: Using `onQueryStarted` for Optimistic Updates

- **Optimistic Update**: Before the server responds, we immediately update the UI to reflect the new to-do item.
- **Rollback**: If the request fails, we roll back the change, ensuring the UI reflects the real state.

#### Explanation of `onQueryStarted`:

- **`newTodo`**: The new to-do item that is being added.
- **`dispatch`**: Redux's `dispatch` function, used to update the store.
- **`queryFulfilled`**: A promise that resolves when the mutation completes successfully. If it rejects, we undo the optimistic update.

#### How it works:

- As soon as the user submits the new to-do, we optimistically update the local cache by pushing the new to-do into the list of existing to-dos.
- If the request to the server succeeds (`queryFulfilled`), the change is confirmed.
- If the request fails (e.g., network error), the rollback mechanism (`patchResult.undo()`) will undo the change.

### Step 3: Handling Cache Updates with `onCacheEntryAdded`

Now let's handle **real-time updates** using `onCacheEntryAdded`. Imagine you have a WebSocket that notifies you when the list of to-dos changes (e.g., another user added a to-do). You want to keep the UI in sync.

```js
getTodos: builder.query({
  query: () => '/todos',
  // Cache entry lifecycle method
  async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
    // Wait for the cache to be loaded
    await cacheDataLoaded;

    // Create a WebSocket connection
    const ws = new WebSocket('ws://example.com/todos');

    // Listen for messages from the WebSocket
    ws.onmessage = (event) => {
      const newTodo = JSON.parse(event.data);

      // Update the cache when a new to-do is received
      updateCachedData((draftTodos) => {
        draftTodos.push(newTodo);
      });
    };

    // Close the WebSocket connection when the cache is no longer needed
    await cacheEntryRemoved;
    ws.close();
  },
}),
```

#### Explanation of `onCacheEntryAdded`:

- **`updateCachedData`**: Allows you to modify the cached data directly (like updating the to-do list when a new to-do is received).
- **`cacheDataLoaded`**: Resolves when the initial cache is loaded.
- **`cacheEntryRemoved`**: Resolves when the cache entry is removed (for example, if the query is no longer in use), allowing you to clean up resources (like closing the WebSocket).

### Step 4: Using These Hooks in Components

#### Fetching To-Dos:

```js
const TodoList = () => {
  const { data: todos, isLoading, error } = useGetTodosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading to-dos.</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};
```

#### Adding a New To-Do (with Optimistic Update):

```js
const AddTodo = () => {
  const [addTodo] = useAddTodoMutation();
  const [newTodo, setNewTodo] = React.useState("");

  const handleSubmit = async () => {
    await addTodo({ text: newTodo });
    setNewTodo(""); // Clear input after submission
  };

  return (
    <div>
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
};
```

### Summary:

- **`onQueryStarted`**: Used for optimistic updates. It allows you to update the cache optimistically (before the server confirms the action) and roll back if the mutation fails.
- **`onCacheEntryAdded`**: Allows you to manage cache lifecycle, such as listening to real-time updates or performing cleanup when the cache entry is removed.

These lifecycle methods provide powerful tools to keep your UI in sync with the server and handle complex scenarios such as optimistic updates and real-time changes.

### 1.Performing Queries with React Hooks

To perform queries with React hooks using **Redux Toolkit Query (RTK Query)**, we can use the automatically generated hooks created when defining API slices in `createApi`. These hooks simplify data fetching, caching, and error handling in your React components.

### Steps to Perform Queries with React Hooks

1. **Define your API with `createApi`.**
2. **Use the generated hooks in your React components** to perform queries and handle data.

### Step 1: Define Your API Slice

First, you need to define an API slice using the `createApi` method. This slice will automatically generate hooks for the queries you define.

Here’s an example where we define a query to fetch posts:

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi", // Unique key for the API slice in the store
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Base URL of your API
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts", // URL endpoint for fetching posts
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`, // Dynamic query to fetch post by ID
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
```

### Step 2: Use the Generated Hooks in Your React Component

Now, you can use the **generated hooks** in your component to fetch data, handle loading states, and manage errors.

#### Example 1: Fetching a List of Posts

Use the `useGetPostsQuery` hook to fetch a list of posts.

```js
import React from "react";
import { useGetPostsQuery } from "./postApi"; // Import the hook generated by RTK Query

const PostsList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(); // Hook to fetch posts

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostsList;
```

- **`useGetPostsQuery()`**: This hook initiates a request to fetch posts. It returns several useful properties like:
  - `data`: The actual data (in this case, the posts).
  - `isLoading`: A boolean indicating whether the query is still in progress.
  - `error`: The error object, if the query failed.

#### Example 2: Fetching a Single Post by ID

You can fetch a single post by using `useGetPostByIdQuery` and passing the `id` as an argument.

```js
import React from "react";
import { useGetPostByIdQuery } from "./postApi"; // Import the hook

const PostDetails = ({ postId }) => {
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId); // Pass postId to the hook

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching post.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetails;
```

In this example:

- **`useGetPostByIdQuery(postId)`**: This hook fetches a specific post by its `id` and provides similar properties (`data`, `isLoading`, `error`).

### Step 3: Handling Loading, Success, and Error States

RTK Query hooks automatically handle the various states of data fetching. You can handle these states like so:

- **Loading**: Show a loading indicator while data is being fetched (`isLoading`).
- **Error**: Show an error message if the query fails (`error`).
- **Success**: Once the data is fetched, render the content (`data`).

#### Example of Handling All States

```js
const PostsList = () => {
  const {
    data: posts,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostsQuery();

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (isSuccess) {
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
  }

  return null; // Fallback if no condition is met
};
```

Here:

- **`isSuccess`**: This boolean is `true` once the data is successfully fetched.
- **`isError`**: This boolean is `true` if the query fails.

### Optional: Refetching Data

If you need to **manually refetch data**, RTK Query provides an option to refetch the data on demand.

#### Example of Manual Refetching

```js
const PostsList = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery(); // refetch function

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={() => refetch()}>Refetch Posts</button>
    </div>
  );
};
```

In this example:

- **`refetch()`**: The `refetch` function is provided by the query hook. It can be called to manually trigger a refetch.

### Summary:

1. **Define your API slice** using `createApi`, specifying your queries.
2. **Use the generated hooks** like `useGetPostsQuery` and `useGetPostByIdQuery` in your React components to fetch data.
3. Handle **loading**, **error**, and **success** states in your component.
4. Optionally, use **`refetch()`** to manually re-fetch data.

This setup helps you handle data fetching declaratively and efficiently with RTK Query and React hooks.

### Explain all 5 query-related hooks:

In **Redux Toolkit Query (RTK Query)**, there are 5 main query-related hooks automatically generated for you when you define an API slice with queries. These hooks provide you with different ways to handle data fetching, caching, and state management in your React components.

Let's dive into each one:

### 1. **`useQuery`**

**Purpose**: This is the most basic hook, used to fetch data from an API and subscribe to the store for updates to the query's data.

- **Example**:

  ```js
  const { data, error, isLoading } = useGetPostsQuery();
  ```

- **Key Properties Returned**:

  - `data`: The fetched data.
  - `error`: The error encountered during the query, if any.
  - `isLoading`: A boolean indicating if the request is still in progress.
  - `isFetching`: A boolean indicating if a new request is in progress (true even when data is already in cache).
  - `isSuccess`: A boolean indicating if the query was successful.
  - `isError`: A boolean indicating if the query failed.

- **Usage**:
  - Used to fetch data on component mount.
  - Automatically refetches data if certain criteria change (e.g., if the query's arguments change).

#### Example:

```js
import React from "react";
import { useGetPostsQuery } from "./postApi";

const PostsList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

### 2. **`useLazyQuery`**

**Purpose**: This hook is similar to `useQuery`, but it gives you more control by allowing you to trigger a query **on-demand** (i.e., it does not run automatically).

- **Example**:

  ```js
  const [trigger, { data, isLoading, error }] = useLazyGetPostByIdQuery();
  ```

- **Key Properties Returned**:

  - `trigger`: A function that you call to initiate the query manually.
  - Other returned values like `data`, `isLoading`, and `error` are similar to `useQuery`.

- **Usage**:
  - Useful when you want to fetch data in response to a user action, such as clicking a button or selecting a value from a dropdown.

#### Example:

```js
import React from "react";
import { useLazyGetPostByIdQuery } from "./postApi";

const PostDetails = () => {
  const [trigger, { data: post, isLoading, error }] = useLazyGetPostByIdQuery();

  const handleFetchPost = (id) => {
    trigger(id); // Trigger the query with a specific post ID
  };

  return (
    <div>
      <button onClick={() => handleFetchPost(1)}>Fetch Post 1</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};
```

### 3. **`useQuerySubscription`**

**Purpose**: This hook is used when you want to subscribe to an existing query without triggering a network request. It allows you to listen for cache updates (like a WebSocket message or an optimistic update) and stay in sync with query data.

- **Usage**:
  - You use this when you don’t want to trigger the query but still want to subscribe to updates from the store or cache.

#### Example:

If you want to subscribe to updates on posts without fetching:

```js
import { useGetPostsQuerySubscription } from "./postApi";

const PostsList = () => {
  const { data: posts } = useGetPostsQuerySubscription();

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

### 4. **`usePrefetch`**

**Purpose**: This hook allows you to prefetch data that you know you’ll need later. This can be done in anticipation of a user navigating to another page or component. It does not immediately store the data but ensures that the data is available when you need it.

- **Example**:

  ```js
  const prefetch = usePrefetch("getPosts");
  ```

- **Key Properties Returned**:

  - `prefetch`: A function that allows you to trigger prefetching of a specific query.

- **Usage**:
  - Prefetching data for better performance, like when the user is about to navigate to a new page.

#### Example:

```js
import React from "react";
import { usePrefetch } from "./postApi";

const PostPreview = () => {
  const prefetchPost = usePrefetch("getPostById");

  return (
    <div>
      <button
        onMouseEnter={() => prefetchPost(1)} // Prefetch post 1 when the button is hovered
      >
        View Post 1
      </button>
    </div>
  );
};
```

- **Note**: In this example, when the user hovers over the button, the `getPostById(1)` query is prefetched so that it's ready to display when needed.

### 5. **`useQueryState`**

**Purpose**: This hook allows you to **read the state** of a query from the cache without triggering a network request. This is helpful when you only need access to the cached query data and don’t want to re-fetch it.

- **Usage**:
  - Used when you want to check the current state of a query in the cache.

#### Example:

```js
import React from "react";
import { useGetPostsQueryState } from "./postApi";

const CachedPostsList = () => {
  const { data: posts } = useGetPostsQueryState(); // Access cached data

  if (!posts) return <p>No cached data available</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

### Summary of All Hooks:

| Hook                   | Purpose                                                       | When to Use                                                                      |
| ---------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `useQuery`             | Fetch data and manage loading/error states automatically.     | To automatically fetch data when the component mounts.                           |
| `useLazyQuery`         | Trigger a query manually on demand.                           | When you want to fetch data only after a user action (like a button click).      |
| `useQuerySubscription` | Subscribe to updates without making a new query.              | When you want to listen for data changes but avoid triggering a network request. |
| `usePrefetch`          | Prefetch data for future use (e.g., for performance reasons). | Prefetch data when the user is likely to navigate to a new page or component.    |
| `useQueryState`        | Read cached data without triggering a network request.        | When you want to access the query state from the cache.                          |

These hooks provide a wide variety of ways to work with queries in React, allowing you to control how and when data is fetched or used. Each hook offers flexibility for specific use cases like on-demand fetching, subscription, prefetching, or accessing cached state.
