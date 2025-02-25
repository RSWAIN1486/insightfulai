from typing import Generator, Any
import pymongo
import redis
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

# PostgreSQL setup
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# MongoDB setup
mongo_client = pymongo.MongoClient(settings.MONGODB_URL)
mongo_db = mongo_client[settings.MONGODB_DB]

# Redis setup
redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    decode_responses=True,
)

def get_db() -> Generator[Session, None, None]:
    """
    Get a database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_mongo_collection(collection_name: str) -> Any:
    """
    Get a MongoDB collection
    """
    return mongo_db[collection_name]

def create_db_and_tables() -> None:
    """
    Create database tables if they don't exist
    """
    Base.metadata.create_all(bind=engine)

def init_db() -> None:
    """
    Initialize database with default data
    """
    # Add any initial data seeding here
    pass 