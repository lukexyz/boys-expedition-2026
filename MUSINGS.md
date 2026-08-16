# MUSINGS.md

Working notes from the session that produced this map. Written for whoever picks
this up later — including me, next time. Personal details have been stripped:
names, emails, account handles, booking references and device identifiers are
redacted as `[redacted]`.

---

## 1. What was actually asked for

The brief arrived in three waves, which is worth recording because the shape of
the final thing is a direct consequence of that.

**Wave one.** A slide deck (8 slides, "Dolomites 2026: The Boys' Expedition")
plus a set of hike links forwarded from a friend, and one line of instruction:

> "Andtbh I just want it all mapped out on a single map. Make it look cool tho.
> Use pop-outs with images, and labels for each night."

**Wave two.** Deploy it to GitHub Pages.

**Wave three.** A screenshot of an *earlier* proposal for the same trip — a
hand-annotated Google Maps export with photo cards pinned around the edges,
numbered badges, and a summary box in the corner — with:

> "could you get some inspiration from this image? I want to see epic pictures
> of each place. I also want to see the full travel path (optional paths in
> dotted lines). Also can you add the summary section thingy, and a nav along
> the top to choose what day."

Wave three is the one that mattered. The first version was a conventional
sidebar-plus-map layout: perfectly serviceable, and completely unlike the thing
being asked for. The reference image was a *layout* instruction disguised as a
mood board — full-bleed map, content floating on top of it, photography doing
the heavy lifting rather than a list of text. Rebuilding around that was the
right call and I should have inferred it earlier from "make it look cool."

---

## 2. Source material

### From the deck (bookings — these are fixed)

| | |
|---|---|
| Flights | Ryanair, London Stansted ↔ Venice Marco Polo. Out Tue 18 Aug 07:40→10:45. Back Sun 23 Aug 15:50→17:10. Priority + 2 cabin bags booked. |
| Cars | Two hire cars booked, including a VW T-Cross auto. Pick up VCE P1 car park 3rd floor, Tue 18 Aug 11:00. Drop Sun 23 Aug 14:00. |
| Nights 1–3 | Entire-home Airbnb, San Vito di Cadore. 5 beds / 6 guests. 18→21 Aug. |
| Night 4 | Rifugio Re Alberto, 2,621m, beneath the Vajolet Towers. 6 beds shared. Half board, dinner 18:30–19:15 only. Liners mandatory. Booking ref `[redacted]`. |
| Night 5 | Rifugio Fermeda, 2,109m, Seceda. Wooden room, en-suite, outdoor sauna + hot tub. |
| Tre Cime parking | Pass `[redacted]`, pre-booked for **Thu 20 Aug**, €40, valid 12h. |

### From the friend's message (the hikes)

Numbered as *they* numbered them, which is not the same as day order:

1. Rifugio Nuvolau & Averau loop — thephotohikes.com
2. Lagazuoi tunnels **or** Piz Boè summit — inafarawayland.com (undecided)
3. Cadini di Misurina + Tre Cime di Lavaredo — thephotohikes.com
4. Torri del Vajolet — thephotohikes.com
5. Seceda ridgeline — thephotohikes.com, "either do this on Saturday evening"

Every page was fetched for distance, ascent, duration, trailhead, parking and
gear. Numbers in the map come from those guides, not from memory.

---

## 3. The scheduling problem, and how it was resolved

The deck's phase numbering and the friend's hike numbering disagree with each
other *and* with the bookings. The deck says "Day 1: Tre Cime", but the Tre Cime
parking pass is dated Thursday 20 Aug — which is day three of a trip that starts
Tuesday. Something had to give.

The approach was to treat the **hard constraints as immovable** and let the
flexible hikes fill the gaps:

- Tue 18 — flights and car pickup are timed. Arrive San Vito ~13:30.
- Thu 20 — Tre Cime, because the parking ticket says so.
- Fri 21 — Re Alberto is booked for that night, and the hut needs a 5½h approach
  plus an 18:00 arrival, so the whole day is spoken for.
- Sat 22 — Fermeda is booked, so: descend, drive to Ortisei, Seceda.
- Sun 23 — both cars back at 14:00, fly 15:50.

