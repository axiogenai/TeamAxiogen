from PIL import Image

img = Image.open("C:/Users/aditya/.gemini/antigravity/brain/0d698ae2-b3a4-4ef9-8361-010572068c5c/media__1783821481545.png").convert("RGBA")
pixels = list(img.getdata())

opaque_count = 0
for p in pixels:
    r, g, b, a = p
    if a > 0:
        opaque_count += 1

print(f"Total pixels: {len(pixels)}")
print(f"Opaque pixels (alpha > 0): {opaque_count}")
