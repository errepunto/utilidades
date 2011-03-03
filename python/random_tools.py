#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Module description"""

# imports
import sys
import time
import traceback
import random
import hashlib
import base64

__author__ = "Rubén C. (errepunto)"
__copyright__ = "Copyright 2011, Rubén C."
__credits__ = ["Rubén C. (errepunto)"]
__license__ = "BSD"
__version__ = "1.0"
__maintainer__ = "Rubén C. (errepunto)"
__email__ = "asf.dominio AATT gmail.com"
__status__ = "Development"

# Chars
LOWER_LETTERS = "abcdefghijklmnopqrstuvwxyz"
UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
NUMBERS = "0123456789"
SYMBOLS = "+-*/=!?()\&%$_<>"
ESPECIAL = "áéíóúñü"
DEFAULT_CHARS = LOWER_LETTERS+NUMBERS

# Digest methods
DIGEST_PLAIN        = 0
DIGEST_PLAIN_B64    = 1
DIGEST_MD5          = 2
DIGEST_MD5_B64      = 3
DIGEST_SHA1         = 4
DIGEST_SHA1_B64     = 5
DIGEST_SHA256       = 6
DIGEST_SHA256_B64   = 7
DIGEST_SHA512       = 8
DIGEST_SHA512_B64   = 9
DIGEST_MD5_SHA1     = 10
DIGEST_MD5_SHA1_B64 = 11

def getRandomString(length, chars=DEFAULT_CHARS):
    """Returns a string whith 'length' chars long whith chars specified"""
    c = ""
    for i in xrange(0, length):
        c += random.choice(chars)
    return c


def getPasswd(length, digest=DIGEST_PLAIN, chars=DEFAULT_CHARS):
    passwd = getRandomString(length, chars)
    ret = passwd
    
    if digest == DIGEST_PLAIN:
        ret = passwd
    elif digest == DIGEST_PLAIN_B64:
        ret = base64.b64encode(passwd)
    elif digest == DIGEST_MD5:
        ret = hashlib.md5(passwd).hexdigest()
    elif digest == DIGEST_MD5_B64:
        ret = base64.b64encode(hashlib.md5(passwd).hexdigest())
    elif digest == DIGEST_SHA1:
        ret = hashlib.sha1(passwd).hexdigest()
    elif digest == DIGEST_SHA1_B64:
        ret = base64.b64encode(hashlib.sha1(passwd).hexdigest())
    elif digest == DIGEST_SHA256:
        ret = hashlib.sha256(passwd).hexdigest()
    elif digest == DIGEST_SHA256_B64:
        ret = base64.b64encode(hashlib.sha256(passwd).hexdigest())
    elif digest == DIGEST_SHA512:
        ret = hashlib.sha512(passwd).hexdigest()
    elif digest == DIGEST_SHA512_B64:
        ret = base64.b64encode(hashlib.sha512(passwd).hexdigest())
    elif digest == DIGEST_MD5_SHA1:
        ret = hashlib.md5(passwd).hexdigest()
    elif digest == DIGEST_MD5_SHA1_B64:
        ret = base64.b64encode(hashlib.sha1(hashlib.md5(passwd).digest()).hexdigest())
    
    return ret


def getNumberBetween(min, max):
    num = random.randint(min, max)
    return num


def getNumber(max):
    return getNumberBetween(0, max)



def main():
    print "getRandomString(10):                ", getRandomString(10)
    print "getPasswd(10):                      ", getPasswd(10)
    print "getPasswd(10, DIGEST_MD5_B64):      ", getPasswd(10, DIGEST_MD5_B64)
    print "getPasswd(10, DIGEST_SHA1_B64):     ", getPasswd(10, DIGEST_SHA1_B64)
    print "getPasswd(10, DIGEST_SHA256_B64):   ", getPasswd(10, DIGEST_SHA256_B64)
    print "getPasswd(10, DIGEST_SHA512_B64):   ", getPasswd(10, DIGEST_SHA512_B64)
    print "getPasswd(10, DIGEST_MD5_SHA1_B64): ", getPasswd(10, DIGEST_MD5_SHA1_B64)
    print "getNumberBetween(0, 10):            ", getNumberBetween(0, 10)
    
if __name__ == "__main__":
    try:
        retvalue = main()
    except Exception, e:
        retvalue = -1
        print "Error in main: %s" % e
        traceback.print_stack()

    #time.sleep(3)
    sys.exit(retvalue)