"""Turns the raw phone screenshots into the website's app images.

    python scripts/prepare_screenshots.py ../CASEFLOW/phone_screenshots

For each screenshot used on the site this:
  * blurs private details (party and client names, case numbers, emails,
    phone numbers, GPS points) — the boxes below are in the original
    610x1356 pixel space;
  * crops off the Android navigation bar;
  * saves a WebP into public/app/<name>.webp.

Screenshots 17, 18 (profile: email, phone, bar registration, address) and
20 (Advocate Directory: other advocates' phone numbers) are deliberately not
used. When new screenshots are taken from a demo account, drop the BLUR boxes
for them and re-run.
"""

import os
import sys

from PIL import Image, ImageFilter

# index in the sorted folder -> (output name, [blur boxes])
SHOTS = {
    0: ("splash-quote", []),
    1: ("splash", []),
    2: ("register", []),
    3: ("signin", []),
    4: ("home-actions", []),
    5: ("diary", []),
    6: ("home", []),
    7: ("repository", [(70, 780, 250, 812), (45, 845, 525, 892), (105, 912, 230, 942), (70, 1135, 260, 1165)]),
    8: ("repository-list", [(70, 170, 245, 200), (45, 240, 560, 278), (95, 302, 225, 332), (70, 523, 265, 553), (45, 590, 600, 665), (95, 692, 245, 722), (70, 915, 245, 945), (45, 985, 600, 1055), (95, 1082, 240, 1112)]),
    9: ("tasks", []),
    10: ("dossier-parties", [(110, 205, 500, 245), (75, 292, 195, 318), (130, 645, 350, 675), (130, 755, 350, 785)]),
    11: ("schedule", []),
    12: ("dossier-details", [(110, 205, 500, 245), (55, 292, 195, 318), (420, 678, 600, 707), (350, 772, 600, 802)]),
    13: ("tools-hub", []),
    14: ("tools-hub-2", []),
    15: ("tools-hub-3", []),
    16: ("dossier-history", [(110, 205, 500, 245), (55, 292, 195, 318)]),
    19: ("more-hub", []),
    21: ("legal-pulse", [(20, 398, 592, 692), (40, 1070, 180, 1192)]),
    22: ("ai", []),
    23: ("mact", []),
    24: ("maintenance", []),
    25: ("partition", []),
    26: ("english-dictionary", []),
    27: ("court-fee", []),
    28: ("epay", []),
    29: ("legal-dictionary", []),
    30: ("delay", []),
    31: ("limitation", []),
    32: ("interest", []),
    33: ("export", []),
    34: ("import", []),
    35: ("bare-acts", []),
    36: ("templates", []),
    37: ("stamp-values", []),
    38: ("holidays", []),
    39: ("recruit", [(95, 630, 420, 660), (95, 747, 420, 777), (95, 863, 420, 893), (95, 980, 420, 1010)]),
    40: ("clients", [(150, 532, 475, 562), (150, 705, 475, 735), (150, 878, 475, 908), (150, 1052, 475, 1082)]),
    41: ("efiling", []),
    42: ("chambers", []),
    43: ("court-portals", []),
    44: ("ledger-2", [(130, 340, 380, 405), (130, 1025, 380, 1090)]),
    45: ("certified-copies", [(75, 595, 240, 625), (75, 635, 270, 660), (75, 1058, 265, 1088)]),
    46: ("ledger", [(125, 432, 380, 495), (125, 1115, 380, 1180)]),
    47: ("commissioner", [(118, 602, 200, 625), (70, 647, 470, 673), (70, 683, 250, 707), (118, 873, 215, 897), (70, 919, 545, 945), (70, 953, 250, 977)]),
    48: ("settings-notifications", [(180, 195, 440, 262)]),
    49: ("bar-association", []),
    50: ("settings", []),
    51: ("settings-about", []),
    52: ("caveat", [(160, 550, 370, 602)]),
    53: ("commission-overview", []),
    54: ("commission-info", []),
    55: ("commission-evidence", []),
    56: ("commission-notes", []),
    57: ("commission-witness", []),
    58: ("commission-visits", [(50, 615, 330, 660), (50, 848, 330, 893)]),
    59: ("commission-docs", []),
    60: ("commission-expenses", []),
    61: ("commission-sketch", []),
}

CROP_BOTTOM = 1268  # the Android navigation bar starts below this line


def blur(img, box):
    region = img.crop(box)
    # Pixelate first so no stroke survives, then soften so it reads as a blur.
    w, h = region.size
    small = region.resize((max(1, w // 10), max(1, h // 10)), Image.BILINEAR)
    region = small.resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(4))
    img.paste(region, box)


def main(src):
    files = sorted(f for f in os.listdir(src) if f.lower().endswith((".jpg", ".jpeg", ".png")))
    out = os.path.join(os.path.dirname(__file__), "..", "public", "app")
    os.makedirs(out, exist_ok=True)
    for index, (name, boxes) in SHOTS.items():
        img = Image.open(os.path.join(src, files[index])).convert("RGB")
        sx, sy = img.width / 610, img.height / 1356
        for (x0, y0, x1, y1) in boxes:
            blur(img, (int(x0 * sx), int(y0 * sy), int(x1 * sx), int(y1 * sy)))
        img = img.crop((0, 0, img.width, int(CROP_BOTTOM * sy)))
        img.save(os.path.join(out, f"{name}.webp"), "WEBP", quality=84, method=6)
    print(f"wrote {len(SHOTS)} images to {os.path.normpath(out)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "../CASEFLOW/phone_screenshots")
