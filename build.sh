#! /bin/bash

project_static=/home/jmzero/blog/static/
resource=/home/jmzero/build/
resource_static=${resource}static/

resource_dist=/home/jmzero/blog/blogApp/static/
templates_dist=/home/jmzero/blog/blogApp/templates/

if test $# -eq 1 && test $1 == "clean"
then
	if test -e "${resource_dist}js/" -a -e "${resource_dist}css/"
	then
		rm -rf "${resource_dist}js/" "${resource_dist}css/"
	fi

	if test -e "${project_static}js/" -a -e "${project_static}css/"
	then
		rm -rf "${project_static}js/" "${project_static}css/"
	fi
	
	echo "clean success!!!"
	exit 0
fi

cp ${resource}*.html ${templates_dist}
cp ${resource}*.json ${resource_dist}
cp -rf ${resource_static}* ${resource_dist}

echo yes | python3 manage.py collectstatic

sed -i "s/favicon.ico/static\/favicon.ico/g" ${templates_dist}index.html
sed -i "s/logo192.png/static\/logo192.png/g" ${templates_dist}index.html
sed -i "s/manifest.json/static\/manifest.json/g" ${templates_dist}index.html

