import {
  OnboardingCase,
  CaseStatus,
  CaseEvent,
  SubmittedDocument,
} from '@/types';

let _idCounter = 1000;
let _caseCounter = 5; // starts after seed data (KYC-001 through KYC-005)
function nextId(): string {
  return String(++_idCounter);
}
function nextCaseId(): string {
  return `KYC-${String(++_caseCounter).padStart(3, '0')}`;
}

const STATUS_TRANSITIONS: Record<CaseStatus, CaseStatus | null> = {
  Draft: 'IntakeValidated',
  IntakeValidated: 'WaitingForEvidence',
  WaitingForEvidence: 'InReview',
  InReview: 'Approved',
  Exception: 'Closed',
  Approved: 'Closed',
  Rejected: 'Closed',
  Closed: 'Reopened',
  Reopened: null,
};

const cases: OnboardingCase[] = [
  {
    caseId: 'KYC-001',
    legalEntity: {
      entityId: 'LE-001',
      registeredName: 'Acme Corporation Ltd',
      jurisdiction: 'United Kingdom',
      registrationNumber: 'GB12345678',
      industry: 'Manufacturing',
    },
    productType: 'Trade Finance',
    riskTier: 'High',
    status: 'InReview',
    assignedTo: 'Sarah Chen',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    beneficialOwners: [
      {
        ownerId: 'BO-001',
        name: 'James Acme',
        ownershipPercent: 60,
        nationality: 'British',
      },
      {
        ownerId: 'BO-002',
        name: 'Claire Watson',
        ownershipPercent: 40,
        nationality: 'British',
      },
    ],
    documentRequirements: [
      {
        requirementId: 'REQ-001',
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-002',
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-003',
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-004',
        docType: 'Financial Statements',
        mandatory: false,
        status: 'Received',
      },
      {
        requirementId: 'REQ-005',
        docType: 'Ownership Structure Chart',
        mandatory: true,
        status: 'Received',
      },
    ],
    submittedDocuments: [
      {
        documentId: 'DOC-001',
        docType: 'Certificate of Incorporation',
        fileName: 'acme_cert_inc.pdf',
        status: 'Received',
        submittedAt: '2024-01-12T10:00:00Z',
        expiryDate: '2030-01-01T00:00:00Z',
      },
      {
        documentId: 'DOC-002',
        docType: 'Articles of Association',
        fileName: 'acme_articles.pdf',
        status: 'Received',
        submittedAt: '2024-01-12T10:05:00Z',
      },
      {
        documentId: 'DOC-003',
        docType: 'Proof of Address',
        fileName: 'acme_address_proof.pdf',
        status: 'Received',
        submittedAt: '2024-01-13T11:00:00Z',
        expiryDate: '2025-01-13T00:00:00Z',
      },
      {
        documentId: 'DOC-004',
        docType: 'Ownership Structure Chart',
        fileName: 'acme_ownership.pdf',
        status: 'Received',
        submittedAt: '2024-01-14T09:30:00Z',
      },
    ],
    screeningHits: [
      {
        hitId: 'HIT-001',
        source: 'World-Check',
        matchedName: 'James Acme',
        severity: 'Medium',
        description: 'Potential PEP match — former local government official',
        status: 'Open',
      },
    ],
    events: [
      {
        eventId: 'EVT-001',
        eventType: 'CaseCreated',
        timestamp: '2024-01-10T09:00:00Z',
        actor: 'system',
        description: 'Case KYC-001 created for Acme Corporation Ltd',
      },
      {
        eventId: 'EVT-002',
        eventType: 'StatusChanged',
        timestamp: '2024-01-10T09:05:00Z',
        actor: 'Sarah Chen',
        description: 'Status advanced from Draft to IntakeValidated',
      },
      {
        eventId: 'EVT-003',
        eventType: 'StatusChanged',
        timestamp: '2024-01-11T10:00:00Z',
        actor: 'Sarah Chen',
        description: 'Status advanced from IntakeValidated to WaitingForEvidence',
      },
      {
        eventId: 'EVT-004',
        eventType: 'DocumentReceived',
        timestamp: '2024-01-12T10:00:00Z',
        actor: 'client-portal',
        description: 'Certificate of Incorporation received',
      },
      {
        eventId: 'EVT-005',
        eventType: 'ScreeningHitRaised',
        timestamp: '2024-01-15T08:00:00Z',
        actor: 'screening-engine',
        description: 'PEP match identified for James Acme',
      },
      {
        eventId: 'EVT-006',
        eventType: 'StatusChanged',
        timestamp: '2024-01-20T14:30:00Z',
        actor: 'Sarah Chen',
        description: 'Status advanced from WaitingForEvidence to InReview',
      },
    ],
  },
  {
    caseId: 'KYC-002',
    legalEntity: {
      entityId: 'LE-002',
      registeredName: 'Beta Financial Ltd',
      jurisdiction: 'Ireland',
      registrationNumber: 'IE98765432',
      industry: 'Financial Services',
    },
    productType: 'Corporate Account',
    riskTier: 'Medium',
    status: 'WaitingForEvidence',
    assignedTo: 'Michael Torres',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-17T09:00:00Z',
    beneficialOwners: [
      {
        ownerId: 'BO-003',
        name: 'Liam O\'Brien',
        ownershipPercent: 51,
        nationality: 'Irish',
      },
      {
        ownerId: 'BO-004',
        name: 'Sinead Murphy',
        ownershipPercent: 49,
        nationality: 'Irish',
      },
    ],
    documentRequirements: [
      {
        requirementId: 'REQ-006',
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-007',
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-008',
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-009',
        docType: 'Director ID Documents',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-010',
        docType: 'Bank Reference Letter',
        mandatory: false,
        status: 'Pending',
      },
    ],
    submittedDocuments: [
      {
        documentId: 'DOC-005',
        docType: 'Certificate of Incorporation',
        fileName: 'beta_cert_inc.pdf',
        status: 'Received',
        submittedAt: '2024-01-16T14:00:00Z',
      },
    ],
    screeningHits: [],
    events: [
      {
        eventId: 'EVT-007',
        eventType: 'CaseCreated',
        timestamp: '2024-01-15T11:00:00Z',
        actor: 'system',
        description: 'Case KYC-002 created for Beta Financial Ltd',
      },
      {
        eventId: 'EVT-008',
        eventType: 'StatusChanged',
        timestamp: '2024-01-16T09:00:00Z',
        actor: 'Michael Torres',
        description: 'Status advanced from Draft to IntakeValidated',
      },
      {
        eventId: 'EVT-009',
        eventType: 'StatusChanged',
        timestamp: '2024-01-17T09:00:00Z',
        actor: 'Michael Torres',
        description: 'Status advanced from IntakeValidated to WaitingForEvidence',
      },
      {
        eventId: 'EVT-010',
        eventType: 'DocumentReceived',
        timestamp: '2024-01-16T14:00:00Z',
        actor: 'client-portal',
        description: 'Certificate of Incorporation received',
      },
    ],
  },
  {
    caseId: 'KYC-003',
    legalEntity: {
      entityId: 'LE-003',
      registeredName: 'Gamma International Inc',
      jurisdiction: 'Cayman Islands',
      registrationNumber: 'CI55544433',
      industry: 'Investment',
    },
    productType: 'FX',
    riskTier: 'High',
    status: 'Exception',
    assignedTo: 'Rachel Kim',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
    beneficialOwners: [
      {
        ownerId: 'BO-005',
        name: 'Victor Petrov',
        ownershipPercent: 75,
        nationality: 'Russian',
      },
      {
        ownerId: 'BO-006',
        name: 'Maria Santos',
        ownershipPercent: 15,
        nationality: 'Brazilian',
      },
      {
        ownerId: 'BO-007',
        name: 'Chen Wei',
        ownershipPercent: 10,
        nationality: 'Chinese',
      },
    ],
    documentRequirements: [
      {
        requirementId: 'REQ-011',
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-012',
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-013',
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-014',
        docType: 'Source of Funds Declaration',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-015',
        docType: 'Enhanced Due Diligence Report',
        mandatory: true,
        status: 'Pending',
      },
    ],
    submittedDocuments: [
      {
        documentId: 'DOC-006',
        docType: 'Certificate of Incorporation',
        fileName: 'gamma_cert_inc.pdf',
        status: 'Received',
        submittedAt: '2024-01-07T09:00:00Z',
      },
      {
        documentId: 'DOC-007',
        docType: 'Source of Funds Declaration',
        fileName: 'gamma_sof.pdf',
        status: 'Received',
        submittedAt: '2024-01-10T10:00:00Z',
        notes: 'Requires further verification',
      },
    ],
    screeningHits: [
      {
        hitId: 'HIT-002',
        source: 'OFAC SDN List',
        matchedName: 'Victor Petrov',
        severity: 'Critical',
        description: 'Exact name match on OFAC SDN List — sanctions screening required',
        status: 'Escalated',
      },
      {
        hitId: 'HIT-003',
        source: 'World-Check',
        matchedName: 'Gamma International',
        severity: 'High',
        description: 'Adverse media — linked to offshore tax evasion investigation',
        status: 'Open',
      },
    ],
    events: [
      {
        eventId: 'EVT-011',
        eventType: 'CaseCreated',
        timestamp: '2024-01-05T08:00:00Z',
        actor: 'system',
        description: 'Case KYC-003 created for Gamma International Inc',
      },
      {
        eventId: 'EVT-012',
        eventType: 'StatusChanged',
        timestamp: '2024-01-05T10:00:00Z',
        actor: 'Rachel Kim',
        description: 'Status advanced from Draft to IntakeValidated',
      },
      {
        eventId: 'EVT-013',
        eventType: 'StatusChanged',
        timestamp: '2024-01-06T09:00:00Z',
        actor: 'Rachel Kim',
        description: 'Status advanced from IntakeValidated to WaitingForEvidence',
      },
      {
        eventId: 'EVT-014',
        eventType: 'ScreeningHitRaised',
        timestamp: '2024-01-08T07:00:00Z',
        actor: 'screening-engine',
        description: 'Critical OFAC SDN match for Victor Petrov',
      },
      {
        eventId: 'EVT-015',
        eventType: 'StatusChanged',
        timestamp: '2024-01-18T11:00:00Z',
        actor: 'Rachel Kim',
        description: 'Status advanced from WaitingForEvidence to InReview',
      },
      {
        eventId: 'EVT-016',
        eventType: 'ExceptionRaised',
        timestamp: '2024-01-22T16:00:00Z',
        actor: 'Rachel Kim',
        description: 'Case escalated to Exception due to critical screening hits',
      },
    ],
  },
  {
    caseId: 'KYC-004',
    legalEntity: {
      entityId: 'LE-004',
      registeredName: 'Delta GmbH',
      jurisdiction: 'Germany',
      registrationNumber: 'DE87654321',
      industry: 'Technology',
    },
    productType: 'Corporate Account',
    riskTier: 'Low',
    status: 'Approved',
    assignedTo: 'Hans Mueller',
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2024-01-05T12:00:00Z',
    beneficialOwners: [
      {
        ownerId: 'BO-008',
        name: 'Klaus Richter',
        ownershipPercent: 100,
        nationality: 'German',
      },
    ],
    documentRequirements: [
      {
        requirementId: 'REQ-016',
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-017',
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-018',
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Received',
      },
      {
        requirementId: 'REQ-019',
        docType: 'Financial Statements',
        mandatory: false,
        status: 'Received',
      },
    ],
    submittedDocuments: [
      {
        documentId: 'DOC-008',
        docType: 'Certificate of Incorporation',
        fileName: 'delta_cert_inc.pdf',
        status: 'Received',
        submittedAt: '2023-12-05T10:00:00Z',
        expiryDate: '2030-12-05T00:00:00Z',
      },
      {
        documentId: 'DOC-009',
        docType: 'Articles of Association',
        fileName: 'delta_articles.pdf',
        status: 'Received',
        submittedAt: '2023-12-05T10:05:00Z',
      },
      {
        documentId: 'DOC-010',
        docType: 'Proof of Address',
        fileName: 'delta_address.pdf',
        status: 'Received',
        submittedAt: '2023-12-06T09:00:00Z',
        expiryDate: '2025-12-06T00:00:00Z',
      },
      {
        documentId: 'DOC-011',
        docType: 'Financial Statements',
        fileName: 'delta_financials_2023.pdf',
        status: 'Received',
        submittedAt: '2023-12-07T11:00:00Z',
      },
    ],
    screeningHits: [],
    events: [
      {
        eventId: 'EVT-017',
        eventType: 'CaseCreated',
        timestamp: '2023-12-01T09:00:00Z',
        actor: 'system',
        description: 'Case KYC-004 created for Delta GmbH',
      },
      {
        eventId: 'EVT-018',
        eventType: 'StatusChanged',
        timestamp: '2023-12-01T10:00:00Z',
        actor: 'Hans Mueller',
        description: 'Status advanced from Draft to IntakeValidated',
      },
      {
        eventId: 'EVT-019',
        eventType: 'StatusChanged',
        timestamp: '2023-12-02T09:00:00Z',
        actor: 'Hans Mueller',
        description: 'Status advanced from IntakeValidated to WaitingForEvidence',
      },
      {
        eventId: 'EVT-020',
        eventType: 'StatusChanged',
        timestamp: '2023-12-15T14:00:00Z',
        actor: 'Hans Mueller',
        description: 'Status advanced from WaitingForEvidence to InReview',
      },
      {
        eventId: 'EVT-021',
        eventType: 'DecisionRecorded',
        timestamp: '2024-01-05T12:00:00Z',
        actor: 'Hans Mueller',
        description: 'Case approved — all requirements satisfied, no screening hits',
      },
    ],
    decision: {
      decisionId: 'DEC-001',
      decision: 'Approved',
      rationale: 'All mandatory documents received and verified. No adverse screening results. Low-risk profile confirmed.',
      decidedBy: 'Hans Mueller',
      decidedAt: '2024-01-05T12:00:00Z',
    },
  },
  {
    caseId: 'KYC-005',
    legalEntity: {
      entityId: 'LE-005',
      registeredName: 'Epsilon SA',
      jurisdiction: 'France',
      registrationNumber: 'FR11223344',
      industry: 'Retail',
    },
    productType: 'Loans',
    riskTier: 'Medium',
    status: 'Draft',
    assignedTo: 'Sophie Dupont',
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
    beneficialOwners: [
      {
        ownerId: 'BO-009',
        name: 'Pierre Moreau',
        ownershipPercent: 55,
        nationality: 'French',
      },
      {
        ownerId: 'BO-010',
        name: 'Anne Lefebvre',
        ownershipPercent: 45,
        nationality: 'French',
      },
    ],
    documentRequirements: [
      {
        requirementId: 'REQ-020',
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-021',
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-022',
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-023',
        docType: 'Financial Statements',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: 'REQ-024',
        docType: 'Business Plan',
        mandatory: false,
        status: 'Pending',
      },
    ],
    submittedDocuments: [],
    screeningHits: [],
    events: [
      {
        eventId: 'EVT-022',
        eventType: 'CaseCreated',
        timestamp: '2024-01-25T14:00:00Z',
        actor: 'system',
        description: 'Case KYC-005 created for Epsilon SA',
      },
    ],
  },
];

