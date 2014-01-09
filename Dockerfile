FROM    ubuntu:latest
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
# Hack for initctl not being available in Ubuntu
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -s /bin/true /sbin/initctl
# Install MongoDB
RUN apt-get update
RUN apt-get install mongodb-10gen
# Create the MongoDB data directory
RUN mkdir -p /data/db
RUN apt-get update
RUN apt-get install -y python-software-properties python g++ make
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN echo "deb http://archive.ubuntu.com/ubuntu precise universe" >> /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install -g sumeru

RUN apt-get install -y git
RUN sumeru init ./myproject
ADD start.sh /usr/local/start.sh
RUN chmod a+x /usr/local/start.sh
EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/usr/local/start.sh"]

