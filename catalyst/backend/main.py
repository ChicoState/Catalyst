from llama_cpp import Llama
import json
from fastapi import FastAPI
from pydantic import BaseModel

def load_model():
    """This will load up the model for inference
    """
    top_p = 0.4
    top_k = 40
    min_p = 0.1

    model_path = f"./llama.cpp/models/llama-2-7b.Q6_K.gguf"
    
    llm = Llama(model_path=model_path, top_k=top_k, top_p=top_p, min_p=min_p)
    return llm

app = FastAPI()
model = load_model()

class Item(BaseModel):
    text: str

@app.post("/inference/")
async def inference(item: Item):
    """Runs an inference using the loaded model"""
    print("Running inference...")
    output = model(item.text, max_tokens=48, echo=True)
    
    return output
