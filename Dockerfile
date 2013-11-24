FROM    ubuntu:latest
RUN apt-get update
RUN apt-get install -y python-software-properties python g++ make
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN echo "deb http://archive.ubuntu.com/ubuntu precise universe" >> /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install -g sumeru

RUN apt-get install -y git
 
EXPOSE 8080

