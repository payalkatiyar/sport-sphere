import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 })
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // your Gmail address
        pass: process.env.SMTP_PASS, // your Gmail app password
      },
    })

    // Email options
    const mailOptions = {
      from: `SportSphere Contact <${process.env.SMTP_USER}>`,
      to: 'payalkatiyar19500@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    }

    // Send email
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 })
  }
} 