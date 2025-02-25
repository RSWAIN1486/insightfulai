from fastapi import APIRouter

from app.api.endpoints import auth, users, data_collection, analysis, reports, competitors

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(data_collection.router, prefix="/data", tags=["Data Collection"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(competitors.router, prefix="/competitors", tags=["Competitors"]) 