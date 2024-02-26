from fastapi.testclient import TestClient
from your_app_file import app

client = TestClient(app)

def test_inference():
    response = client.post("/inference/", json={"text":"Test prompt"})
    assert response.status_code  == 200


