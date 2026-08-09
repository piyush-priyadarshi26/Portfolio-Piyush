"""
Shared file utilities for reading/writing JSON data files.
All data files are stored in the backend/data/ directory.
"""
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)


def read_json(filename: str, default):
    """Read a JSON file from the data directory. Returns default if missing or corrupt."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        return default
    try:
        return json.loads(filepath.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return default


def write_json(filename: str, data) -> None:
    """Write data as pretty-printed JSON to the data directory."""
    filepath = DATA_DIR / filename
    filepath.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
