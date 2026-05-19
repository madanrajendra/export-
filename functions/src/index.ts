import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * On Enquiry Created:
 * 1. Sends email notification to Admin.
 * 2. Sends confirmation email to Customer.
 */
export const onEnquiryCreated = functions.firestore
  .document("enquiries/{enquiryId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const id = context.params.enquiryId;

    const adminEmail = {
      from: "GE Solutions Bot",
      to: process.env.ADMIN_EMAIL,
      subject: `[New Lead] Export Enquiry Ref# ${id}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #f8fafc;">
          <h2 style="color: #0f172a;">New Export Enquiry Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Country:</strong> ${data.country || "Not specified"}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <hr/>
          <p><a href="https://yourdomain.com/admin/enquiries">View in Admin Panel</a></p>
        </div>
      `,
    };

    const userEmail = {
      from: "Global Export Solutions",
      to: data.email,
      subject: "Acknowledgment: Your Export Enquiry is being processed",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border-top: 4px solid #b45309;">
          <h2 style="color: #0f172a;">Hello ${data.name},</h2>
          <p>Thank you for reaching out to Global Export Solutions. Our team has received your inquiry regarding <strong>${data.relatedItemType || "international trade"}</strong>.</p>
          <p>An export specialist will analyze your requirements and contact you within 24 business hours.</p>
          <br/>
          <p>Best regards,<br/>Trade Operations Team</p>
        </div>
      `,
    };

    try {
      await Promise.all([
        transporter.sendMail(adminEmail),
        transporter.sendMail(userEmail),
      ]);
      console.log(`Success: Emails sent for enquiry ${id}`);
    } catch (error) {
      console.error(`Error sending emails for enquiry ${id}:`, error);
    }
  });

/**
 * Chatbot Logic:
 * HTTPS Callable for AI responses with Firestore knowledge lookup.
 * Integrates OpenAI/Gemini securely (API keys on backend).
 */
export const getChatbotResponse = functions.https.onCall(async (data, context) => {
  const { message } = data;
  
  if (!message) {
    throw new functions.https.HttpsError("invalid-argument", "Query is required");
  }

  // 1. Search Firestore knowledge base (Optional Simple lookup)
  // const knowledgeRef = admin.firestore().collection("chatbotKnowledge");
  // const matches = await knowledgeRef.where("question", "==", message).get();
  
  // 2. Wrap AI call (OpenAI Example Placeholder)
  // const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', { ... }, { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` } });

  return {
    response: "Thank you for your inquiry about international trade. Our export guidelines recommend consulting our compliance board for specific certifications. How else can I assist?",
    suggestedActions: ["View Compliance", "Product Specs"]
  };
});
