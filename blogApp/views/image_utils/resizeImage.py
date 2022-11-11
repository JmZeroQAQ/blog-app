from PIL import Image
from io import BytesIO
from django.core.files import File

# 参数说明
# file 传入图片源文件
# max_width 图片宽最大长度, unit: px
# max_height 图片高最大长度, unit: px
# 返回值: 返回PIL图片类型
def resizeImage(**params):
    file = params['file']

    img = Image.open(file)
    img_name = file.name
    imageType = img.format
    img_width = img.size[0]
    img_height = img.size[1]
    width: int
    height: int
    

    if 'max_height' in params:
        height = params['max_height']
        # 如果图片已经比要求还小了,直接返回源文件
        if img_height <= height:
            return file
        scale = height / img_height
        width = int(img_width * scale)

    else:
        width = params['max_width']
        # 如果图片已经比要求还小了,直接返回源文件
        if img_width <= width:
            return file
        scale = width / img_width
        height = int(img_height * scale)
    
    # 修改分辨率
    img = img.resize((width, height), None)
    # 将文件以二进制形式存储
    out = BytesIO()
    img.save(out, format = imageType)
    # ImageField 默认构造需要 File 类型
    out = File(out, img_name)
    return out
