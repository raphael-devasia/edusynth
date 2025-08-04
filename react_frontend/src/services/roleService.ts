import axios from 'axios';

export async function getRoles() {
  const res = await axios.get('/api/roles');
  return res.data;
}
