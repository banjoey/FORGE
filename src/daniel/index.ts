/**
 * Emma Security Engineer Module
 *
 * Exports all Emma security functionality
 */

export { reviewCode, performSTRIDE } from './security-review'
export { lookupCMMCPractice, getCMMCDomainPractices, isValidCMMCPractice, cmmcPractices } from './cmmc-lookup'
export {
  allVulnerabilityPatterns,
  sqlInjectionPatterns,
  xssPatterns,
  authBypassPatterns,
  authorizationPatterns,
  cmmcViolationPatterns
} from './vulnerability-patterns'
