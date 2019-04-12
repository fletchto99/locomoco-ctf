#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>


int readfile(char* file) {
    FILE *fptr = fopen(file, "r");
    if (fptr == NULL) {
        printf("Error opening file, please tell sysadmin!\n");
        exit(0);
    }
    char c = fgetc(fptr);
    while (c != EOF){
        printf ("%c", c);
        c = fgetc(fptr);
    }

    fclose(fptr);
}

int main(int argc, char *argv[]){
  char buffer[0xC];
  int test = 0x00000000;


  printf("The answer is:\n");
  fflush(stdout);

    if (read(STDIN_FILENO, &buffer, 0x10) < 0) {
        perror("read");
    }

  if (test == 0x664c6147) {
    readfile("flag");
  } else {
    printf("Wrong!!!\n");
  }
  return 0;
}
