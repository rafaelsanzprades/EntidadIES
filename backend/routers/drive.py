import subprocess
import json
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/drive", tags=["drive"])

@router.get("/files/{folder_id}")
def get_drive_files(folder_id: str):
    """
    Fetch the list of files and folders inside a specific Google Drive folder ID.
    Relies on the local 'rclone' configuration named 'gdrive'.
    """
    try:
        # We use rclone's connection string syntax: gdrive,root_folder_id=...:
        result = subprocess.run(
            ["rclone", "lsjson", f"gdrive,root_folder_id={folder_id}:", "--max-depth", "1"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        files = json.loads(result.stdout)
        
        # Sort files: directories first, then alphabetically
        files = sorted(files, key=lambda x: (not x.get("IsDir", False), x.get("Name", "")))
        
        return {"status": "success", "files": files}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Error accessing Google Drive: {e.stderr}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse rclone output: {str(e)}")
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="rclone command not found in server PATH")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
