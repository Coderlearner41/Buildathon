import { NextResponse } from "next/server";

// Mock in-memory storage (replace with DB later)
let customers: any[] = [];
let policies: any[] = [];
let claims: any[] = [];

// GET → /api/customers (Dashboard Customers)
export async function GET() {
  return NextResponse.json({
    message: "Dashboard Customers fetched successfully",
    customers,
  });
}

// POST → /api/customers (Add Customer)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCustomer = {
      id: Date.now(),
      ...body,
    };
    customers.push(newCustomer);

    return NextResponse.json({
      message: "Customer added successfully",
      customer: newCustomer,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add customer" },
      { status: 400 }
    );
  }
}

// PUT → /api/customers/policy (Add Policy)
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const body = await req.json();

  if (pathname.endsWith("/policy")) {
    const newPolicy = { id: Date.now(), ...body };
    policies.push(newPolicy);

    return NextResponse.json({
      message: "Policy added successfully",
      policy: newPolicy,
    });
  }

  if (pathname.endsWith("/claim")) {
    const newClaim = { id: Date.now(), ...body };
    claims.push(newClaim);

    return NextResponse.json({
      message: "Claim added successfully",
      claim: newClaim,
    });
  }

  return NextResponse.json({ error: "Invalid PUT route" }, { status: 404 });
}
