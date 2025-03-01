from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from prompts import get_email_prompt, get_social_media_prompt, get_blog_post_prompt, get_youtube_description_prompt
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import logging

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

API_TOKEN = os.getenv("HUGGINGFACE_API_KEY")

if not API_TOKEN:
    raise ValueError("Hugging Face API token not found. Please set it in the .env file.")

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
client = InferenceClient(api_key=API_TOKEN)

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
            raise HTTPException(status_code=400, detail="Unsupported content type")


        # print(prompt)
        
        messages = [
            {
                "role": "user",
                "content": prompt
            }
        ]

        # Call the InferenceClient's chat completion API
        completion = client.chat.completions.create(
            model="google/gemma-2-2b-it",  # Specify your desired model
            messages=messages,
            max_tokens=2000  # Set a limit for generated tokens
        )

        generated_text = completion.choices[0].message["content"]

        return {"generated_text": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
