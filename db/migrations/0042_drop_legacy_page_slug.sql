-- legacy_page_slug unused since the MDX migration (ADR-001).
-- Dropping it and adding the lookup index the new resolver needs.

ALTER TABLE documents DROP COLUMN legacy_page_slug;

CREATE INDEX idx_documents_workspace_path ON documents (workspace_id, page_path);
