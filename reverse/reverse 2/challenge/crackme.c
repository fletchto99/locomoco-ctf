#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>   // for nanosleep

char f[] = "\xba\x5b\x67\xc3\xbc\x6f\x74\x4a\xc6\x97\x7d\x30\x84\x9a\xa5\x2e\x95\x52\x84\x08\x5b\x89\xb0\x69\xdd";
char k[] = "\xec\x07\x01\x2e\xf9\xfb\x4d\xce\x62\xd7\x25\x99\xb5\xe9\x32\x87\x93\x22\x14\xb2\xc2\xbf\xdd\xd7\x0b\x4c\x31\x4e\x6d\x91\xd6\xdc\x23\x2d\x33\x25\x12\x91\x1d\x0d\xcb\xe7\xb5\x8d\x30\xf2\x0c\xc8\x05\xcd\x41\x0a\xfe\x45\x5f\x01\x60\xeb\x73\x38\x83\xcc\x89\xc0\x9d\x34\x7b\x35\x84\x0f\xd5\x43\x59\x64\xae\x96\x6f\x86\xe2\x7a\x9a\x75\x48\xa1\x30\x8e\xce\x1d\x48\x80\xd4\x4c\xa3\x60\x43\xd0\x59\x9f\x48\xb0";

void decrypt_string( char* str, int size){
    int i=0;
    for (i=0; i<size; i++){
        str[i] = str[i]^k[i] ;
    }
    str[i] = 0x00;
}

void reverse(char a[], int sz) {
  int i, j;
  for (i = 0, j = sz; i < j; i++, j--) {
    int tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
}

void rotate(char array[], int size, int amt) {
  if (amt < 0)
    amt = size + amt;
  reverse(array, size-amt-1);
  reverse(array+size-amt, amt-1);
  reverse(array, size-1);
}

void sleep_1() {
  usleep(2000000);
}

void sleep_2(struct timespec ts) {
  nanosleep(&ts, NULL);
}

void msg(int msg) {
    if (msg == 1) {
      printf("Still going! Servers under intense load!\n");
    } else if(msg == 2) {
      printf("Have a coffee while we run this program\n");
    } else if (msg == 3) {
      printf("I think this should be done by the end of the year?\n");
    } else if (msg == 4) {
      printf("This is going to take forever?\n");
    } else {
      printf("Slowly encrypting all of your files... jk not really\n");
    }
}

void msg2(int msg) {
    if (msg == 1) {
      printf("Probably doing useless computations\n");
    } else if(msg == 2) {
      printf("Time for a nap\n");
    } else if (msg == 3) {
      printf("Oh my im sleepy\n");
    } else if (msg == 4) {
      printf("You know that its going to take years to get output right?\n");
    } else {
      printf("Yawn\n");
    }
}


int main( int argc, char** argv ) {

  printf("Computing... This might take a while!\n");
  for (int i=0; i < 13337; ++i){
      //This shit is hard to compute. We need to give our CPU a break
      sleep_1();

      // Random number to display the message
      msg(i % 5);

      //Reverse rotxor
      rotate(f, 25, 1);

      //CPU needs more time off...
      struct timespec ts;
      ts.tv_sec = 2;
      ts.tv_nsec = 2 * 10000000;
      sleep_2(ts);

      //Disply another nice message
      msg2(rand() % 5);

      //xor with key
      decrypt_string(f,25);

  }
  printf("We're done crunching the numbers!! Here's the result: %s\n",f);
  return 0;
}
