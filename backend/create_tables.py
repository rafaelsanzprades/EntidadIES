import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import engine
from models import Base

# Create missing tables
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
