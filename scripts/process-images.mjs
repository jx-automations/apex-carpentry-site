// One-off image processing pipeline for the Apex Carpentry site.
// Reads verified source photos from the raw asset folder, strips EXIF/GPS
// metadata, and copies them into public/images/<category>/<descriptive-name>.jpg
// Run with: node scripts/process-images.mjs

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = "D:\\Alex\\WEBSITE AI BIZ\\apex_carpentry";
const OUT_DIR = path.join(__dirname, "..", "public", "images");

// Verified mapping: every entry below was individually viewed and confirmed.
// Photos containing identifiable people or pets are deliberately excluded.
const MANIFEST = [
  // --- New Builds ---
  { src: "SnapInsta.to_684351895_18083038388207597_7327557331257599630_n.jpg", out: "new-builds/new-builds-framing-trusses-01.jpg" },
  { src: "SnapInsta.to_671837709_18083038397207597_2889934433009086211_n.jpg", out: "new-builds/new-builds-framing-gable-02.jpg" },
  { src: "SnapInsta.to_682288657_18083038424207597_8090455900281398673_n.jpg", out: "new-builds/new-builds-subfloor-frame-01.jpg" },
  { src: "SnapInsta.to_686552545_18083038415207597_255637335026767588_n.jpg", out: "new-builds/new-builds-foundation-panel-01.jpg" },
  { src: "SnapInsta.to_719919246_18088758665207597_8916567434346364768_n.jpg", out: "new-builds/new-builds-foundation-trench-01.jpg" },
  { src: "SnapInsta.to_692205233_18083038352207597_8312426280959189041_n.jpg", out: "new-builds/new-builds-foundation-slab-mesh-01.jpg" },
  { src: "SnapInsta.to_684493589_18083038379207597_8237288282261604101_n.jpg", out: "new-builds/new-builds-weathertight-wrap-01.jpg" },
  { src: "SnapInsta.to_689251672_18083038370207597_8503810089756577136_n.jpg", out: "new-builds/new-builds-sheathing-wall-01.jpg" },
  { src: "SnapInsta.to_786158029_18100740920207597_8409330318676687114_n.jpg", out: "new-builds/new-builds-twin-cabins-hero.jpg" },
  { src: "SnapInsta.to_684704219_18083038343207597_8405621767328795862_n.jpg", out: "new-builds/new-builds-twin-cabins-02.jpg" },
  { src: "SnapInsta.to_786070136_18100740944207597_5207064880015601677_n.jpg", out: "new-builds/new-builds-shed-exterior-01.jpg" },
  { src: "SnapInsta.to_786266669_18100740935207597_1562310617317956551_n.jpg", out: "new-builds/new-builds-shed-exterior-02.jpg" },
  { src: "SnapInsta.to_786837843_18100740965207597_3035030750254665405_n.jpg", out: "new-builds/new-builds-shed-skillion-01.jpg" },
  { src: "SnapInsta.to_687742080_18083038361207597_8221041211868408102_n.jpg", out: "new-builds/new-builds-gable-interior-01.jpg" },

  // --- Renovations (grey villa dormer addition) ---
  { src: "SnapInsta.to_719301929_18088758749207597_4321228232144183962_n.jpg", out: "renovations/renovations-villa-dormer-01.jpg" },
  { src: "SnapInsta.to_717803030_18088758605207597_8262405354718014606_n.jpg", out: "renovations/renovations-villa-dormer-02.jpg" },
  { src: "SnapInsta.to_719452147_18088758758207597_3798656031998296141_n.jpg", out: "renovations/renovations-villa-dormer-03.jpg" },
  { src: "SnapInsta.to_720200520_18088758623207597_3038761181322172512_n.jpg", out: "renovations/renovations-villa-dormer-04.jpg" },

  // --- Additions (garage, carport, lean-to, retaining work) ---
  { src: "SnapInsta.to_786150821_18100740896207597_626929036718781350_n.jpg", out: "additions/additions-garage-construction-01.jpg" },
  { src: "SnapInsta.to_719188190_18088758689207597_1026693356517538304_n.jpg", out: "additions/additions-garage-fitout-01.jpg" },
  { src: "SnapInsta.to_719490366_18088758641207597_5096615658350253071_n.jpg", out: "additions/additions-lean-to-roof-01.jpg" },
  { src: "SnapInsta.to_719565231_18088758704207597_5023548600591736388_n.jpg", out: "additions/additions-interior-framing-01.jpg" },
  { src: "SnapInsta.to_720830674_18088758719207597_7866954144834972467_n.jpg", out: "additions/additions-carport-lining-01.jpg" },
  { src: "SnapInsta.to_721152188_18088758653207597_3720211561905006955_n.jpg", out: "additions/additions-retaining-trench-01.jpg" },

  // --- Decks ---
  { src: "SnapInsta.to_704307235_18085517690207597_4134939627794376234_n.jpg", out: "decks/decks-coastal-staircase-01.jpg" },
  { src: "SnapInsta.to_704751839_18085517711207597_3806096099600915396_n.jpg", out: "decks/decks-balustrade-detail-01.jpg" },
  { src: "SnapInsta.to_704703046_18085517699207597_5870813197293162692_n.jpg", out: "decks/decks-staircase-02.jpg" },

  // --- Interiors (used within renovations/additions storytelling) ---
  { src: "SnapInsta.to_670989395_18077875811207597_7476643510115380264_n.jpg", out: "interiors/interiors-bathroom-arched-mirror-01.jpg" },
  { src: "SnapInsta.to_670383060_18077875829207597_749541889592993375_n.jpg", out: "interiors/interiors-bathroom-arched-mirror-02.jpg" },
  { src: "SnapInsta.to_669939730_18077875802207597_4549390210804672666_n.jpg", out: "interiors/interiors-bathroom-double-vanity-01.jpg" },
  { src: "SnapInsta.to_670971059_18077875793207597_1443986114217368503_n.jpg", out: "interiors/interiors-bathroom-freestanding-tub-01.jpg" },
  { src: "SnapInsta.to_670778215_18077818577207597_5652954271947470692_n.jpg", out: "interiors/interiors-stairwell-landing-01.jpg" },
  { src: "SnapInsta.to_669700358_18077818586207597_6550565909803697131_n.jpg", out: "interiors/interiors-stairwell-pendant-01.jpg" },
];

