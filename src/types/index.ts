export type ProductType = 'Corporate Account' | 'Trade Finance' | 'FX' | 'Loans';
export type RiskTier = 'Low' | 'Medium' | 'High';
export type CaseStatus =
  | 'Draft'
  | 'IntakeValidated'
  | 'WaitingForEvidence'
  | 'InReview'
  | 'Exception'
  | 'Approved'
  | 'Rejected'
  | 'Closed'
  | 'Reopened';
export type DocStatus = 'Pending' | 'Received' | 'Rejected' | 'Expired';
export type HitSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface LegalEntity {
  entityId: string;
  registeredName: string;
  jurisdiction: string;
  registrationNumber: string;
  industry: string;
}

export interface BeneficialOwner {
  ownerId: string;
  name: string;
  ownershipPercent: number;
  nationality: string;
}

export interface DocumentRequirement {
  requirementId: string;
  docType: string;
  mandatory: boolean;
  status: DocStatus;
}

export interface SubmittedDocument {
  documentId: string;
  docType: string;
  fileName: string;
  status: DocStatus;
  submittedAt: string;
  expiryDate?: string;
  notes?: string;
}

export interface ScreeningHit {
  hitId: string;
  source: string;
  matchedName: string;
  severity: HitSeverity;
  description: string;
  status: 'Open' | 'Cleared' | 'Escalated';
}

export interface CaseEvent {
  eventId: string;
  eventType: string;
  timestamp: string;
  actor: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface ReviewDecision {
  decisionId: string;
  decision: 'Approved' | 'Rejected' | 'Exception';
  rationale: string;
  decidedBy: string;
  decidedAt: string;
}

export interface OnboardingCase {
  caseId: string;
  legalEntity: LegalEntity;
  productType: ProductType;
  riskTier: RiskTier;
  status: CaseStatus;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  beneficialOwners: BeneficialOwner[];
  documentRequirements: DocumentRequirement[];
  submittedDocuments: SubmittedDocument[];
  screeningHits: ScreeningHit[];
  events: CaseEvent[];
  decision?: ReviewDecision;
}
