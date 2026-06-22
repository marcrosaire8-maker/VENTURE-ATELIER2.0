/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudioConfig {
  logoUrl: string;
  backgroundUrl: string;
  forgeImageUrl?: string;
  moonImageUrl?: string;
  lightImageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  strategy: string;
  deliverables: string;
  results: string;
  images: string[];
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectNature: string;
  stage: string;
  need: string;
  recommendation: 'Forge' | 'Moon' | 'Light';
  status: 'Nouveau' | 'Contacté' | 'Signé';
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  eventType: string;
  actor: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  metadata?: Record<string, any>;
}