That leaves exactly two open windows — Tuesday afternoon and Wednesday — for
Hikes 1 and 2. The map assigns Nuvolau to Tuesday (8.8km / 620m is achievable on
an arrival afternoon, and sunset from the oldest hut in the Dolomites is the
single best-value thing on the list) and the big Hike 2 to Wednesday. Both are
labelled as swappable rather than presented as settled, because they genuinely
aren't.

**Hike 2 is drawn both ways.** Lagazuoi is the default; Piz Boè is on an
"Optional" toggle. The deciding factor isn't difficulty — it's that Piz Boè is
~1h20 of driving each way against 40 minutes to Falzarego. That's the fact worth
surfacing, so it's in the card.

One thing the map made visible that the deck didn't: **both cars sleep in Vigo di
Fassa on Friday night** while the group is up at Re Alberto. Everything that
isn't going up the mountain stays in the boots. That falls straight out of
drawing the drive and the hike as separate lines.

---

## 4. Design decisions

**Full-bleed map, floating panels.** Straight from the reference image. The map
is the page; everything else sits on top with backdrop blur.

**Photo cards with leader lines.** The distinctive move in the reference is
photo cards around the edges with numbered badges tying them to map locations. I
render up to three per day in a right-hand column, each with a matching numbered
pin on the map, joined by a curved amber dashed line drawn in a fixed SVG
overlay and recomputed on every `move`/`zoom`. Lines are suppressed when the
target is off-screen or sits underneath the card column — a leader line pointing
at nothing looks broken.

**Day nav across the top.** Chips for Overview + each date, with prev/next
arrows and left/right arrow keys. Selecting a day swaps the routes, pins,
waypoints, photo cards and brief, then flies the map to that day's frame.

**"Tonight's bed" marker.** The ask was to see "where our location is supposed
to be." A pulsing amber halo with the accommodation name renders at each day's
end point. It sits *behind* the numbered pins in z-order so it reads as a halo
rather than covering them.

**Route semantics, encoded in line style:**

| Style | Meaning |
|---|---|
| Solid orange, dark halo | Planned hike |
| Dashed light orange | Optional or alternate |
| Dotted blue | Driving leg |
| Long-dash green | Cable car / lift |

**Per-day framing.** First attempt fit the map to every point in the day, which
meant a 95km drive squashed the actual walking into a thumbnail. Each day now
carries an explicit `focus` list — the walking, not the driving. Drives run off
the edge of the frame, which is fine; they're still drawn, and Overview shows
the whole thing.

**Zoom-aware decluttering.** Below zoom 11.6 the map adds a `zfar` class that
hides waypoint dots and hike labels. Basecamp labels survive at every zoom, so
the Overview reads as three beds and a travel path rather than forty overlapping
text boxes.

**Lago di Braies** was carried across from the older proposal as an optional
Thursday detour, since it's 40 min from Misurina and appeared in the original
plan. Flagged honestly: the car park fills by 08:00 in August, so it's a
sunrise-or-skip.

---

## 5. Photography

All images are Creative Commons from Wikimedia Commons, loaded through
`Special:FilePath/<filename>?width=760`, which redirects to a resized version
without needing to hardcode the CDN hash path. Every `<img>` has an `onerror`
handler that hides it, so a dead file degrades to the gradient behind it rather
than a broken-image icon.

The first pass picked a village church for San Vito, which is accurate and
completely unexciting. "Epic pictures" prompted a second pass favouring the
mountain that dominates each place over the place itself — Monte Pelmo for the
valley base, the Odle group for Seceda, the Rosengarten wall for the Vajolet
approach.

---

## 6. Technical notes and things that bit

**The sandbox has almost no network.** Package registries (pypi, npm) resolve;
Wikimedia, cdnjs, and every tile server return connection failures. Consequences:

- Images could not be downloaded and embedded as data URLs. They're hotlinked,
  which is fine — the browser rendering the page has network, the build
  environment doesn't.
- Coordinates could not be geocoded via Nominatim (403 through the proxy). They
  were assembled by hand and are accurate to roughly ±100–300m, which is
  immaterial at the zoom levels involved but is *not* good enough to navigate
  from. Hence the repeated "routes are indicative, carry proper GPX" warning.
- Wikimedia filenames were found via web search restricted to
  `commons.wikimedia.org`, reading exact `File:` titles out of the result URLs,
  since the Commons API itself was unreachable.

