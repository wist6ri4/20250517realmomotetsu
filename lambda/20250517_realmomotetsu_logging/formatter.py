from logging import Formatter
from datetime import datetime, timezone, timedelta

class JSTFormatter(Formatter):
    """
    Custom formatter to convert UTC time to JST time.
    """
    def formatTime(self, record, datefmt=None):
        # Convert UTC time to JST time
        jst = timezone(timedelta(hours=+9), name="JST")
        dt = datetime.fromtimestamp(record.created, tz=jst)
        return dt.strftime(datefmt or "%Y-%m-%d %H:%M:%S")
