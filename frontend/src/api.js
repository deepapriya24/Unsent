const BASE_URL = "http://localhost:5000";

export async function fetchMessages() {
  const res = await fetch(`${BASE_URL}/messages`);
  if (!res.ok) throw new Error('Could not reach the quiet place.');
  return res.json();
}

export async function createMessage(name, content) {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, content }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Something went quiet on our end.');
  }
  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${BASE_URL}/messages/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Could not let it go just yet.');
  return res.json();
}
