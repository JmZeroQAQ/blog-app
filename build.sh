#! /bin/bash

resource=/home/jmzero/build/
resource_static=${resource}static/

resource_dist=/home/jmzero/blog/blogApp/static/
templates_dist=/home/jmzero/blog/blogApp/templates/

cp ${resource}*.html ${templates_dist}
cp ${resource}*.json ${resource_dist}
cp -rf ${resource_static}* ${resource_dist}

echo yes | python3 manage.py collectstatic

sed -i "s/favicon.ico/static\/favicon.ico/g" ${templates_dist}index.html
sed -i "s/logo192.png/static\/logo192.png/g" ${templates_dist}index.html
sed -i "s/manifest.json/static\/manifest.json/g" ${templates_dist}index.html

