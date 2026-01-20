/**
 * Generates a beautiful HTML email template for RFQ confirmation
 * @param {Object} rfq - The RFQ object containing details
 * @param {string} userName - The name of the user
 * @returns {string} HTML string
 */
export const generateRfqEmailTemplate = (rfq, userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #ea580c; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #111827; margin-bottom: 20px; font-weight: 600; }
        .message { color: #4b5563; line-height: 1.6; margin-bottom: 30px; }
        .card { background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 20px; margin-bottom: 30px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #fed7aa; }
        .row:last-child { border-bottom: none; }
        .label { color: #9a3412; font-size: 14px; font-weight: 600; text-transform: uppercase; }
        .value { color: #1f2937; font-weight: 500; text-align: right; }
        .cta-button { display: block; width: 100%; padding: 16px 0; background-color: #ea580c; color: #ffffff; text-decoration: none; text-align: center; border-radius: 8px; font-weight: 700; font-size: 16px; transition: background-color 0.2s; }
        .cta-button:hover { background-color: #c2410c; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>KarLink</h1>
        </div>
        <div class="content">
          <div class="greeting">Hi ${userName},</div>
          <p class="message">
            Your Request for Quotation (RFQ) has been successfully posted! 
            Vendors will now be able to see your requirements and place bids.
          </p>
          
          <div class="card">
            <div class="row">
              <span class="label">Title</span>
              <span class="value">${rfq.title}</span>
            </div>
            <div class="row">
              <span class="label">Category</span>
              <span class="value" style="text-transform: capitalize;">${rfq.category}</span>
            </div>
            <div class="row">
              <span class="label">Quantity</span>
              <span class="value">${rfq.quantity} ${rfq.unit}</span>
            </div>
            <div class="row">
              <span class="label">Budget</span>
              <span class="value">₹${rfq.budget || "Negotiable"}</span>
            </div>
            <div class="row">
              <span class="label">Deadline</span>
              <span class="value">${new Date(rfq.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <a href="${process.env.VITE_APP_URL || "#"}/your-rfqs" class="cta-button">View Your RFQ</a>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} KarLink. All rights reserved.<br>
          Connecting businesses, simplified.
        </div>
      </div>
    </body>
    </html>
    `;
};
