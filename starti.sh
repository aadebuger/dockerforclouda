sudo docker run -p 49900:49900 -v /home/vagrant/container/cloudajstest1/app:/app -link azure_bird:db -i -t aadebuger/nodejs1 /bin/bash
