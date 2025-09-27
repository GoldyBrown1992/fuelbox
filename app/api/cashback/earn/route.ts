export async function POST(req: NextRequest) {
  const { phone, amount, orderId } = await req.json()
  
  // Find/create user
  // Add cashback transaction
  // Update balance
  // Return success
}
