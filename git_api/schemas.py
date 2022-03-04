from typing import Optional

from pydantic import BaseModel


class PRBase(BaseModel):
    origin: str
    destiny: str
    status: str
    author: str
    title: str
    description: str


class PRCreate(PRBase):
    pass


class PR(PRBase):
    id: int

    class Config:
        orm_mode = True
