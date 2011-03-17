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
import datetime

__author__ = "Rubén C. J. (errepunto)"
__copyright__ = "Copyright 2011, Rubén C. J."
__credits__ = ["Rubén C. J. (errepunto)"]
__license__ = "BSD"
__version__ = "1.0"
__maintainer__ = "Rubén C. J. (errepunto)"
__email__ = "asf.dominio AATT gmail.com"
__status__ = "Development"


# Chars
LOWER_LETTERS = "abcdefghijklmnopqrstuvwxyz"
LOWER_VOWELS = "aeiou"
LOWER_CONSONANTS = "bcdfghjklmnpqrstvwxyz"
UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
UPPER_VOWELS = "AEIOU"
UPPER_CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ"
LETTERS = LOWER_LETTERS+UPPER_LETTERS
NUMBERS = "0123456789"
SYMBOLS = ".,;:=*/+-_!?()[]{}\&%$<>"
LOWER_SPECIAL = "áéíóúñü"
UPPER_SPECIAL = "ÁÉÍÓÚÚÑ"
SPECIAL = LOWER_SPECIAL+UPPER_SPECIAL
DEFAULT_CHARS = LOWER_LETTERS+NUMBERS

CHARS = {
    "lower": LOWER_LETTERS,
    "lower_vowels": LOWER_VOWELS,
    "lower_consonants": LOWER_CONSONANTS,
    "upper": UPPER_LETTERS,
    "upper_vowels": LOWER_VOWELS,
    "upper_consonants": LOWER_CONSONANTS,
    "letters": LETTERS,
    "numeric": NUMBERS,
    "numbers": NUMBERS,
    "symbols": SYMBOLS,
    "lower_special": LOWER_SPECIAL,
    "upper_special": UPPER_SPECIAL,
    "special": SPECIAL,
    "default": LOWER_LETTERS+NUMBERS
}

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


#
# TOOLS
#
def toBase(num, base):
    """Convert a number from base 10 to another base
    """
    a = num
    s = ""
    while a > 0:
        b = a % base
        a = a / base
        s = str(b)+s
        #print "%s, %s, %s" % (b, a, s)
    return s


def fillLeft(string, fillchar, length):
    """Fill a string from the left with the specified character
    """
    string = str(string)
    l = length - len(string)
    if l < 0:
        return string[0:(l*-1)]
    else:
        return fillchar*l+string


def fillRight(string, fillchar, length):
    """Fill a string from the right with the specified character
    """
    string = str(string)
    l = length - len(string)
    if l < 0:
        return string[-l]
    else:
        return string+fillchar*l

#
# FUNCTIONS
#

def getRandomString(length, chars=DEFAULT_CHARS):
    """Returns a random string whith 'length' chars long whith chars specified
    """
    c = ""
    for i in xrange(0, length):
        c += random.choice(chars)
    return c


def getPasswd(length, digest=DIGEST_PLAIN, chars=DEFAULT_CHARS):
    """Generates a random password with specified chars. Password can be processed
    to obtain a hash digest."""
    passwd = getRandomString(length, chars)
    ret = getDigest(digest, passwd)


def getDigest(digest, passwd):
    """Get digest for a string"""
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
    """Get a random integer between min and max, both included"""
    num = random.randint(min, max)
    return num


def getNumber(max):
    """Get a random integer between zero and max, both included"""
    return getNumberBetween(0, max)


def dice(faces=6, rolls=1):
    """Return a random dice roll.You can specify number of dice's faces and
    number the dice is rolled"""
    ret = []
    for i in xrange(0, rolls):
        ret.append(getNumberBetween(1, faces))
    return ret


def dices(rolls):
    """Advanced dice roll. You must pass a string with dice rolls separated by
    commas. A dice roll is specified in the format 'rolls+d+faces'. For example,
    you want to roll two dices with 6 and 10 faces each one, and two times each,
    you can call this function like this: dices('2d6,2d10')"""
    ret = []
    for i in rolls:
        try:
            i = i.lower()
            roll, faces = i.split("d")
            ret.extend(dice(int(faces, 10), int(roll, 10)))
        except Exception, e:
            print "Invalid dice: ", i, ": ", e
    return ret


