class DataLoadError(Exception):
    """Raised when the car dataset fails to load or validate on startup."""
    pass


class NoMatchingCarsError(Exception):
    """Raised when hard filters eliminate the entire dataset."""
    pass
