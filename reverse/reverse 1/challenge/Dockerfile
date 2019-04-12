FROM debian:stretch

RUN apt-get update && apt-get install -y gcc openssh-server

RUN useradd -s /bin/bash -d /home/restricted -p SuperSecureP4sswor@d restricted
WORKDIR /home/restricted
COPY app.c .
COPY flag .
RUN gcc app.c -o getflag
RUN chmod +x getflag
RUN rm app.c
RUN chown root:root getflag
RUN chmod 4777 getflag
RUN chmod 600 flag

RUN mkdir /var/run/sshd
RUN echo 'restricted:SuperSecureP4sswor@d' | chpasswd

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

CMD ["/usr/sbin/sshd", "-D"]
