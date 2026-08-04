"use server";

import { cookies } from "next/headers";
import { 
  saveContact, 
  savePost, 
  deletePost, 
  markContactAsRead, 
  deleteContact,
  BlogPost,
  saveService,
  deleteService,
  saveSettings,
  ServiceItem,
  SiteSettings
} from "@/lib/db";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

// Admin Authentication Configuration (fallback defaults if .env.local isn't set)
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_COOKIE_NAME = "binary_admin_session";

// Server action to handle public contact form submissions
export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    await saveContact({
      name,
      email,
      subject,
      message
    });

    // Send email notification to Hostinger mailbox if password is configured
    const hostingerEmail = process.env.HOSTINGER_EMAIL || "info@binaries.org.in";
    const hostingerPassword = process.env.HOSTINGER_PASSWORD;

    if (hostingerPassword) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.hostinger.com",
          port: 465,
          secure: true,
          auth: {
            user: hostingerEmail,
            pass: hostingerPassword
          },
          connectionTimeout: 10000,
          socketTimeout: 10000
        });

        const mailContent = `You have received a new contact form inquiry from your website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Date: ${new Date().toLocaleString()}

Message:
${message}`;

        await transporter.sendMail({
          from: `"Website Contact Form" <${hostingerEmail}>`,
          to: hostingerEmail,
          subject: `New Inquiry: ${subject}`,
          text: mailContent,
          replyTo: email
        });
        
        console.log(`Successfully dispatched SMTP email notification for inquiry from ${email}`);
      } catch (smtpErr) {
        console.error("Failed to send contact SMTP email notification:", smtpErr);
        // Do not return error, let page save succeed
      }
    } else {
      console.warn("HOSTINGER_PASSWORD not set in .env, skipping outbound SMTP notification email");
    }

    // Revalidate paths so the admin panel updates its message counters immediately
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/contacts");

    return { success: true, error: null };
  } catch (err: any) {
    console.error("Submit contact form error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

// Admin login action
export async function loginAdmin(prevState: any, formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, error: "Please fill in all fields." };
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Set session cookie (simple token)
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, "authorized-session-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return { success: true, redirect: "/admin/dashboard" };
    }

    return { success: false, error: "Invalid username or password." };
  } catch (err) {
    console.error("Login admin error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

// Admin logout action
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return { success: true };
}

// Check if authenticated (utility helper, not direct action)
export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === "authorized-session-token";
}

// Admin save post action
export async function saveBlogPost(postData: Omit<BlogPost, 'id' | 'views' | 'slug'> & { id?: string; slug?: string }) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  if (!postData.title || !postData.content || !postData.summary) {
    return { success: false, error: "Title, content, and summary are required." };
  }

  // Generate slug from title if not provided
  const slug = postData.slug || postData.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const saved = await savePost({
    ...postData,
    slug
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blogs");

  return { success: true, post: saved };
}

// Admin delete post action
export async function deleteBlogPost(id: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const success = await deletePost(id);
  
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");

  return { success };
}

// Admin mark message as read/unread
export async function markContactReadState(id: string, read: boolean) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const success = await markContactAsRead(id, read);
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/contacts");
  return { success };
}

// Admin delete message
export async function deleteContactMessage(id: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const success = await deleteContact(id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/contacts");
  return { success };
}

// Service actions
export async function saveServiceAction(service: ServiceItem) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const result = await saveService(service);
  revalidatePath("/");
  revalidatePath("/service");
  return { success: true, service: result };
}

export async function deleteServiceAction(id: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const success = await deleteService(id);
  revalidatePath("/");
  revalidatePath("/service");
  return { success };
}

// Site Settings actions
export async function saveSiteSettingsAction(settings: SiteSettings) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const result = await saveSettings(settings);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { success: true, settings: result };
}
