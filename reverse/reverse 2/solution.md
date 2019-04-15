gcc crackme.c -o crackme -s //stripped
gcc crackme.c -o crackme //easy mode


Run binary / run in GDB and notice it is taking forever to run

flag{B1naRy_analys1s_ftw}

open in r2
aaa //analyze
s main // seek to main
pdf // view instructions

...

Notice many sleeps... just nop them out "wx 9090909090"

flag{B1naRy_analys1s_ftw}
