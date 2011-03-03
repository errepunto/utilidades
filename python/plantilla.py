#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Module description"""

# imports
import sys
import time
import traceback
import random

__author__ = "Rubén C. (errepunto)"
__copyright__ = "Copyright 2011, Rubén C."
__credits__ = ["Rubén C. (errepunto)"]
__license__ = "BSD"
__version__ = "1.0"
__maintainer__ = "Rubén C. (errepunto)"
__email__ = "asf.dominio AATT gmail.com"
__status__ = "Development"


def main():
    pass


if __name__ == "__main__":
    try:
        retvalue = main()
    except Exception, e:
        retvalue = -1
        print "Error in main: %s" % e
        traceback.print_stack()

    time.sleep(3)
    sys.exit(retvalue)