const HERO_MAX_WIDTH = 2600;
const STANDARD_MAX_WIDTH = 2200;

async function run() {
  let ok = 0;
  let failed = 0;

  for (const { src, out } of MANIFEST) {
    const srcPath = path.join(SOURCE_DIR, src);
    const outPath = path.join(OUT_DIR, out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    const maxWidth = out.includes("hero") ? HERO_MAX_WIDTH : STANDARD_MAX_WIDTH;

    try {
      const image = sharp(srcPath).rotate(); // auto-orient from EXIF, then metadata is stripped
      const meta = await image.metadata();
      const resizeWidth = meta.width && meta.width > maxWidth ? maxWidth : undefined;

      await image
        .resize(resizeWidth ? { width: resizeWidth } : undefined)
        .jpeg({ quality: 82, mozjpeg: true })
        .withMetadata(false)
        .toFile(outPath);

      ok++;
      console.log(`OK   ${src} -> ${out}`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${src}:`, err.message);
    }
  }

  // Logo: copy as-is (small file, already appropriately sized), just re-encode to strip metadata.
  const logoSrc = path.join(SOURCE_DIR, "logo.jpg");
  const logoOut = path.join(OUT_DIR, "brand", "logo.jpg");
  await fs.mkdir(path.dirname(logoOut), { recursive: true });
  await sharp(logoSrc).jpeg({ quality: 90 }).withMetadata(false).toFile(logoOut);
  console.log(`OK   logo.jpg -> brand/logo.jpg`);

  console.log(`\nDone. ${ok + 1} images processed, ${failed} failed.`);
}

run();
