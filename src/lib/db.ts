import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  author: string;
  views: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinkedin: string;
  socialGithub: string;
}

interface DatabaseSchema {
  posts: BlogPost[];
  services: ServiceItem[];
  contacts: ContactMessage[];
  settings?: SiteSettings;
}

const dbPath = path.join(process.cwd(), 'src/data/db.json');

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      // Create with default empty structure if it doesn't exist
      const defaultDb: DatabaseSchema = { posts: [], services: [], contacts: [] };
      fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading database file:', error);
    return { posts: [], services: [], contacts: [] };
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Blog Post helpers
export async function getPosts(): Promise<BlogPost[]> {
  const db = readDb();
  // Sort posts by date descending
  return db.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = readDb();
  const post = db.posts.find(p => p.slug === slug);
  if (post) {
    // Increment view count asynchronously/mutatively
    post.views = (post.views || 0) + 1;
    writeDb(db);
    return post;
  }
  return null;
}

export async function savePost(post: Omit<BlogPost, 'id' | 'views'> & { id?: string }): Promise<BlogPost> {
  const db = readDb();
  let existingIndex = -1;
  let finalPost: BlogPost;

  if (post.id) {
    existingIndex = db.posts.findIndex(p => p.id === post.id);
  }

  if (existingIndex > -1) {
    const existing = db.posts[existingIndex];
    finalPost = {
      ...existing,
      ...post,
      id: existing.id,
      views: existing.views || 0
    };
    db.posts[existingIndex] = finalPost;
  } else {
    finalPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      views: 0
    };
    db.posts.push(finalPost);
  }

  writeDb(db);
  return finalPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.posts.length;
  db.posts = db.posts.filter(p => p.id !== id);
  if (db.posts.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Service catalog helpers
export async function getServices(): Promise<ServiceItem[]> {
  const db = readDb();
  return db.services;
}

export async function saveService(service: ServiceItem): Promise<ServiceItem> {
  const db = readDb();
  const index = db.services.findIndex(s => s.id === service.id);
  if (index > -1) {
    db.services[index] = service;
  } else {
    db.services.push(service);
  }
  writeDb(db);
  return service;
}

// Contact messages helpers
export async function getContacts(): Promise<ContactMessage[]> {
  const db = readDb();
  // Sort by date descending
  return db.contacts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function saveContact(msg: Omit<ContactMessage, 'id' | 'date' | 'read'>): Promise<ContactMessage> {
  const db = readDb();
  const newMsg: ContactMessage = {
    ...msg,
    id: `contact-${Date.now()}`,
    date: new Date().toISOString(),
    read: false
  };
  db.contacts.push(newMsg);
  writeDb(db);
  return newMsg;
}

export async function markContactAsRead(id: string, read = true): Promise<boolean> {
  const db = readDb();
  const msg = db.contacts.find(c => c.id === id);
  if (msg) {
    msg.read = read;
    writeDb(db);
    return true;
  }
  return false;
}

export async function deleteContact(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.contacts.length;
  db.contacts = db.contacts.filter(c => c.id !== id);
  if (db.contacts.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Service deletion
export async function deleteService(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.services.length;
  db.services = db.services.filter(s => s.id !== id);
  if (db.services.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Site Settings helpers
export async function getSettings(): Promise<SiteSettings> {
  const db = readDb();
  if (!db.settings) {
    db.settings = {
      siteTitle: "Binary Infotech",
      siteTagline: "Engineering Digital Excellence",
      contactEmail: "binarytechinfo@gmail.com",
      contactPhone: "+91 90999 76868",
      contactAddress: "402, SNS Platina, Vesu, Surat, Gujarat - 395007",
      socialLinkedin: "https://linkedin.com/company/binary-infotech",
      socialGithub: "https://github.com/binary-infotech"
    };
    writeDb(db);
  }
  return db.settings;
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  const db = readDb();
  db.settings = settings;
  writeDb(db);
  return settings;
}
