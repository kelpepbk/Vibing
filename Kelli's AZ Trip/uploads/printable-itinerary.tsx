const terra = "#E8742C";
const darkTerra = "#A44A2E";
const sand = "#F5E6D8";
const plum = "#7A5680";
const charcoal = "#2D1A1F";
const mid = "#6B4954";
const lt = "#D49A7A";
const sky = "#4A82B8";
const cream = "#FBF5ED";

const Tag = ({ children, color }) => (
  <span style={{ background: color || terra, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, marginLeft: 5, display: "inline-block" }}>{children}</span>
);

const Block = ({ label, title, children, dark, green, brown, peace, blue }) => {
  let bg = sand, lc = darkTerra, tc = charcoal, txc = mid;
  if (dark) { bg = charcoal; lc = lt; tc = "#fff"; txc = "rgba(255,255,255,0.7)"; }
  if (green) { bg = "#3D5A3D"; lc = "#C5DEB5"; tc = "#fff"; txc = "rgba(255,255,255,0.78)"; }
  if (brown) { bg = "#5C2818"; lc = lt; tc = "#fff"; txc = "rgba(255,255,255,0.75)"; }
  if (peace) { bg = plum; lc = "#E5D4F0"; tc = "#fff"; txc = "rgba(255,255,255,0.78)"; }
  if (blue) { bg = `linear-gradient(135deg, ${charcoal}, #1A1428)`; lc = sky; tc = "#fff"; txc = "rgba(255,255,255,0.75)"; }
  return (
    <div style={{ background: bg, borderRadius: 8, padding: "12px 14px", marginBottom: 10, breakInside: "avoid" }}>
      {label && <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: lc, marginBottom: 5 }}>{label}</div>}
      {title && <div style={{ fontSize: 14, fontFamily: "Georgia, serif", color: tc, marginBottom: 4, fontWeight: 700 }}>{title}</div>}
      <div style={{ fontSize: 11, color: txc, lineHeight: 1.65 }}>{children}</div>
    </div>
  );
};

const Row = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 10 }}>{children}</div>
);

