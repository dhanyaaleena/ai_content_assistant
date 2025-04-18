from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from prompts import get_email_prompt, get_social_media_prompt, get_blog_post_prompt, get_youtube_description_prompt
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import logging
import httpx

import logging

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

load_dotenv()

# Configure logging to write logs to a file
log_file = "api_requests.log"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_file),  # Log to file
        # logging.StreamHandler()  # Log to console
    ]
)

logger = logging.getLogger("api_logger")

origins = [
    "http://localhost:3100",  # For local development frontend
    "http://localhost:8100",  # For local backend
    "https://sagestack.org",  # Add your production frontend domain
    "https://www.sagestack.org"  # Add with "www" if applicable
]

# Initialize FastAPI
app = FastAPI(root_path="/content-generator/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Initialize Hugging Face client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

# Request schema
class ContentRequest(BaseModel):
    content_type: str
    tone: str
    length: int
    additional_data: dict

# Middleware to log incoming requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    # Read and log the request body
    body_bytes = await request.body()
    body_text = body_bytes.decode("utf-8") if body_bytes else ""

    logger.info(f"Incoming request: {request.method} {request.url} Body: {body_text}")

    # Reset the request body so the actual endpoint can read it
    async def receive():
        return {"type": "http.request", "body": body_bytes}
    request._receive = receive

    response = await call_next(request)
    return response


@app.post("/generate_content")
async def generate_content(request: ContentRequest):
    try:
        content_type = request.content_type.lower()
        tone = request.tone
        length = request.length
        additional_data = request.additional_data

        # Generate the prompt based on content type
        if content_type == "email":
            prompt = get_email_prompt(
                email_type=additional_data.get("email_type"),
                tone=tone,
                length=length,
                keywords=additional_data.get("keywords"),
            )
        elif content_type == "social_media":
            prompt = get_social_media_prompt(
                platform=additional_data.get("social_media_type"),
                style=additional_data.get("style"),
                tone=tone,
                length=length,
                mentions=additional_data.get("mentions"),
                keywords=additional_data.get("keywords")
            )
        elif content_type == "blog_post":
            prompt = get_blog_post_prompt(
                topic=additional_data.get("topic"),
                style=additional_data.get("style"),
                tone=tone,
                length=length,
                keywords=additional_data.get("keywords")
            )
        elif content_type == "youtube_description":
            prompt = get_youtube_description_prompt(
                keywords=additional_data.get("keywords"),
                links=additional_data.get("links"),
                timestamps=additional_data.get("timestamps")
            )
        else:
            logger.warning("Unsupported content type: %s", content_type)
            raise HTTPException(status_code=400, detail="Unsupported content type")
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        headers = {
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(GEMINI_API_URL, headers=headers, json=payload)

        if response.status_code != 200:
            logger.error("Gemini API error: %s", response.text)
            raise HTTPException(status_code=response.status_code, detail=response.text)

        gemini_response = response.json()
        generated_text = gemini_response["candidates"][0]["content"]["parts"][0]["text"]

        return {"generated_text": generated_text}

    except Exception as e:
        logger.exception("Error generating content")
        raise HTTPException(status_code=500, detail=str(e))
