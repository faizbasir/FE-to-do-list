import "@testing-library/jest-dom";

import { server } from "./src/tests/__mocks__/server";

// Establish server mocking before all tests
beforeAll(() => server.listen());

// Reset any server handlers set during tests
// so that other tests are not affected
afterEach(() => server.resetHandlers());

// Close server after finishing all tests
afterAll(() => server.close());
