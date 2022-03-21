from fastapi import APIRouter

from app.hyuabot.kakao.food.campus import food_campus_router

food_router = APIRouter(prefix="/food")
food_router.include_router(food_campus_router)
