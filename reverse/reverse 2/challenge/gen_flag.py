#!/usr/bin/env python3

# Thanks to Andre-Yves for allowing me to use this challenge!

key = "ec 07 01 2e f9 fb 4d ce 62 d7 25 99 b5 e9 32 87 93 22 14 b2 c2 bf dd d7 0b 4c 31 4e 6d 91 d6 dc 23 2d 33 25 12 91 1d 0d cb e7 b5 8d 30 f2 0c c8 05 cd 41 0a fe 45 5f 01 60 eb 73 38 83 cc 89 c0 9d 34 7b 35 84 0f d5 43 59 64 ae 96 6f 86 e2 7a 9a 75 48 a1 30 8e ce 1d 48 80 d4 4c a3 60 43 d0 59 9f 48 b0"
flag = 'flag{B1naRy_analys1s_ftw}'
binflag = bytearray(bytes(flag, encoding="ascii"))

# XORs the result then rotates the message


def xorrot(message, key_bytes):
    result = bytearray(len(message))
    for i in range(len(message)):
        result[i] = message[i] ^ key_bytes[i]
    return result[1:] + result[:1]


for i in range(13337):
    binflag = xorrot(binflag, bytearray.fromhex(key))


out = [format(x, '#04x') for x in binflag]
print("".join(out).replace('0x', '\\x'))
