# Testing Strategy

## Libraries

- **Backend**: `pytest` + FastAPI's `TestClient`
- **Frontend** (planned): `Vitest` + React Testing Library

For this checkpoint, we implemented a simple backend unit test using `pytest` and FastAPI's built-in `TestClient`. This lets us verify that our API endpoints behave correctly without having to run the full server or hit the real network.

## Backend Test: `/health` endpoint

We added a test file at `backend/tests/test_health.py` that verifies our health-check endpoint:

- Sends a `GET` request to `/health`
- Asserts that the status code is `200`
- Asserts that the JSON payload is `{ "status": "healthy" }`

This gives us a quick way to confirm that the FastAPI app starts correctly and that basic routing/middleware are configured properly.

## How to Run the Tests

From the `backend/` directory (with your virtual environment activated):

```bash
cd backend
pytest
```

This will discover and run tests in the `backend/tests/` directory.

## Future Testing Plans

- Add tests for the `/process-image` endpoint by mocking out the heavy PyTorch/PGD computation so tests stay fast.
- Add frontend component tests using Vitest + React Testing Library (e.g., verifying that the upload button, drag-and-drop UI, and error messages render and behave as expected).
