This program is vulnerable to a buffer overflow.

The program allocates 12 bytes for the buffer but then reads 16, thus the 4 bytes overflow into the integer test.

Next you need to make test look like 664c617, which converts to fLaG. Since integer values are little endian it must be reversed in the overflow

Thus the overflow must look like [12 bytes]GaLf or AAAAAAAAAAAAGaLf

This will cause the readfile function to execute printing...

flag{y0u_found_a_buffer_0verflow}
