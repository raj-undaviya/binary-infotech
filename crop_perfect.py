from PIL import Image, ImageChops

def get_y_bounds(im, x_start, x_end, bg_pixel):
    width, height = im.size
    
    def is_bg(pixel):
        if len(pixel) >= 3 and len(bg_pixel) >= 3:
            return abs(pixel[0]-bg_pixel[0]) < 10 and abs(pixel[1]-bg_pixel[1]) < 10 and abs(pixel[2]-bg_pixel[2]) < 10
        return pixel == bg_pixel

    y_min = height
    y_max = 0
    for x in range(x_start, x_end + 1):
        for y in range(height):
            if not is_bg(im.getpixel((x, y))):
                if y < y_min:
                    y_min = y
                if y > y_max:
                    y_max = y
    return y_min, y_max

try:
    im = Image.open('/Users/apple/Documents/Binary Infotech/Company Logo/logo.png')
    bg_pixel = im.getpixel((0,0))
    
    # Coordinates of regions from test_islands
    # Region 0: 156 to 418 (circle)
    # Region 1: 463 to 836 (bar)
    # Region 2: 934 to 1403 (text)
    
    symbol_x_start = 156
    symbol_x_end = 836
    text_x_start = 934
    text_x_end = 1403
    
    # Find vertical boundaries
    symbol_y_min, symbol_y_max = get_y_bounds(im, symbol_x_start, symbol_x_end, bg_pixel)
    text_y_min, text_y_max = get_y_bounds(im, text_x_start, text_x_end, bg_pixel)
    
    # 1. Crop the symbol (circle + bar)
    symbol_img = im.crop((symbol_x_start, symbol_y_min, symbol_x_end + 1, symbol_y_max + 1))
    
    # 2. Crop the text
    text_img = im.crop((text_x_start, text_y_min, text_x_end + 1, text_y_max + 1))
    
    # 3. Create Favicon (icon.png) using the full symbol (circle + bar)
    # The symbol is wide, so we make a square canvas and center the symbol on it.
    symbol_w, symbol_h = symbol_img.size
    fav_size = max(symbol_w, symbol_h) + 40 # add padding
    
    # Create background color
    bg_color = (255, 255, 255, 0) if im.mode == 'RGBA' else bg_pixel
    fav_img = Image.new(im.mode, (fav_size, fav_size), bg_color)
    
    # Paste symbol in center
    x_offset = (fav_size - symbol_w) // 2
    y_offset = (fav_size - symbol_h) // 2
    fav_img.paste(symbol_img, (x_offset, y_offset))
    
    # Save as icon.png in Next.js app directory
    fav_img.save('/Users/apple/Documents/Binary Infotech/company website/src/app/icon.png')
    print("Favicon icon.png saved successfully!")
    
    # 4. Create Logo (logo.png) with reduced gap
    # Symbol dimensions: symbol_w, symbol_h
    # Text dimensions: text_img.width, text_img.height
    reduced_gap = 50 # original gap was ~96px
    logo_w = symbol_w + reduced_gap + text_img.width
    logo_h = max(symbol_h, text_img.height)
    
    # Add vertical and horizontal padding for the final logo
    pad_x = 20
    pad_y = 15
    final_w = logo_w + pad_x * 2
    final_h = logo_h + pad_y * 2
    
    logo_canvas = Image.new(im.mode, (final_w, final_h), bg_color)
    
    # Paste symbol
    symbol_y_pos = pad_y + (logo_h - symbol_h) // 2
    logo_canvas.paste(symbol_img, (pad_x, symbol_y_pos))
    
    # Paste text
    text_x_pos = pad_x + symbol_w + reduced_gap
    text_y_pos = pad_y + (logo_h - text_img.height) // 2
    logo_canvas.paste(text_img, (text_x_pos, text_y_pos))
    
    # Save logo.png to public folder
    logo_canvas.save('/Users/apple/Documents/Binary Infotech/company website/public/logo.png')
    print("Cropped logo.png saved successfully!")
    
except Exception as e:
    print(f"Error in perfect crop: {e}")
