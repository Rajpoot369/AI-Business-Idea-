from fastapi import FastAPI
from pydantic import BaseModel
import openai

app = FastAPI()

class IdeaRequest(BaseModel):
    niche: str
    budget: str

@app.post("/api/generate-ideas")
async def generate_ideas(request: IdeaRequest):
    openai.api_key = "your-openai-api-key"
    prompt = f"Generate unique business ideas for {request.niche} with a budget of {request.budget} USD."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100
    )
    ideas = response.choices[0].text.strip().split("\n")
    return {"ideas": ideas}
