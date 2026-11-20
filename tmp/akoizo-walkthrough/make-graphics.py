from pathlib import Path
from math import cos, sin, pi, radians
import numpy as np
from PIL import Image, ImageDraw, ImageFont

here = Path(__file__).resolve().parent
assets = here / "video-graphics"
assets.mkdir(exist_ok=True)
fonts = Path("C:/Windows/Fonts")
ink, cobalt, ice, paper = "#08090c", "#2455f5", "#8aaeff", "#f4f5f8"
width, height = 1920, 1080


def font(name, size):
    return ImageFont.truetype(str(fonts / f"{name}.ttf"), size)


mono = font("consola", 27)
body = font("segoeui", 42)
title = font("segoeuib", 104)
bar_title = font("segoeuib", 55)
wordmark = font("segoeuib", 44)


def canvas():
    y, x = np.mgrid[:height, :width]
    glow = np.exp(-(((x-1500)/540)**2 + ((y-510)/660)**2))
    grain = np.random.default_rng(24).normal(0, 0.29, x.shape)
    base = np.array([8, 9, 12]) + glow[..., None] * [13, 24, 63] + grain[..., None]
    return Image.fromarray(base.clip(0, 255).astype("uint8")).convert("RGBA")


def orbit(cx, cy, rx, ry, tilt):
    angle = radians(tilt)
    return [(cx + rx*cos(t)*cos(angle) - ry*sin(t)*sin(angle),
             cy + rx*cos(t)*sin(angle) + ry*sin(t)*cos(angle))
            for t in np.linspace(0, 2*pi, 481)]


def sphere(radius):
    y, x = np.mgrid[-radius:radius, -radius:radius] / radius
    active = x*x+y*y <= 1
    z = np.sqrt(np.maximum(0, 1-x*x-y*y))
    reflection = 2*y*z + .25*x
    bands = np.interp(reflection, [-1, -.72, -.34, -.12, .08, .21, .47, .76, 1],
                      [15, 28, 114, 216, 37, 21, 82, 174, 75])
    shine = np.maximum(0, -.45*x-.32*y+.83*z)**18 * 97
    rim = (1-z)**5 * 45
    rgb = (bands + shine + rim)[..., None] * [.7, .8, 1.12] + [3, 7, 13]
    data = np.dstack((rgb.clip(0, 255), active*255)).astype("uint8")
    return Image.fromarray(data)


def background():
    base = canvas()
    inkwork = Image.new("RGBA", base.size)
    draw = ImageDraw.Draw(inkwork)
    for x in range(1036, 1840, 50):
        for y in range(157, 950, 50):
            draw.ellipse((x-1, y-1, x+1, y+1), fill=(138,174,255,48))
    cx, cy = 1438, 533
    draw.ellipse((cx-296,cy-296,cx+296,cy+296), outline=(96,143,255,60), width=2)
    draw.ellipse((cx-325,cy-325,cx+325,cy+325), outline=(96,143,255,34), width=1)
    paths = [(orbit(cx, cy, 400, 103, tilt), alpha)
             for tilt, alpha in [(-25,165), (37,115), (93,80)]]
    for path, alpha in paths:
        draw.line(path, fill=(95,143,255,alpha), width=3)
    base = Image.alpha_composite(base, inkwork)
    base.alpha_composite(sphere(202), (cx-202,cy-202))
    front = Image.new("RGBA", base.size)
    draw = ImageDraw.Draw(front)
    for path, alpha in paths:
        draw.line(path[:241], fill=(138,174,255,alpha), width=3)
        x, y = path[67 + alpha % 40]
        draw.ellipse((x-6,y-6,x+6,y+6), fill=ice)
    return Image.alpha_composite(base, front)


def frame(image, headline, kicker, extra, url=False):
    out = image.copy()
    d = ImageDraw.Draw(out)
    d.text((120,123), "Akoizo", font=wordmark, fill=paper)
    d.line((120,211,950,211), fill="#33405d", width=2)
    d.rectangle((120,369,168,374), fill=ice)
    d.text((188,356), kicker, font=mono, fill=ice)
    d.multiline_text((118,426), headline, font=title, fill=paper, spacing=-8)
    if extra:
        d.text((123,742), extra, font=body, fill="#bccbea")
    if url:
        d.text((123,869), "akoizo.app", font=mono, fill=ice)
    return out


def lower_third(number, heading):
    out = Image.new("RGBA", (width,height))
    d = ImageDraw.Draw(out)
    box_width = max(510, int(d.textlength(heading, font=bar_title))+195)
    x, y = 82, 96
    d.rounded_rectangle((x,y,x+box_width,y+116), 22, fill="#0e172c",
                        outline="#476edb", width=2)
    d.rounded_rectangle((x+16,y+16,x+100,y+100), 13, fill=cobalt)
    d.text((x+58,y+58), number, font=mono, fill=paper, anchor="mm")
    d.text((x+126,y+57), heading, font=bar_title, fill=paper, anchor="lm")
    return out


art = background()
art.convert("RGB").save(assets / "Akoizo-Orbit-Background.jpg", quality=94, subsampling=0)
frame(art, "Science Olympiad\nwalkthrough", "START HERE",
      "Find your event. Build a study routine.").convert("RGB").save(assets / "01-Opening.png")
frame(art, "Start with\none event", "YOUR NEXT STEP",
      "Finish a checkpoint. Try a practice test.", url=True).convert("RGB").save(assets / "09-Closing.png")

chapters = ["Find an event", "Study a lesson", "Take a practice test",
            "Build your binder", "Explore labs and builds",
            "Find your team and progress", "Open the rankings"]
for i, chapter in enumerate(chapters, start=1):
    filename = f"{i+1:02d}-{chapter.replace(' ', '-')}.png"
    lower_third(f"{i:02d}", chapter).save(assets / filename)

for i, action in enumerate(["Pick an event card", "Finish a checkpoint",
                            "Open a past test"], start=1):
    lower_third("TRY", action).save(assets / f"Prompt-{i:02d}.png")
