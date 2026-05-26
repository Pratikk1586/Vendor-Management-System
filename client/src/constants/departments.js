/**
 * @fileoverview Seed department definitions for registration, filters, and department-scoped features.
 */

/**
 * All departments available in the Tata Steel Colors vendor portal.
 * @type {Array<{ id: string, code: string, name: string, category: string }>}
 */
export const DEPARTMENTS = [
  {
    id: 'dept-raw-materials',
    code: 'RAW_MAT',
    name: 'Raw Materials',
    category: 'procurement',
  },
  {
    id: 'dept-packaging',
    code: 'PKG',
    name: 'Packaging',
    category: 'procurement',
  },
  {
    id: 'dept-logistics',
    code: 'LOG',
    name: 'Logistics',
    category: 'operations',
  },
  {
    id: 'dept-it-services',
    code: 'IT_SVC',
    name: 'IT & Services',
    category: 'technology',
  },
  {
    id: 'dept-civil-works',
    code: 'CIVIL',
    name: 'Civil Works',
    category: 'infrastructure',
  },
  {
    id: 'dept-electrical',
    code: 'ELEC',
    name: 'Electrical',
    category: 'infrastructure',
  },
  {
    id: 'dept-quality-testing',
    code: 'QA_TEST',
    name: 'Quality & Testing',
    category: 'quality',
  },
];
