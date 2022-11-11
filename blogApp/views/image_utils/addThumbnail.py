### 手动给之前没有缩略图的图片添加缩略图

import os
from io import BytesIO
from blogApp.models.image.image import Image
from blogApp.views.image_utils.resizeImage import resizeImage
from blog.settings import MEDIA_ROOT
from django.core.files import File

def addThumbnail():
    imgs = Image.objects.filter(imageVisible = True)
    for img in imgs:
        if img.imageThumbnail == None:
            imgDir = os.path.join(MEDIA_ROOT, img.imageFile.path)
            imgName = img.imageName
            print(imgName)
            print(imgDir)

            B_img = BytesIO()
            with open(imgDir, "rb") as f:
                B_img.write(f.read())
                f.close()

            F_img = File(B_img, imgName)
            out = resizeImage(file = F_img, max_height = 200)
            
            img.imageThumbnail.save(imgName, out, save = True)
