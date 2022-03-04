from ssl import OP_NO_COMPRESSION
from fastapi import Depends, FastAPI, HTTPException, Response
from sqlalchemy.orm import Session

from typing import Optional
from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/pr/", response_model=schemas.PR)
def create_pr(pr: schemas.PRCreate, db: Session = Depends(get_db)):
    print('hello world')
    print(pr)
    return crud.create_pr(db=db, pr=pr)


@app.get("/pr/", response_model=list[schemas.PR])
def read_prs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prs = crud.get_prs(db, skip=skip, limit=limit)
    return prs


@app.get("/pr/{pr_id}", response_model=schemas.PR)
def read_pr(pr_id: int, db: Session = Depends(get_db)):
    db_pr = crud.get_pr(db, pr_id=pr_id)
    if db_pr is None:
        raise HTTPException(status_code=404, detail="PR not found")
    return db_pr


@app.put("/pr/{pr_id}", response_model=schemas.PR)
def update_pr(pr_id: int, status: str, db: Session = Depends(get_db)):
    return crud.update_pr(db=db, id=pr_id, new_status=status)

