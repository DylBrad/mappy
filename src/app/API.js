const API_URL = 'http://localhost:1337';

// Map log entries

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

// User Posts

export async function createUserPost(post) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function listPosts(filter) {
  const response = await fetch(`${API_URL}/api/posts`);
  return response.json();
}

// this
export async function listCurrentUserPosts(id) {
  const response = await fetch(
    `${API_URL}/api/posts/current-users-posts/?_id=${id}`,
  );
  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      _id: postId,
    }),
  });
  return response.json();
}

// User creation / authentication

export async function createUser(user) {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  console.log('response is', response.json);
  return response.json();
}

export async function loginUser(user) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function updateUserProfile(id, data) {
  const response = await fetch(`${API_URL}/api/users/?_id=${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function findOneUser(id) {
  const response = await fetch(`${API_URL}/api/users/?_id=${id}`);
  return response.json();
}