export function getCases(): OnboardingCase[] {
  return cases;
}

export function getCase(id: string): OnboardingCase | undefined {
  return cases.find((c) => c.caseId === id);
}

export function createCase(data: {
  legalEntity: OnboardingCase['legalEntity'];
  productType: OnboardingCase['productType'];
  riskTier: OnboardingCase['riskTier'];
  assignedTo: string;
}): OnboardingCase {
  const caseId = nextCaseId();
  const now = new Date().toISOString();
  const newCase: OnboardingCase = {
    caseId,
    legalEntity: data.legalEntity,
    productType: data.productType,
    riskTier: data.riskTier,
    status: 'Draft',
    assignedTo: data.assignedTo,
    createdAt: now,
    updatedAt: now,
    beneficialOwners: [],
    documentRequirements: [
      {
        requirementId: `REQ-${nextId()}`,
        docType: 'Certificate of Incorporation',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: `REQ-${nextId()}`,
        docType: 'Articles of Association',
        mandatory: true,
        status: 'Pending',
      },
      {
        requirementId: `REQ-${nextId()}`,
        docType: 'Proof of Address',
        mandatory: true,
        status: 'Pending',
      },
    ],
    submittedDocuments: [],
    screeningHits: [],
    events: [
      {
        eventId: `EVT-${nextId()}`,
        eventType: 'CaseCreated',
        timestamp: now,
        actor: 'system',
        description: `Case ${caseId} created for ${data.legalEntity.registeredName}`,
      },
    ],
  };
  cases.push(newCase);
  return newCase;
}

