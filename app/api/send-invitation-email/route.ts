// app/api/send-invitation-email/route.js
// This is the Next.js 13+ App Router API route

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, guestType, partnerName, attendance } = data;

    // Configure email transporter
    // Using Gmail as an example - you'll need to set up app-specific password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // App-specific password
      },
    });

    // Determine if acceptance or decline
    const isAcceptance = attendance === 'accept';
    
    // Email content for acceptance
    const guestInfo = guestType === 'couple' 
      ? `${name} and ${partnerName} (Couple)`
      : `${name} (Single)`;

    // Different email templates based on response
    const mailOptions = isAcceptance ? {
      from: process.env.EMAIL_USER,
      to: 'denis.bsm1@gmail.com',
      subject: '✅ New RSVP: Apostles Celebration - ACCEPTED',
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
              background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 30px;
              background-color: #dcfce7;
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
              color: #16a34a;
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
              <h1>🎉 Great News!</h1>
              <p>Someone has ACCEPTED your invitation</p>
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
                <p><strong>Apostles Celebration | November 1st, 2025</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        ✅ New RSVP ACCEPTANCE - Apostles Celebration
        
        Guest Name(s): ${guestInfo}
        Email: ${email}
        Attendance Type: ${guestType === 'couple' ? 'Attending as Couple' : 'Attending Solo'}
        
        Event Date: November 1st, 2025
      `
    } : {
      from: process.env.EMAIL_USER,
      to: 'denis.bsm1@gmail.com',
      subject: '❌ New RSVP: Apostles Celebration - DECLINED',
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
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 30px;
              background-color: #fee2e2;
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
              color: #dc2626;
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
              <h1>📋 RSVP Update</h1>
              <p>Someone has DECLINED your invitation</p>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="label">Guest Name:</div>
                <div class="value">${name}</div>
                
                <div class="label">Email:</div>
                <div class="value">${email}</div>
                
                <div class="label">Response:</div>
                <div class="value">Unable to attend</div>
              </div>
              
              <div class="footer">
                <p><strong>Apostles Celebration | November 1st, 2025</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        ❌ New RSVP DECLINE - Apostles Celebration
        
        Guest Name: ${name}
        Email: ${email}
        Response: Unable to attend
        
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