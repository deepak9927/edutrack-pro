import '@testing-library/jest-dom';

// The test setup imports (vitest) are only needed during test runs. Guard
// the import so the production build (Next.js) does not fail if devDeps
// aren't available in the environment.
let vi: any = undefined;
try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	vi = require('vitest').vi;
} catch (e) {
	// Not running tests — that's fine for production builds.
}

// Mock any global functions or modules here for tests. During production
// build this file will be loaded but the mocks will be no-ops.
// Example (uncomment when writing tests):
// if (vi) global.fetch = vi.fn();