from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.routes import api_router
from app.core.database import create_db_and_tables

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Market Research Platform API",
    version="0.1.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    """
    Initialize services on startup
    """
    # Skip database initialization for now
    # create_db_and_tables()
    print("Skipping database initialization for development")

@app.on_event("shutdown")
async def shutdown_event():
    """
    Clean up resources on shutdown
    """
    pass

@app.get("/", tags=["Health"])
async def health_check():
    """
    Root endpoint for health checks
    """
    return {"status": "healthy", "message": "InsightfulAI API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 