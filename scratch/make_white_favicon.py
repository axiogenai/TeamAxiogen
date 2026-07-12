from PIL import Image

img = Image.open("C:/Users/aditya/.gemini/antigravity/brain/0d698ae2-b3a4-4ef9-8361-010572068c5c/media__1783821481545.png").convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    r, g, b, a = item
    # If the pixel is transparent, keep it transparent
    if a < 50:
        newData.append((0, 0, 0, 0))
    else:
        # If it is an opaque logo pixel, turn it into solid white
        newData.append((255, 255, 255, 255))

img.putdata(newData)
img.save("../app/icon.png", "PNG")
print("Successfully generated correct transparent white favicon in app/icon.png")
