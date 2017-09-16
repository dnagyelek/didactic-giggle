# didactic-giggle

Docker setup using: 
- Redis
- Mailhog
- MariaBD
- PhpMyAdmin
- Nginx
- PHP7

Can be used for Wordpress development, but is not exclusive.

## Initial config
docker-compose.yml
MySQL and PhpMyAdmin user and password setup

## Update local images
docker-compose pull

## Get latest WP
wget http://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz 
sudo chmod -R 777 wordpress