**Verification without a network.** Testing used headless Chromium with request
interception: Leaflet's real JS and CSS served from a locally unpacked npm
tarball, and flat-colour PNGs substituted for every tile and photo. This checks
layout, geometry, event wiring and JS errors — everything except whether the
real images look good.

**The bug worth remembering.** Numbered map pins vanished — present in the DOM,
correct geometry, `visibility: visible`, and invisible on screen. Cause: the pin
markup used `class="pin card"`, and a *completely unrelated* rule for the photo
cards, `.card { overflow: hidden }`, was matching it. Leaflet `divIcon`s are
zero-by-zero boxes whose children overflow deliberately, so `overflow: hidden`
clipped every pin to nothing. Renamed the pin class to `num` and they came back.

The lesson: in a single-file artifact where CSS and generated markup share one
namespace, a generic class name like `.card` is a landmine. Prefix everything
that belongs to a subsystem. (This bit twice — the bento page's map caption used
`.t`, collided with the tile rule, and inherited `opacity: 0`.)

**A copy bug that mattered more than any of the CSS ones.** A summary tile read
"Six days, five hikes, three beds" with a stat block ending in "3 BEDS". "Beds"
meant *basecamps* — three places the group sleeps — but it reads as three people,
and the party is six. Counts in a stat block get read as headcount whether or not
that's what they mean. All party-size copy is now explicit: "6 · OF US".

**A near-miss on verification.** An earlier test run showed Leaflet's panes
stacking vertically instead of overlapping, which looked like a serious layout
bug. It was a test artifact — the harness was stubbing Leaflet's CSS with an
empty string, so `.leaflet-pane { position: absolute }` never applied. Worth
noting because the instinct was to "fix" working code. Serving the real
stylesheet made it vanish.

---

## 7. GitHub Pages deployment

Deployment could not be completed from the sandbox. The environment carries a
GitHub token that authenticates and can *read* public repositories, but writes
are scoped to repositories pre-attached to the session:

```
POST /user/repos
→ "sessions are bound to their configured repositories"
```

`git ls-remote` against an arbitrary public repo succeeds; anything
authenticated fails. There's a referenced `add_repo` mechanism to attach a
repository, but it isn't exposed as a tool in this session.

So the deploy was handed over: files written directly to the local working
directory through the desktop bridge, plus a `deploy.sh` and an equivalent
PowerShell sequence. Two constraints worth recording:

- The account is on the free plan, so **Pages requires a public repository**.
  Private-repo Pages needs Pro or above.
- Because the page is world-readable, the booking reference and parking pass
  number were stripped from the published copy and replaced with "ref is in the
  group chat." This was raised as a decision rather than done silently — the
  right instinct, since it's the user's data and their call.

---

## 8. Open questions

1. **Five beds, six guests** at the San Vito Airbnb. Someone is on a sofa bed.
   Rifugio Re Alberto's six shared beds do fit the party exactly; Rifugio Fermeda's
   room configuration is unconfirmed.
2. **Hike 1 vs Hike 2 ordering.** Nuvolau on Tuesday afternoon assumes the group
   has appetite after a 07:40 flight and a two-hour drive. If not, both slide to
   Wednesday and Thursday, and something gets dropped.
3. **Lagazuoi or Piz Boè.** Still genuinely undecided. Both drawn.
4. **Seceda timing.** Saturday-evening ridge light is the best case, but it
   depends entirely on how the Vajolet descent goes on hut sleep.
5. **Route accuracy.** Every line on this map is hand-drawn through real
   waypoints. It is an orientation aid, not a navigation tool. Download the GPX
   files from the linked guides.
6. **Sunday is tight.** Ortisei to VCE is 2h45 against a 14:00 drop for both cars. A 10:30
   departure gives one hour of slack and no more.

---

## 9. File inventory

| File | What it is |
|---|---|
| `index.html` | The whole map. Self-contained apart from Leaflet from cdnjs, map tiles, and Wikimedia photos. |
| `README.md` | Repo front page and live link. |
| `deploy.sh` | Repo creation, push, and Pages enablement in one script. |
| `MUSINGS.md` | This file. |

**Sources.** Route data adapted from thephotohikes.com and inafarawayland.com.
Photography via Wikimedia Commons. Basemaps © Esri / CARTO / OpenTopoMap /
OpenStreetMap contributors.
