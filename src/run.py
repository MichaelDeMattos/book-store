# -*- coding: utf-8 -*-

import os
import traceback
import subprocess

try:
    if os.getenv("DEV_MODE") == "true":
        subprocess.call("npm run dev", shell=True)
    else:
        subprocess.call("npm run start", shell=True)
except Exception:
    traceback.print_exception()
