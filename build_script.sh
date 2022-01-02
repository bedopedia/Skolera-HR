#!/bin/bash

cd /var/www/skolera/skolera-angular/
chmod -R 777 /var/www/skolera/skolera-angular/

npm run preinstall > /dev/null
npm install
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod --outputPath=/var/www/bedopedia/public/

sudo touch /var/www/bedopedia/public/version.json
sudo npm run post-build-new-infra

chmod -R 755 /var/www/bedopedia/public/
chown -R www-data:www-data /var/www/bedopedia/public/
