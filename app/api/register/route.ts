import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, userType } = await req.json()

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.uSERS.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // In a real app, you'd hash the password
    // const hashedPassword = await hash(password, 10);
    const hashedPassword = password // For simplicity in this example

    // Generate a unique user ID
    const userId = `u${Math.floor(Math.random() * 1000000)}`

    // Create the user
    const user = await prisma.uSERS.create({
      data: {
        user_id: userId,
        name,
        email,
        password: hashedPassword,
        user_type: userType,
        status: "Active",
      },
    })

    // Return success without exposing sensitive data
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
