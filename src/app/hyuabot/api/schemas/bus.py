from datetime import time
from pydantic import BaseModel, Field


class BusRealtimeItem(BaseModel):
    location: int = Field(alias="location", title="잔여 정류장 수", description="예시: 1 -> 정류장 1개 남음")
    remained_time: int = Field(alias="remainedTime", title="남은 시간", description="예시: 10 -> 10분 남음")
    remained_seat: int = Field(alias="remainedSeat", title="잔여 좌석 수",
                               description="예시: 1 -> 좌석 1개 남음/예시: 0 -> 좌석 없음/예시: -1 -> 좌석 정보 미제공")


class BusTimetable(BaseModel):
    weekdays: list[time] = Field(alias="weekdays", title="평일 시점 출발 시간표")
    saturday: list[time] = Field(alias="saturday", title="토요일 시점 출발 시간표")
    sunday: list[time] = Field(alias="sunday", title="일요일/공휴일 시점 출발 시간표")


class BusDepartureByLine(BaseModel):
    name: str = Field(alias="name", title="노선명", description="예시: 3102")
    realtime: list[BusRealtimeItem] = Field(alias="realtime", title="실시간 도착 정보")
    timetable: BusTimetable = Field(alias="timetable", title="시점 출발 시간표")


class BusStopInformationResponse(BaseModel):
    stop_name: str = Field(alias="stopName", title="정류장 이름", description="예시: 한양대컨벤션센터")
    departure_list: list[BusDepartureByLine] = Field(alias="departureInfoList", title="노선별 도착 정보")
