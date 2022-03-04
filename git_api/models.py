from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class PullRequest(Base):
    __tablename__ = "pullrequests"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String)
    destiny = Column(String)
    status = Column(String)
    author = Column(String)
    title = Column(String)
    description = Column(String)
    
