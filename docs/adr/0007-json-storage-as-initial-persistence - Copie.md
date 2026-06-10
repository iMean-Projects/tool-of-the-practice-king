# ADR-0007: JSON storage as initial persistence

## Status

Accepted

## Context

The application needs to store builds for a given champion, created by the user
and persisted by an internal API.

The data model is document-oriented — champions, items, and runes are defined as
JSON documents. Builds are documents containing arrays of item and rune IDs. No
remote access or multi-user support is required at this stage.

The alternatives considered were:

- **MongoDB** — document-oriented database, natural fit for the data model, but
  requires infrastructure setup that is not justified for a personal single-user
  tool at this stage. Deferred as the primary migration target.
- **JSON files** — one file per champion, no query capabilities, zero
  infrastructure overhead.

## Decision

We will use JSON files as the persistence layer, accessed exclusively via the
Express API. The client never reads or writes files directly.

## Consequences

- No infrastructure setup is required — the data is stored in files on disk.
- No concurrent write safety — acceptable for a single-user personal tool.
- No querying across builds — filtering and aggregation must be handled in
  application code if needed.
- File I/O is a security surface — champion IDs must be validated before
  constructing file paths to prevent path traversal vulnerabilities.
- Migration to MongoDB requires replacing the repository implementation only —
  shared types and business logic are unaffected.
