from PIL import Image

# Open the source logo
img = Image.open("C:/Users/aditya/.gemini/antigravity/brain/0d698ae2-b3a4-4ef9-8361-010572068c5c/media__1783821481545.png").convert("RGBA")
width, height = img.size

# Let's inspect the corner pixel to find the background color
corner_pixel = img.getpixel((0, 0))
print(f"Corner background pixel color: {corner_pixel}")

# Find the darkest pixel in the image to understand the logo color
pixels = list(img.getdata())
min_brightness = 255
min_pixel = None
for p in pixels:
    r, g, b, a = p
    brightness = (r + g + b) // 3
    if brightness < min_brightness:
        min_brightness = brightness
        min_pixel = p

print(f"Darkest pixel (logo color): {min_pixel} with brightness {min_brightness}")
