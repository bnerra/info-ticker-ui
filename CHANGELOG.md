# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-03

First versioned release. Captures the dashboard as it was running in production
before NFL support was added.

### Added
- Real-time dashboard driven by Server-Sent Events from the Info Ticker API,
  via the `useLiveGames` hook.
- Top status bar with weather, clock, and API connection status.
- MLB primary module that rotates between live, concluded, and upcoming game views
  based on game state.
- Upcoming game preview with game time shown in local time.
- Game status display, including postponed game details.
- Current pitcher display during live games.
- Pagination across multiple games.
- Secondary modules: batting leaders, pitching leaders, NL division standings,
  inning-by-inning line score, player stats, and scoring summary.
- Configurable rotation intervals for secondary modules.
- Fixed-resolution kiosk layout optimized for 1024×600 that scales as a single
  unit to stay viewable on other screens.
- Cloudflare Pages production deployment configuration.

### Fixed
- Error handling when pitcher data is missing.
- Error handling while games are loading.
- Rendering when expected game data is missing.
- Automatic app refresh when the SSE connection goes stale.

[Unreleased]: https://github.com/bnerra/info-ticker-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/bnerra/info-ticker-ui/releases/tag/v1.0.0