def randomStringWithRules(rule):
    """Complex random string generator.Rule components are separated by commas.
    Each rule specifies type and lenght separated by '-'. For example "lower-3"
    means "three lower-case chars"
    """
    components = rule.lower().replace(" ", "").split(",")
    s = ""
    idx = 1
    for c in components:
        t, n = c.split("-")
        if t not in CHARS:
            s = "Invalid rule component: "+c
            break
        s += getRandomString(int(n, 10), chars=CHARS[t])
        idx += 1
    return s


def randomTime(start="00:00", stop="23:59"):
    """Generate a random time between two specified"""
    parts1 = start.split(":")
    parts2 = stop.split(":")
    
    h1 = int(parts1[0], 10)
    h2 = int(parts2[0], 10)
    m1 = int(parts1[1], 10)
    m2 = int(parts2[1], 10)
    
    t1 = int(time.mktime((2000, 1, 1, h1, m1, 0, 0, 1, -1)))
    t2 = int(time.mktime((2000, 1, 1, h2, m2, 0, 0, 1, -1)))
    seconds = random.randint(t1, t2)
    
    return time.strftime('%H:%M', time.localtime(seconds))


def randomDate(start="01/01/2000", stop="31/12/2010"):
    """Generate a random date"""
    parts1 = start.split("/")
    parts2 = stop.split("/")
    
    d1 = int(parts1[0], 10)
    d2 = int(parts2[0], 10)
    m1 = int(parts1[1], 10)
    m2 = int(parts2[1], 10)
    y1 = int(parts1[2], 10)
    y2 = int(parts2[2], 10)
    
    t1 = int(time.mktime((y1, m1, d1, 12, 00, 0, 0, 1, -1)))
    t2 = int(time.mktime((y2, m2, d2, 12, 00, 0, 0, 1, -1)))
    seconds = random.randint(t1, t2)
    
    return time.strftime('%d/%m/%Y', time.localtime(seconds))


def randomPick(s):
    """Pick a random element from a comma-separated list"""
    l = s.split(",")
    return random.choice(l)


def shuffleList(s):
    """Randomice a comma-separated list"""
    l = s.split(",")
    random.shuffle(l)
    return ",".join(l)


def test():
    """Simple test program"""
    
    print "toBase(12345, 7):                   ", toBase(12345, 7)
    print "toBase(12345, 2):                   ", toBase(12345, 2)
    print "fillLeft('123', '0', 5):            ", fillLeft('123', '0', 5)
    print "fillRight('123', '0', 5):           ", fillRight('123', '0', 5)
    print "getRandomString(10):                ", getRandomString(10)
    print "getPasswd(10):                      ", getPasswd(10)
    print "getPasswd(10, DIGEST_MD5_B64):      ", getPasswd(10, DIGEST_MD5_B64)
    print "getPasswd(10, DIGEST_SHA1_B64):     ", getPasswd(10, DIGEST_SHA1_B64)
    print "getPasswd(10, DIGEST_SHA256_B64):   ", getPasswd(10, DIGEST_SHA256_B64)
    print "getPasswd(10, DIGEST_SHA512_B64):   ", getPasswd(10, DIGEST_SHA512_B64)
    print "getPasswd(10, DIGEST_MD5_SHA1_B64): ", getPasswd(10, DIGEST_MD5_SHA1_B64)
    print "getNumberBetween(0, 10):            ", getNumberBetween(0, 10)
    print "getNumber(10):                      ", getNumber(10)
    print "dice(6):                            ", dice(6)
    print "dice(12, 3):                        ", dice(12, 3)
    print "dices(['2D6', '3D10']):             ", dices(['2D6', '3D10'])
    print "randomStringWithRules('symbols-1,numbers-3,lower-5'): ", randomStringWithRules('symbols-1,numbers-3,lower-5')
    print "randomTime('15:50', '17:10'):       ", randomTime('15:50', '17:10')
    print "randomDate('3/3/2003', '5/5/2005'): ", randomDate('3/3/2003', '5/5/2005')
    print "randomPick('1,2,a,b'):              ", randomPick('1,2,a,b')
    print "shuffleList('1,2,a,b'):             ", shuffleList('1,2,a,b')

    
if __name__ == "__main__":
    retvalue = test()
    
    sys.exit(retvalue)
    