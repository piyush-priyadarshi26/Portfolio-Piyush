import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Configurable file storage paths
const getStoragePaths = async () => {
  const isVercel = !!process.env.VERCEL;
  // Use os.tmpdir() on Vercel to avoid EROFS (Read-only file system)
  // Use local 'data' directory in development for easy inspection
  const baseDir = isVercel ? os.tmpdir() : path.join(process.cwd(), 'data');
  
  try {
    await fs.mkdir(baseDir, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }
  
  return {
    visitsPath: path.join(baseDir, 'visits.json'),
    contactsPath: path.join(baseDir, 'contact_messages.json'),
  };
};

// Check if Vercel KV is configured
const isKvConfigured = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Vercel KV REST helpers
const kvFetch = async (command: string[]) => {
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  
  if (!res.ok) {
    throw new Error(`Vercel KV error: ${res.statusText}`);
  }
  
  const data = await res.json();
  return data.result;
};

export interface ContactMessage {
  timestamp: string;
  name: string;
  email: string;
  message: string;
}

export const storage = {
  async getVisits(): Promise<number> {
    if (isKvConfigured()) {
      try {
        const val = await kvFetch(['GET', 'total_visits']);
        return val ? parseInt(val, 10) : 0;
      } catch (err) {
        console.error('Vercel KV getVisits failed, falling back to file.', err);
      }
    }
    
    // File fallback
    const { visitsPath } = await getStoragePaths();
    try {
      const data = await fs.readFile(visitsPath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.total_visits || 0;
    } catch {
      return 0;
    }
  },

  async incrementVisits(): Promise<number> {
    if (isKvConfigured()) {
      try {
        const val = await kvFetch(['INCR', 'total_visits']);
        return typeof val === 'number' ? val : parseInt(val, 10);
      } catch (err) {
        console.error('Vercel KV incrementVisits failed, falling back to file.', err);
      }
    }

    // File fallback
    const { visitsPath } = await getStoragePaths();
    let totalVisits = 0;
    try {
      const data = await fs.readFile(visitsPath, 'utf-8');
      const parsed = JSON.parse(data);
      totalVisits = parsed.total_visits || 0;
    } catch {
      // file doesn't exist yet
    }
    
    totalVisits += 1;
    await fs.writeFile(visitsPath, JSON.stringify({ total_visits: totalVisits }, null, 2), 'utf-8');
    return totalVisits;
  },

  async saveContactMessage(msg: Omit<ContactMessage, 'timestamp'>): Promise<void> {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const message: ContactMessage = {
      timestamp,
      ...msg,
    };

    if (isKvConfigured()) {
      try {
        await kvFetch(['LPUSH', 'contact_messages', JSON.stringify(message)]);
        return;
      } catch (err) {
        console.error('Vercel KV saveContactMessage failed, falling back to file.', err);
      }
    }

    // File fallback
    const { contactsPath } = await getStoragePaths();
    let messages: ContactMessage[] = [];
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      messages = JSON.parse(data);
    } catch {
      // file doesn't exist yet
    }

    messages.push(message);
    await fs.writeFile(contactsPath, JSON.stringify(messages, null, 2), 'utf-8');
  }
};