const SBlock = ({ label, title, children, par, stats }) => (
  <div style={{ background: sand, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${par ? plum : terra}`, breakInside: "avoid" }}>
    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: par ? plum : terra, marginBottom: 5 }}>{label}</div>
    {title && <div style={{ fontSize: 13, fontFamily: "Georgia, serif", color: charcoal, marginBottom: 3, fontWeight: 700 }}>{title}</div>}
    {stats && <div style={{ fontSize: 10, color: darkTerra, fontWeight: 700, marginBottom: 4 }}>{stats}</div>}
    <div style={{ fontSize: 11, color: mid, lineHeight: 1.55 }}>{children}</div>
  </div>
);

const ImgHero = ({ url, alt, height = 180, caption }) => (
  <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 12, breakInside: "avoid", position: "relative" }}>
    <img src={url} alt={alt} style={{ width: "100%", height, objectFit: "cover", display: "block" }} />
    {caption && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(45,26,31,0.85))", color: "#fff", padding: "16px 14px 10px", fontSize: 11, fontFamily: "Georgia, serif", fontStyle: "italic" }}>{caption}</div>}
  </div>
);

const DayHeader = ({ num, title, date }) => (
  <div style={{ background: `linear-gradient(135deg, ${terra}, ${darkTerra})`, padding: "16px 20px", borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", gap: 14, breakInside: "avoid" }}>
    <div style={{ fontFamily: "Georgia, serif", fontSize: 32, color: "rgba(255,255,255,0.3)", fontStyle: "italic", lineHeight: 1 }}>{num}</div>
    <div>
      <div style={{ fontSize: 17, fontFamily: "Georgia, serif", color: "#fff", fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>{date}</div>
    </div>
  </div>
);

const DayCard = ({ children }) => (
  <div style={{ background: "#fff", borderRadius: 10, marginBottom: 22, overflow: "hidden", boxShadow: "0 2px 12px rgba(45,26,31,0.08)", border: `1px solid ${lt}`, breakInside: "avoid" }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: terra, margin: "26px 0 14px", display: "flex", alignItems: "center", gap: 12 }}>
    {children}
    <div style={{ flex: 1, height: 1, background: lt, opacity: 0.5 }} />
  </div>
);

export default function App() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: cream, padding: "16px 12px", maxWidth: 800, margin: "0 auto" }}>

      {/* HERO */}
      <div style={{ background: `linear-gradient(160deg, ${darkTerra} 0%, ${terra} 50%, ${lt} 100%)`, borderRadius: 14, padding: "36px 20px 30px", textAlign: "center", marginBottom: 20, position: "relative", overflow: "hidden", breakInside: "avoid" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 20%, rgba(74,130,184,0.18) 0%, transparent 60%)` }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>May 9–15, 2026</div>
          <div style={{ fontSize: "clamp(28px, 7vw, 42px)", color: "#fff", lineHeight: 1.1, marginBottom: 8, fontFamily: "Georgia, serif" }}>Red Rock <em style={{ color: "#FFD9B5" }}>Arizona</em></div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", letterSpacing: 1, marginBottom: 18 }}>Las Vegas · Zion · Sedona · Page · Flagstaff</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
            {["5 travelers","🥾 Sisters hike","👴👵 Parents explore","🌿 Vegetarian","🌌 Stargazing","🏛️ Ancient ruins","💧 Swimming"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 16, padding: "4px 11px", fontSize: 10, color: "#fff", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PROLOGUE */}
      <div style={{ background: `linear-gradient(180deg, #2D1A1F 0%, #4A2A2F 100%)`, borderRadius: 14, padding: "40px 24px", marginBottom: 24, color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", color: lt, opacity: 0.8 }}>Prologue</div>
        <div style={{ fontSize: "clamp(28px, 6vw, 38px)", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#FFD9B5", marginTop: 30, marginBottom: 22, fontWeight: 400 }}>The Journey</div>
        <div style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.9)", textAlign: "left", maxWidth: 560, margin: "0 auto", fontFamily: "Georgia, serif" }}>
          <p style={{ marginBottom: 14 }}>It started the way most things worth doing start — casually, without warning, with no real plan to follow through.</p>
          <p style={{ marginBottom: 14 }}>Kelli said she was going to Arizona. Just like that. Not an invitation exactly — more of an announcement. The kind you make when you half-expect everyone to politely decline and go back to their lives.</p>
          <p style={{ marginBottom: 14 }}>They didn't decline.</p>
          <p style={{ marginBottom: 14 }}>Months of planning followed — spreadsheets, bookings, seventeen versions of the same itinerary — but none of that is the point. The point is that one offhand sentence from one person lit the whole thing up.</p>
          <p style={{ marginBottom: 14 }}>That's usually how it goes with family. You don't decide to show up for each other. You just do.</p>
          <p style={{ marginBottom: 0, fontStyle: "italic", color: "#FFD9B5" }}>Mom, Dad, Sarah, Kelli, and Lizzie. Red rock country, one week in May. There are worse ways to spend a life.</p>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,217,181,0.7)", marginTop: 26 }}>May 9–15, 2026 · Las Vegas · Zion · Sedona · Page · Flagstaff</div>
      </div>

      {/* GROUND RULES */}
      <div style={{ background: "#FFF1E0", borderLeft: `4px solid ${terra}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 12, color: mid, lineHeight: 1.7 }}>
        <strong style={{ color: darkTerra }}>☀️ May ground rules:</strong> Sedona hits 90–95°F. Sisters on trail by 8:00–8:30 AM. Carry 2L+ water. Grand Canyon rim is 7,000 ft — bring a layer. Stargazing nights drop to ~50°F. Trail runners or hiking boots only.
      </div>

      {/* PACKING */}
      <SectionTitle>Hiking Pack Checklist</SectionTitle>
      <div style={{ background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 2px 12px rgba(45,26,31,0.08)", border: `1px solid ${lt}`, breakInside: "avoid", marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: mid, marginBottom: 12, fontStyle: "italic" }}>From your Sedona Visitor Guide — every sister, every hike.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
          {[
            ["Daypack", "Lightweight, room for snacks + layers"],
            ["Hiking shoes / trail runners", "Good grip — no sandals"],
            ["Wool socks", "Bring extras"],
            ["Hydration", "2L+ per person per hike"],
            ["AllTrails app", "Download offline maps"],
            ["Headlamp", "Cathedral Rock sunset return"],
            ["Trekking poles", "Optional, helpful Soldier Pass"],
            ["Sunscreen + SPF Chapstick", "Reapply every 2 hrs"],
            ["Wide-brim hat + sunglasses", "Non-negotiable"],
            ["Light jacket", "Canyon shade + evenings"],
            ["Breathable layers", "30–40°F swing dawn to noon"],
            ["Mini first aid kit", "Tweezers, blister care"],
            ["Snacks", "Trail mix, bars, fruit"],
            ["Swimsuit + water shoes", "Grasshopper + Crescent Moon"],
            ["Warm jacket — stargazing", "Drops to 50°F at night"],
            ["America the Beautiful Pass", "$80 — buy before leaving"],
          ].map(([name, detail]) => (
            <div key={name} style={{ display: "flex", gap: 8, padding: "6px 0" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${terra}`, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: charcoal }}>{name}</div>
                <div style={{ fontSize: 10, color: mid }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>The Journey Begins</SectionTitle>

      {/* DAY 1 */}
      <DayCard>
        <DayHeader num="01" title="Las Vegas Arrival" date="Saturday, May 9 · All 5 together" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="✈️ Everyone" title="Fly in · Check into Hilton Elara">Easy first evening on the Strip. Only night all five are together in LV — no agenda, just relax and reconnect.</Block>
          <Block label="🍽️ Dinner" title="Strip dinner — your call" dark>Walk from the Elara. Keep it simple and fun.</Block>
          <Block label="🚗 Sisters depart by 8:00 PM LV time" title="Drive to Springdale, Utah (~2.5 hrs)" dark>Check into Best Western Plus Zion Canyon Inn. Straight to bed — 6:30 AM trailhead tomorrow is the one non-negotiable early morning of the trip.</Block>
        </div>
      </DayCard>

      {/* DAY 2 */}
      <DayCard>
        <DayHeader num="02" title="Zion National Park" date="Sunday, May 10 · Sisters hike · Parents relax LV" />
        <div style={{ padding: "16px 18px" }}>
          <Row>
            <SBlock label="🥾 Sisters — 6:30 AM" title="Canyon Overlook Trail" stats="1 mi RT · Easy · No permit">East of Zion-Mt. Carmel Tunnel. Best panoramic views with far fewer crowds. The park's sleeper hit.</SBlock>
            <SBlock label="🥾 Sisters — ~8:30 AM" title="Riverside Walk" stats="2.2 mi RT · Paved · Easy">Follows the Virgin River into The Narrows. Stop at the water's edge.</SBlock>
          </Row>
          <SBlock label="👴👵 Parents" title="Relaxed LV morning" par>Pool, casino, late breakfast. Zero pressure. Their trip begins properly tomorrow.</SBlock>
          <div style={{ marginTop: 10 }}><Block label="🚗 Sisters depart Springdale ~1:00 PM · Gain the hour back" title="Back in Las Vegas by ~4:30 PM">Reunite with parents. Quick dinner before the show.</Block></div>
          <Block label="🎬 All together · Evening" title="Wizard of Oz at the Sphere ✨" dark>
            255 Sandy Ave · The Sphere's reimagined immersive Wizard of Oz · Generative AI-extended visuals, 16K wraparound LED, 4D haptic seats, atmospheric effects · ~90 min · A genuinely once-in-a-lifetime visual experience to cap a huge day · <strong style={{color:"#fff"}}>Book tickets in advance</strong>
          </Block>
        </div>
      </DayCard>

      <SectionTitle>Sedona Begins</SectionTitle>

      {/* DAY 3 */}
      <DayCard>
        <DayHeader num="03" title="LV → Grand Canyon → Sedona" date="Monday, May 11 · Depart 9:00 AM" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="🚗 Depart 9:00 AM via I-40 East through Williams" title="Grand Canyon South Rim (~4 hrs)">Arrive ~1:00 PM. Pull into <strong>Mather Point</strong> — stand on the rim for 45–60 min. Paved, flat, fully accessible for Mom and Dad. Nothing prepares you for the scale of this place. Then continue south ~2 hrs to Sedona via SR-89A through Oak Creek Canyon.</Block>
          <Block label="🏠 Arrive Sedona ~3:30 PM · Then ~5:30 PM" title="Airport Mesa Scenic Lookout">538 Airport Rd, $3 parking. 360° panorama of Cathedral Rock, Bell Rock, Courthouse Butte. No hiking — accessible for all. Arrive 90 min before sunset.</Block>
          <Block label="🍽️ Dinner" title="Mariposa Latin Inspired Grill" dark>700 W AZ-89A · Panoramic red rock terrace · Local sourcing · Book well in advance · $$ <Tag color={plum}>VEG</Tag></Block>
        </div>
      </DayCard>

      {/* DAY 4 */}
      <DayCard>
        <DayHeader num="04" title="Long Canyon · Broken Arrow · Swimming · Jerome · Stargazing" date="Tuesday, May 12" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="🍵 Morning matcha" title="Local Juicery" green>3150 W State Rt 89A · Open 8 AM · On the way to Boynton Pass Rd trailheads · Ceremonial matcha + breakfast bowls for the trail</Block>
          <Row>
            <SBlock label="🥾 Sisters — 9:00 AM" title="Long Canyon Petroglyphs + Rachel's Knoll">Drive Boynton Pass Rd west (scenic). Flat canyon walk with Sinagua petroglyphs. Add Rachel's Knoll — peaceful hilltop with prayer flags. Done by 11:30 AM.</SBlock>
            <SBlock label="🥾 Sisters — ~12:00 PM" title="Broken Arrow Trail" stats="2.8 mi RT · 400 ft · Moderate">Ends at Chicken Point overlook. Alongside Pink Jeep route. Keep an eye out for BJ Rock 😏. Done by 2:00 PM.</SBlock>
          </Row>
          <SBlock label="👴👵 Parents — slow start" title="Bell Rock Trail or Airbnb porch" par>Easy, spectacular, go as far as comfortable. Save energy for swimming and Jerome.</SBlock>
          <div style={{ marginTop: 10 }}>
            <Block label="💧 All together · ~2:00 PM" title="Grasshopper Point Swimming">2.5 miles north on SR-89A. Short flat walk (¼ mi). Calm Oak Creek pool, red rock terraces, cliff jumping for sisters, wading for Dad. $15/car. Bring snacks and linger.</Block>
          </div>
          <Block label="🏚️ All together · ~3:30 PM" title="Jerome">
            30 min west via SR-89A. Former copper boomtown at 5,000 ft — cooler than Sedona. Steep main street, galleries, Mine Museum, atmospheric bars. Allow 2.5–3 hrs.
          </Block>
          <Block label="🍽️ Dinner" title="Restaurant Forty1 at Ambiente" dark>900 W AZ-89A · Two MICHELIN Keys · Verde Valley local sourcing · New spring 2026 menu · Dedicated vegan menu · Rooftop red rock views · Reserve on OpenTable now · $$ <Tag color={plum}>VEGAN MENU</Tag></Block>
          <Block label="🌌 After dark — All together" title="Sedona Stargazing Tour" blue>Evening Sky Tours (eveningskytours.com) or Viator · Professional astronomer, large telescopes, ~2 hrs · <strong style={{color:"#fff"}}>Bring warm layers — drops to 50°F</strong> · International Dark Sky Community · The magic moment of the entire trip.</Block>
        </div>
      </DayCard>

      {/* DAY 5 */}
      <DayCard>
        <DayHeader num="05" title="Page Day Trip — Antelope Canyon + Horseshoe Bend" date="Wednesday, May 13 · Depart 7:30 AM" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="🍵 On the way out" title="Sedona Juice Co." green>6657 AZ-179, Village of Oak Creek · Open 8:30 AM · Right on your route south · Matcha Bliss with cashew milk, spirulina, ashwagandha</Block>
          <Block label="🚗 7:30 AM · SR-89A North through Oak Creek Canyon" title="Pull over at Canyon Overlook (15 min)">Continue through Flagstaff then US-89 North. Arrive Page ~10:00 AM.</Block>
          <Block label="🦕 ~9:30 AM near Tuba City" title="Tuba City Dinosaur Tracks">Real 200M-year-old Jurassic tracks in open rock. Free, flat, 30–45 min. Navajo guides — tip $10–20 for the group.</Block>
          <Block label="📸 ~11:30 AM" title="Upper Antelope Canyon Tour">Navajo-guided slot canyon — narrow sandstone corridors with light beams from above. ~1 hr. Flat, accessible for Mom and Dad. <strong>Book today — May sells out weeks ahead.</strong> Antelope Canyon Tours by Carolene Ekis.</Block>
          <Block label="🌊 ~2:30 PM" title="Horseshoe Bend">
            1001 Page Pkwy. Easy 1.5 mi RT walk. Colorado River horseshoe curve 1,000 ft below. Staggering scale. $10/car. Best in late afternoon light.
          </Block>
          <Block label="🍽️ Dinner" title="Sunset 89" dark>724 US-89, Page · Above the Colorado River · Pacific Rim · Go at sunset · Reserve ahead · $ <Tag color={plum}>VEG</Tag></Block>
          <Block label="🚗 Depart Page ~8:00 PM" title="Back at Airbnb ~9:30 PM">Long day — rest up. Tomorrow ends under the stars.</Block>
        </div>
      </DayCard>

      {/* DAY 6 */}
      <DayCard>
        <DayHeader num="06" title="Soldier Pass · Cathedral Rock Sunset" date="Thursday, May 14 · Final full day" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="🍵 Morning matcha" title="Local Juicery" green>3150 W State Rt 89A · Open 8 AM · Ceremonial grade organic matcha from Aichi, Japan · Queen Matcha smoothie or boosted matcha latte · Great breakfast for Kelli</Block>
          <Row>
            <SBlock label="🥾 Sisters — 9:00 AM" title="Soldier Pass Trail + Cave" stats="4.5 mi loop · 800 ft · 2–3 hrs">Devil's Kitchen → Seven Sacred Pools → steep cave spur. Only scramble up if confident. Back by 12:30 PM.</SBlock>
            <SBlock label="👴👵 Parents" title="Tlaquepaque Arts Village" par>336 AZ-179. Flat, shaded courtyards, Secret Garden Cafe. A perfect slow morning.</SBlock>
          </Row>
          <Block label="🌅 All together · ~6:30 PM" title="Cathedral Rock Sunset + Crescent Moon Ranch">Sisters hike to the saddle (1.2 mi, 741 ft, light scrambling — bring headlamps). Mom and Dad walk the flat path through Crescent Moon Ranch to Oak Creek. <strong>Dad can wade or swim here.</strong> Rocks turn blood-orange at golden hour.</Block>
          <Block label="🍽️ Dinner" title="Elote Cafe" dark>350 Jordan Rd · 25 years Arizona local sourcing · Legendary elote · No reservations — arrive 25 min before 5 PM · Closed Mon/Sun · $$ <Tag color={plum}>KELLI'S PICK</Tag></Block>
          <Block label="🍫 Dessert after dinner" title="ChocolaTree Organic Eatery" brown>1595 AZ-89A · Open until 8 PM · Handmade raw chocolates · Fair-trade Ecuadorian cacao · Garden seating <Tag color={plum}>VEGAN</Tag></Block>
        </div>
      </DayCard>

      <SectionTitle>Departure Day</SectionTitle>

      {/* DAY 7 */}
      <DayCard>
        <DayHeader num="07" title="Sedona → Flagstaff → Everyone Flies Home" date="Friday, May 15 · Parents 12:21 PM · Sisters 2 PM Vegas" />
        <div style={{ padding: "16px 18px" }}>
          <Block label="🍩 Before 9 AM or they sell out" title="Sedonuts">Red Rock Velvet, Red Rock Chocolate, organic coffee. Non-negotiable final morning treat.</Block>
          <Row>
            <SBlock label="👴👵 Parents — depart 9:30 AM" title="Sedona → Flagstaff Pulliam Airport ✈️" par>~45 min drive. Drop-off by 10:30 AM for the 12:21 PM flight. What a trip.</SBlock>
            <SBlock label="✈️ Sisters — depart by 8:00 AM" title="Drive to Las Vegas (~4.5 hrs)">Sisters leave Sedona earlier. Arrive Harry Reid by 12:30 PM for 2 PM flights. ✅</SBlock>
          </Row>
          <div style={{ marginTop: 10, fontSize: 11, color: mid, fontStyle: "italic", lineHeight: 1.6, padding: "8px 12px", background: sand, borderRadius: 6 }}>💡 Two separate departures from the Airbnb that morning — sisters head west to Vegas earlier, parents head east to Flagstaff later.</div>
        </div>
      </DayCard>

      {/* EPILOGUE */}
      <div style={{ background: `linear-gradient(180deg, #4A2A2F 0%, #2D1A1F 100%)`, borderRadius: 14, padding: "40px 24px", marginTop: 28, color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", color: lt, opacity: 0.8 }}>Epilogue</div>
        <div style={{ fontSize: "clamp(26px, 6vw, 36px)", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#FFD9B5", marginTop: 30, marginBottom: 22, fontWeight: 400 }}>Until the next one...</div>
        <div style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.9)", textAlign: "left", maxWidth: 560, margin: "0 auto", fontFamily: "Georgia, serif" }}>
          <p style={{ marginBottom: 14 }}>There's a thing that happens at the end of a trip like this. You're tired in the good way — the kind that lives in your legs and your eyes, not your spirit. You've seen things you can't quite describe to people who weren't there.</p>
          <p style={{ marginBottom: 14 }}>The way the canyon walls turned red at four in the afternoon. The cold shock of a creek in May. A sky so full of stars it felt like a dare.</p>
          <p style={{ marginBottom: 14 }}>You don't take a trip like this to escape your life. You take it to remember what your life is made of.</p>
          <p style={{ marginBottom: 14 }}>Family is a strange and stubborn thing. It survives distance and silence and all the ordinary ways people drift apart. And then someone says <em style={{ color: "#FFD9B5" }}>I'm going to Arizona, anyone want to come?</em> — and just like that, you're all together again, standing on the edge of something enormous, laughing about nothing, alive in the best possible way.</p>
          <p style={{ marginBottom: 14 }}>That's the whole point. Not the hikes or the sunsets or the ancient walls. Those are just the backdrop. The point is the five of you, out in the world, choosing to be there together.</p>
          <p style={{ marginBottom: 0, fontStyle: "italic", color: "#FFD9B5", textAlign: "center", fontSize: 15 }}>Here's to more of it.</p>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,217,181,0.7)", marginTop: 26 }}>May 9–15, 2026 · Las Vegas · Zion · Sedona · Page · Flagstaff</div>
      </div>

      <div style={{ textAlign: "center", padding: "28px 0 14px", fontSize: 11, color: mid, opacity: 0.6, letterSpacing: 1, fontStyle: "italic" }}>
        With love · May 9–15, 2026 · Kelli · Sarah · Lizzie · Mom · Dad 🌵
      </div>
    </div>
  );
}