export function updateCase(
  id: string,
  updates: Partial<OnboardingCase>
): OnboardingCase | undefined {
  const idx = cases.findIndex((c) => c.caseId === id);
  if (idx === -1) return undefined;
  cases[idx] = { ...cases[idx], ...updates, updatedAt: new Date().toISOString() };
  return cases[idx];
}

export function advanceCase(id: string): OnboardingCase | undefined {
  const c = getCase(id);
  if (!c) return undefined;
  const next = STATUS_TRANSITIONS[c.status];
  if (!next) return c;
  const now = new Date().toISOString();
  const event: CaseEvent = {
    eventId: `EVT-${nextId()}`,
    eventType: 'StatusChanged',
    timestamp: now,
    actor: c.assignedTo,
    description: `Status advanced from ${c.status} to ${next}`,
  };
  return updateCase(id, {
    status: next,
    events: [...c.events, event],
  });
}

export function addEvent(id: string, event: Omit<CaseEvent, 'eventId'>): OnboardingCase | undefined {
  const c = getCase(id);
  if (!c) return undefined;
  const newEvent: CaseEvent = {
    ...event,
    eventId: `EVT-${nextId()}`,
  };
  return updateCase(id, { events: [...c.events, newEvent] });
}

export function addDocument(
  id: string,
  doc: Omit<SubmittedDocument, 'documentId'>
): OnboardingCase | undefined {
  const c = getCase(id);
  if (!c) return undefined;
  const newDoc: SubmittedDocument = {
    ...doc,
    documentId: `DOC-${nextId()}`,
  };
  const updatedRequirements = c.documentRequirements.map((req) =>
    req.docType === doc.docType ? { ...req, status: 'Received' as const } : req
  );
  const event: CaseEvent = {
    eventId: `EVT-${nextId()}`,
    eventType: 'DocumentReceived',
    timestamp: new Date().toISOString(),
    actor: 'client-portal',
    description: `${doc.docType} received: ${doc.fileName}`,
  };
  return updateCase(id, {
    submittedDocuments: [...c.submittedDocuments, newDoc],
    documentRequirements: updatedRequirements,
    events: [...c.events, event],
  });
}
