from app.hyuabot.api.api.api_v1.api import shuttle_router, bus_router, subway_router
from app.hyuabot.api.api.api_v1.endpoints.food import restaurant_menu_router
from app.hyuabot.api.api.api_v1.endpoints.reading_room.campus import reading_room_router


API_V1_ROUTERS = [shuttle_router, bus_router, reading_room_router, restaurant_menu_router, subway_router]
