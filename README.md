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
wget http://wordpress.org/latest.tar.gz && tar -xzvf latest.tar.gz 

### Fix permissions problems

sudo chmod -R 777 wordpress

### add to wp-config

define( 'FS_METHOD', 'direct' );

## Install local Node.js modules
npm i

### Find outdated packages and install them
sudo npm outdated -g

sudo npm install package@latest -g