// app/api/send-invitation-email/route.js
// This is the Next.js 13+ App Router API route

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, guestType, partnerName } = data;

    // Configure email transporter
    // Using Gmail as an example - you'll need to set up app-specific password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // App-specific password
      },
    });

    // Email content
    const guestInfo = guestType === 'couple' 
      ? `${name} and ${partnerName} (Couple)`
      : `${name} (Single)`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'denis.bsm1@gmail.com',
      subject: '✨ New RSVP: Apostles Celebration Acceptance',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            .header {
              background: linear-gradient(135deg, #d97706 0%, #ea580c 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 30px;
              background-color: #fef3c7;
              border-radius: 0 0 8px 8px;
            }
            .info-box {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .label {
              font-weight: bold;
              color: #d97706;
              margin-bottom: 5px;
            }
            .value {
              font-size: 18px;
              color: #333;
              margin-bottom: 15px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Acceptance!</h1>
              <p>Someone has accepted your invitation</p>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="label">Guest Name(s):</div>
                <div class="value">${guestInfo}</div>
                
                <div class="label">Email:</div>
                <div class="value">${email}</div>
                
                <div class="label">Attendance Type:</div>
                <div class="value">${guestType === 'couple' ? 'Attending as Couple' : 'Attending Solo'}</div>
              </div>
              
              <div class="footer">
                <p>Apostles Celebration | November 1st, 2025</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New RSVP Acceptance - Apostles Celebration
        
        Guest Name(s): ${guestInfo}
        Email: ${email}
        Attendance Type: ${guestType === 'couple' ? 'Attending as Couple' : 'Attending Solo'}
        
        Event Date: November 1st, 2025
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}