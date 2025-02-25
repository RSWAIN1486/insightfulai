from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.models.user import User
from app.schemas.token import Token
from app.services.auth import authenticate_user, get_current_user

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)) -> Any:
    """
    Logout endpoint (for future token invalidation)
    """
    return {"message": "Successfully logged out"}

@router.post("/register", response_model=Token)
async def register_user(
    # user_in: UserCreate,
    db: Session = Depends(get_db)
) -> Any:
    """
    Register a new user and return access token
    """
    # TODO: Implement user registration
    return {"message": "User registration endpoint (to be implemented)"}

@router.post("/password-recovery/{email}")
async def recover_password(email: str) -> Any:
    """
    Password Recovery
    """
    # TODO: Implement password recovery
    return {"message": "Password recovery email sent"}

@router.post("/reset-password")
async def reset_password(
    # token: str,
    # new_password: str,
) -> Any:
    """
    Reset password
    """
    # TODO: Implement password reset
    return {"message": "Password reset successful"} 