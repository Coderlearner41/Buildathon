export interface Policy {
  policyNumber: string;
  insuranceCompany: string;
  policyType: string;
  premium?: number;
  policyName?: string;
  startDate?: string;
  renewalDate?: string;
  nomineeName: string;
  relation: string;
  nomineeContact?: string;
  claim?: boolean;
  status?: "Submission" | "Verification" | "Approval" | "Settle";
}

export interface Customer {
  name: string;
  contact: string;
  alternateContact?: string;
  mailId: string;
  birthDate: string;
  gender: string;
  policy: Policy[];
}

export interface RenewalResult {
  name: string;
  contact: string;
  mailId: string;
  nextRenewalIn: number;
}

export interface ClaimUpdate {
  mailId: string;
  policy_name: string;
  status: "Submission" | "Verification" | "Approval" | "Settle";
}

export interface IPolicy {
  policyNumber: string;
  insuranceCompany: string;
  policyType: string;
  premium?: number;
  policyName?: string;
  startDate?: string;
  renewalDate?: string;
  nomineeName: string;
  relation: string;
  nomineeContact?: string;
  claim?: boolean;
  status?: "Submission" | "Verification" | "Approval" | "Settle";
}

// Example from your provided code
export interface ICustomer {
  name: string;
  contact: string;
  mailId: string;
  policyNumber: string; // Added policyNumber field
  preminum: string; // Added premium field
  nextRenewalIn?: number;
  policy?: { status: string }[];  // make optional
}


export interface RenewalResult {
  name: string;
  policyNumber: string;
  premium: number;
  daysUntilRenewal: number;
  contact: string;
  mailId: string;
  policies: IPolicy[];
}

