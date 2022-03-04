from sqlalchemy.orm import Session

from . import models, schemas

def get_pr(db: Session, pr_id: int):
    #return db.query(models.User).filter(models.User.id == user_id).first()
    return db.query(models.PullRequest).filter(models.PullRequest.id == pr_id).first()


def get_pr_by_state(db: Session, status: str):
    return db.query(models.PullRequest).filter(models.PullRequest.status == status).first()


def get_prs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PullRequest).offset(skip).limit(limit).all()


def create_pr(db: Session, pr: schemas.PRCreate):
    db_pr = models.PullRequest(status=pr.status , origin=pr.origin, destiny=pr.destiny, author=pr.author, title=pr.title, description=pr.description, 
)
    db.add(db_pr)
    db.commit()
    db.refresh(db_pr)
    return db_pr


def update_pr(db: Session, id: int, new_status: str):
    pr = db.query(models.PullRequest).get(id)
    pr.status = new_status
    db.commit()
    return pr


