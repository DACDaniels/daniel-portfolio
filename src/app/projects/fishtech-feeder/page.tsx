"use client";

import { LoopingClip } from "@/components/ui/LoopingClip";
import { ProjectPage } from "@/components/ui/ProjectPage";

// Sources (read only): fishtech-feeder CLAUDE.md, BIBLE.md (sections 1, 9
// and 11) and this repository's CLAUDE.md. A working prototype: no dose
// accuracy, no field results and no price are claimed anywhere here.
export default function FishTechFeederPage() {
  return (
    <ProjectPage
      status="building"
      eyebrow="// project · embedded · solar"
      statusNote="Working prototype · Exhibited at ZAS 2026"
      title="FishTech Feeder"
      lead="A standalone, solar-powered automatic fish feeder in welded steel, for smallholder ponds in Zimbabwe. The first unit is built and dispensing feed."
      facts={[
        { k: "Stage", v: "Working prototype" },
        { k: "Shown at", v: "Zimbabwe Agricultural Show 2026" },
        { k: "Sizes", v: "F10 (10 kg) and F25 (25 kg)" },
      ]}
      hero={
        <LoopingClip
          src="/videos/feeder-dispensing.mp4"
          poster="/videos/feeder-dispensing-poster.jpg"
          label="FishTech Feeder spreading feed over a pond"
          objectPosition="50% 50%"
        />
      }
      heroCaption="The first unit spreading feed over a pond."
      whatItIs={
        <>
          <p>
            A hopper holds one bag of floating pellets, and the machine feeds the right amount, more often and more
            evenly, on a schedule. It is never sold as a way to feed more.
          </p>
          <p>
            It runs on its own, with no internet, on a small solar panel. When the FishTech Precision Feeding System is
            at the same pond, it can take a grams-per-feed instruction from it over Wi-Fi, but it sells and runs
            without it. It is a working prototype: the dose test is not written up yet, so no accuracy figure is
            claimed.
          </p>
        </>
      }
      whatItDoes={[
        {
          title: "Meters each dose",
          body: "An auger turns a counted number of revolutions for each dose. Metering is by counted revolutions, never by time.",
        },
        {
          title: "Spreads it over the water",
          body: "The dose falls onto a spinning disc below the box. A shroud around the back of the disc sends feed only toward the pond.",
        },
        {
          title: "Works out the ration",
          body: "From fish size and water temperature, read by a probe on a float, split into small feeds through the day.",
        },
        {
          title: "Stays within safe limits",
          body: "The daily total is capped by pond area, and the farmer is told when the cap is reached. It warns when more than 14 days of feed is loaded.",
        },
      ]}
      how={{
        title: "Counted, cross-checked, safe when off.",
        body: (
          <>
            <p>
              An ESP32 controller with a battery-backed clock keeps the feeding schedule for months without internet. A
              hall-effect sensor counts the auger&apos;s revolutions. The design compares the time a dose takes with the
              revolutions counted and stops with a fault if they disagree, because a lost magnet would otherwise mean an
              over-dose that reports success.
            </p>
            <p>
              The motor drivers are wired so both motors stay off while the controller starts up. On a jam the machine
              stops, logs it and reports a partial dose. The auger is a cartridge that comes out through the door.
            </p>
          </>
        ),
        flow: {
          columns: [
            {
              title: "Inputs",
              nodes: [
                { label: "Water temperature", detail: ["Probe on a float"] },
                { label: "Iris, optional", detail: ["Grams per feed", "over Wi-Fi"] },
              ],
            },
            {
              title: "Controller",
              nodes: [{ label: "ESP32 and clock", detail: ["Feed table, schedule", "Pond-area cap"], accent: true }],
            },
            { title: "Metering", nodes: [{ label: "Auger", detail: ["Counted revolutions", "Hall sensor"] }] },
            { title: "Pond", nodes: [{ label: "Spinning disc", detail: ["Spreads toward", "the water"] }] },
          ],
          summary:
            "Water temperature from a probe on a float, and optionally a grams-per-feed instruction from Iris over Wi-Fi, reach the ESP32 controller with its clock, feed table and pond-area cap. It turns the auger a counted number of revolutions, checked by a hall sensor, and the dose falls onto a spinning disc that spreads it toward the water.",
        },
      }}
      stack={[
        {
          label: "Electronics",
          items: ["ESP32-WROOM-32", "DS3231 real-time clock", "DS18B20 water temperature probe", "Hall-effect sensors", "MOSFET motor drivers"],
        },
        { label: "Power", items: ["20 W solar panel", "12 V battery inside the box", "Solar charge controller"] },
        {
          label: "Build",
          items: ["Welded mild steel, galvanised sheet", "Rolled-cone hopper", "Arduino on PlatformIO", "Parametric CAD in build123d (Python)"],
        },
      ]}
      screens={{
        note: "Photos of the first unit. Tap one to open it.",
        items: [
          { kind: "image", src: "/images/feeder/feeder-mechanism.jpg", alt: "FishTech Feeder with the door open, showing the auger and electronics" },
          { kind: "image", src: "/images/feeder/feeder-pond-sunset.jpg", alt: "The FishTech Feeder beside a fish pond at dusk" },
          { kind: "image", src: "/images/feeder/feeder-pond-visitors.jpg", alt: "Visitors at the FishTech Feeder beside the pond" },
        ],
      }}
      cta={{
        eyebrow: "// similar problem? let's talk",
        title: "Building hardware that has to work without the internet?",
        body: "Embedded control, solar power and firmware that fails safe. The same approach fits other farm and field machines.",
      }}
    />
  );
}
