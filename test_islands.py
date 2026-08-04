from PIL import Image

try:
    im = Image.open('/Users/apple/Documents/Binary Infotech/Company Logo/logo.png')
    # Let's crop out empty borders first
    bg_pixel = im.getpixel((0,0))
    def is_bg(pixel):
        if len(pixel) >= 3 and len(bg_pixel) >= 3:
            return abs(pixel[0]-bg_pixel[0]) < 10 and abs(pixel[1]-bg_pixel[1]) < 10 and abs(pixel[2]-bg_pixel[2]) < 10
        return pixel == bg_pixel

    width, height = im.size
    
    # Get active columns (columns that contain non-bg pixels)
    active_cols = []
    for x in range(width):
        has_content = False
        for y in range(height):
            if not is_bg(im.getpixel((x, y))):
                has_content = True
                break
        if has_content:
            active_cols.append(x)
            
    # Group consecutive columns to find content regions
    regions = []
    if active_cols:
        start = active_cols[0]
        prev = active_cols[0]
        for x in active_cols[1:]:
            if x - prev > 5: # gap greater than 5px
                regions.append((start, prev))
                start = x
            prev = x
        regions.append((start, prev))
        
    print("Found content regions:")
    for idx, r in enumerate(regions):
        print(f"Region {idx}: x-range {r[0]} to {r[1]} (width: {r[1]-r[0]}px)")
        
except Exception as e:
    print(f"Error: {e}")
