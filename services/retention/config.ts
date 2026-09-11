// Retention configuration for raw interview recordings.
// Policy source of truth: Data Retention & PII in Transcripts (Product + Legal).
// Values here determine what happens to respondent data. Review against the
// Enterprise MSA template before changing anything in this file.

export const RECORDING_RETENTION_DAYS = 730;

export const TRANSCRIPT_RETENTION_MODE = 'contract_term_plus_90d';

export const AUDIT_LOG_RETENTION_DAYS = 365;

export const BACKUP_RETENTION_DAYS = 35;

// Both regions inherit the same window unless a contract shortens it.
export const RETENTION_REGION_PRIMARY = 'us-east-1';
export const RETENTION_REGION_EU = 'eu-west-1';
