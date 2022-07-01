import strawberry
from sqlalchemy import and_
from sqlalchemy.orm import Session
from strawberry.types import Info

from app.hyuabot.api.models.postgresql.shuttle import ShuttleTimetable


@strawberry.type
class ShuttleTimetableItem:
    period: str
    weekday: str
    shuttle_type: str
    shuttle_time: str
    start_stop: str


@strawberry.type
class Shuttle:
    @strawberry.field
    def timetable(
            self, info: Info, period: str = None, weekday: str = None, shuttle_type: str = None,
            start_stop: str = None, start_time: str = None, end_time: str = None,
    ) -> list[ShuttleTimetableItem]:
        db_session: Session = info.context["db_session"]

        query = db_session.query(ShuttleTimetable) \
            .filter(and_(
                ShuttleTimetable.period == period if period else True,
                ShuttleTimetable.weekday == weekday if weekday else True,
                ShuttleTimetable.shuttle_type == shuttle_type if shuttle_type else True,
                ShuttleTimetable.start_stop == start_stop if start_stop else True,
                ShuttleTimetable.shuttle_time >= start_time if start_time else True,
                ShuttleTimetable.shuttle_time <= end_time if end_time else True,
            )).all()
        result: list[ShuttleTimetableItem] = []
        for x in query:  # type: ShuttleTimetable
            result.append(
                ShuttleTimetableItem(
                    period=x.period,
                    weekday=x.weekday,
                    shuttle_type=x.shuttle_type,
                    shuttle_time=x.shuttle_time,
                    start_stop=x.start_stop,
                ),
            )
        return result
