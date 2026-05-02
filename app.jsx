/* Kelli's AZ Trip — components */

const { useState, useEffect, useMemo, useCallback } = React;

// ============== Countdown ==============
function Countdown({ targetISO }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetISO + "T00:00:00").getTime();
  const diff = target - now;
  const past = diff <= 0;

  const abs = Math.abs(diff);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const mins = Math.floor((abs % 3600000) / 60000);
  const secs = Math.floor((abs % 60000) / 1000);

  if (past) {
    const sinceDays = Math.floor(abs / 86400000);
    return (
      <div className="countdown countdown--past">
        <div className="countdown__msg">
          {sinceDays === 0 ? "Today is the day. ✨" : `${sinceDays} day${sinceDays === 1 ? "" : "s"} since the trip began`}
        </div>
      </div>
    );
  }

  return (
    <div className="countdown">
      {[
        ["Days", days],
        ["Hours", hours],
        ["Minutes", mins],
        ["Seconds", secs],
      ].map(([lab, n]) => (
        <div className="countdown__cell" key={lab}>
          <div className="countdown__num">{String(n).padStart(2, "0")}</div>
          <div className="countdown__lab">{lab}</div>
        </div>
      ))}
    </div>
  );
}

// ============== Hero ==============
function Hero({ data }) {
  return (
    <section className="hero" id="top">
      <div className="hero__left">
        <div className="hero__eyebrow">{data.eyebrow}</div>
        <h1 className="hero__title">
          {data.title.line1} <em>{data.title.em}</em>
        </h1>
        <p className="hero__sub">{data.sub}</p>
        <div className="hero__meta">
          {data.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <Countdown targetISO={window.TRIP_DATA.meta.startDate} />
      </div>
      <div className="hero__right">
        <img
          src={data.image}
          alt={data.credit}
          loading="eager"
          onError={(ev) => { if (data.fallback && ev.currentTarget.src !== data.fallback) ev.currentTarget.src = data.fallback; }}
        />
        <div className="hero__credit">{data.credit}</div>
      </div>
    </section>
  );
}

// ============== Route Map ==============
function RouteMap({ route, path }) {
  // Animate the dashed path drawing on view
  const [draw, setDraw] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setDraw(true), 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="map-section" id="map">
      <div className="map-card">
        <div className="map-card__head">
          <div className="map-card__eyebrow">The Route</div>
          <h2 className="map-card__title">A loop through <em>red rock country</em></h2>
          <p className="map-card__sub">Vegas to Vegas — 1,100 miles, six anchor points, two state lines, and a great deal of windshield time spent talking about nothing in particular.</p>
        </div>
        <div className="map-svg-wrap">
          <svg viewBox="0 0 1000 440" xmlns="http://www.w3.org/2000/svg" aria-label="Route map">
            <defs>
              <pattern id="topo" patternUnits="userSpaceOnUse" width="60" height="60">
                <path d="M0 30 Q15 20 30 30 T60 30" stroke="rgba(232,116,44,0.06)" strokeWidth="1" fill="none" />
                <path d="M0 50 Q15 40 30 50 T60 50" stroke="rgba(232,116,44,0.04)" strokeWidth="1" fill="none" />
                <path d="M0 10 Q15 0 30 10 T60 10" stroke="rgba(232,116,44,0.04)" strokeWidth="1" fill="none" />
              </pattern>
              <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="rgba(232,116,44,0.4)" />
                <stop offset="100%" stopColor="rgba(232,116,44,0)" />
              </radialGradient>
            </defs>
            <rect width="1000" height="440" fill="url(#topo)" />
            {/* state borders, abstract */}
            <line x1="200" y1="0" x2="200" y2="440" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 6" />
            <text x="100" y="30" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">NEVADA</text>
            <text x="270" y="30" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">UTAH</text>
            <text x="270" y="420" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">ARIZONA</text>

            {/* Travel path — order matches journey */}
            <path
              d="M 90 230 L 240 130 L 90 230 L 470 200 L 600 300 L 510 90 L 600 300 L 660 220 L 90 230"
              fill="none"
              stroke="#E8742C"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              style={{
                strokeDashoffset: draw ? 0 : 2400,
                strokeDasharray: "6 8",
                transition: "stroke-dashoffset 3s ease-out",
              }}
              opacity="0.85"
            />

            {/* Pins */}
            {route.map((p, i) => (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`} style={{ opacity: draw ? 1 : 0, transition: `opacity 0.5s ease ${0.4 + i * 0.15}s` }}>
                <circle r="22" fill="url(#glow)" />
                <circle r="6" fill="#E8742C" stroke="#fff" strokeWidth="2" />
                <text
                  x="0" y={p.id === "sedona" || p.id === "flag" ? "30" : "-14"}
                  fontSize="13"
                  fontFamily="var(--font-display)"
                  fill="#fff"
                  textAnchor="middle"
                  fontStyle="italic"
                >{p.name}</text>
                <text
                  x="0" y={p.id === "sedona" || p.id === "flag" ? "44" : "-28"}
                  fontSize="9"
                  letterSpacing="2"
                  fill="rgba(255,217,181,0.7)"
                  textAnchor="middle"
                  fontFamily="var(--font-ui)"
                  fontWeight="700"
                >{p.sub.toUpperCase()}</text>
              </g>
            ))}

            {/* compass */}
            <g transform="translate(940, 380)" opacity="0.5">
              <circle r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="0" y="-26" fontSize="10" fill="#fff" textAnchor="middle" fontFamily="var(--font-ui)" fontWeight="700">N</text>
              <path d="M 0 -14 L 4 4 L 0 0 L -4 4 Z" fill="#E8742C" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ============== Weather widget ==============
function WeatherStrip({ w }) {
  return (
    <div className="day__weather">
      <div className="day__weather-icon">{w.icon}</div>
      <div>
        <div className="day__weather-loc">{w.city}</div>
        <div className="day__weather-meta">{w.desc}</div>
      </div>
      <div className="day__weather-temp">
        {w.hi}° / {w.lo}°
        <small>Forecast</small>
      </div>
    </div>
  );
}

// ============== Event ==============
function Event({ e }) {
  if (e.row) {
    return (
      <div className="event-row">
        {e.row.map((sub, i) => <Event key={i} e={sub} />)}
      </div>
    );
  }
  return (
    <div className="event" data-tone={e.tone || "default"}>
      <div className="event__time">{e.time}</div>
      <h4 className="event__title">{e.title}</h4>
      {e.stats && <div className="event__stats">{e.stats}</div>}
      <div className="event__body" dangerouslySetInnerHTML={{ __html: e.body }} />
    </div>
  );
}

// ============== Journal ==============
const PEOPLE = ["Kelli", "Sarah", "Lizzie", "Mom", "Dad"];
const INITIAL = { Kelli: "K", Sarah: "S", Lizzie: "L", Mom: "M", Dad: "D" };

function Journal({ dayNum }) {
  const storageKey = `azjournal_d${dayNum}`;
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [who, setWho] = useState(PEOPLE[0]);
  const [text, setText] = useState("");

  const save = (next) => {
    setEntries(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const add = () => {
    const t = text.trim();
    if (!t) return;
    const entry = {
      who,
      text: t,
      at: new Date().toISOString(),
    };
    save([...entries, entry]);
    setText("");
  };

  const remove = (i) => {
    const next = entries.slice();
    next.splice(i, 1);
    save(next);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) add();
  };

  const formatWhen = (iso) => {
    const d = new Date(iso);
    const today = new Date();
    const sameDay = d.toDateString() === today.toDateString();
    if (sameDay) return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="journal">
      <div className="journal__head">
        <div className="journal__title">Journal · Day {dayNum}</div>
        <div className="journal__sub">five voices, one trip</div>
      </div>

      <div className="journal__entries">
        {entries.length === 0 ? (
          <div className="entry">
            <div className="entry__avatar" style={{ background: "transparent", color: "var(--muted)", border: "2px dashed currentColor", boxShadow: "none" }}>+</div>
            <div className="entry__bubble">
              <div className="entry__placeholder">No entries yet. After this day happens, come back and add what stuck with you.</div>
            </div>
          </div>
        ) : entries.map((e, i) => (
          <div className="entry" key={i}>
            <div className="entry__avatar" data-who={e.who}>{INITIAL[e.who] || "?"}</div>
            <div className="entry__bubble">
              <div className="entry__head">
                <div className="entry__who">{e.who}</div>
                <div className="entry__when">{formatWhen(e.at)}</div>
                <button
                  onClick={() => remove(i)}
                  style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 11, opacity: 0.5 }}
                  aria-label="Delete entry"
                  title="Delete"
                >×</button>
              </div>
              <div className="entry__text">{e.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="journal__add">
        <select className="journal__select" value={who} onChange={(ev) => setWho(ev.target.value)} aria-label="Who's writing">
          {PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input
          className="journal__input"
          type="text"
          placeholder="Add a memory from this day…"
          value={text}
          onChange={(ev) => setText(ev.target.value)}
          onKeyDown={onKey}
        />
        <button className="journal__btn" onClick={add} disabled={!text.trim()}>Post</button>
      </div>
    </div>
  );
}

// ============== Day ==============
function Day({ d }) {
  return (
    <article className="day" id={`day-${d.num}`} data-screen-label={`${d.num} ${d.title}`}>
      <div className="day__media-wrap">
        <div className={`day__media ${d.image2 ? "day__media--double" : ""}`}>
          <div className="day__media-img">
            <img
              src={d.image}
              alt={d.caption}
              loading="lazy"
              onError={(ev) => { if (d.fallback && ev.currentTarget.src !== d.fallback) ev.currentTarget.src = d.fallback; }}
            />
            <div className="day__media-caption">{d.caption}</div>
          </div>
          {d.image2 && (
            <div className="day__media-img">
              <img
                src={d.image2}
                alt={d.caption2 || d.caption}
                loading="lazy"
              />
              <div className="day__media-caption">{d.caption2}</div>
            </div>
          )}
        </div>
      </div>
      <div className="day__body">
        <div className="day__head">
          <div className="day__num">{d.num}</div>
          <div>
            <div className="day__date">{d.date}</div>
            <h3 className="day__title">{d.title}</h3>
            <div className="day__assignment">{d.assignment}</div>
          </div>
        </div>
        <WeatherStrip w={d.weather} />
        <div className="day__schedule">
          {d.events.map((e, i) => <Event key={i} e={e} />)}
        </div>
        <Journal dayNum={d.num} />
      </div>
    </article>
  );
}

// ============== Packing ==============
function Packing({ items }) {
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem("azpacking");
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  const toggle = (name) => {
    const next = { ...checked, [name]: !checked[name] };
    setChecked(next);
    try { localStorage.setItem("azpacking", JSON.stringify(next)); } catch {}
  };
  return (
    <section className="section" id="packing">
      <div className="section__eyebrow">Pack list</div>
      <h2 className="section__title">Hiking pack <em>checklist</em></h2>
      <p className="section__intro">From the Sedona Visitor Guide — every sister, every hike. Tap to check off. Saves to this browser.</p>
      <div className="packing-grid">
        {items.map(([name, detail]) => (
          <div
            key={name}
            className={`pack-item ${checked[name] ? "is-checked" : ""}`}
            onClick={() => toggle(name)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => { if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); toggle(name); } }}
          >
            <div className="pack-item__check" />
            <div>
              <div className="pack-item__name">{name}</div>
              <div className="pack-item__detail">{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============== Passage ==============
function Passage({ data }) {
  return (
    <section className="passage" id={data.eyebrow.toLowerCase()}>
      <div className="passage__inner">
        <div className="passage__eyebrow">{data.eyebrow}</div>
        <h2 className="passage__title">{data.title}</h2>
        <div className="passage__body">
          {data.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          {data.closer && <p style={{ fontStyle: "italic", color: "#FFD9B5", marginTop: 24 }}>{data.closer}</p>}
        </div>
        <div className="passage__sig">{data.sig}</div>
      </div>
    </section>
  );
}

// ============== Top nav ==============
function TopNav({ days }) {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, (window.scrollY / max) * 100));

      // active day detection
      const ids = ["top", "map", ...days.map(d => `day-${d.num}`), "packing", "epilogue"];
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [days]);

  return (
    <>
      <div className="scroll-progress"><div className="scroll-progress__fill" style={{ width: progress + "%" }} /></div>
      <nav className="topnav">
        <div className="topnav__inner">
          <a href="#top" className="topnav__brand">
            Kelli's AZ Trip
            <small>May 9–15 · 2026</small>
          </a>
          <div className="topnav__links">
            <a href="#map" className={`topnav__link ${active === "map" ? "is-active" : ""}`}>Route</a>
            {days.map(d => (
              <a key={d.num} href={`#day-${d.num}`} className={`topnav__link ${active === `day-${d.num}` ? "is-active" : ""}`}>
                Day {d.num}
              </a>
            ))}
            <a href="#packing" className={`topnav__link ${active === "packing" ? "is-active" : ""}`}>Pack</a>
            <a href="#epilogue" className={`topnav__link ${active === "epilogue" ? "is-active" : ""}`}>End</a>
          </div>
        </div>
      </nav>
    </>
  );
}

// ============== Tweaks ==============
function Tweaks() {
  const defaults = window.TWEAK_DEFAULTS;
  const [tweaks, setTweak] = useTweaks(defaults);

  // apply to root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tweaks.theme);
    root.setAttribute("data-density", tweaks.density);
    document.body.classList.toggle("no-imagery", !tweaks.imagery);
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakRadio
          value={tweaks.theme}
          onChange={(v) => setTweak("theme", v)}
          options={[
            { value: "default", label: "Sand" },
            { value: "dusk", label: "Dusk" },
            { value: "noon", label: "Noon" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Density">
        <TweakRadio
          value={tweaks.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "cozy", label: "Cozy" },
            { value: "comfy", label: "Comfy" },
            { value: "spacious", label: "Spacious" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Imagery">
        <TweakToggle
          checked={tweaks.imagery}
          onChange={(v) => setTweak("imagery", v)}
          label="Show photos"
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ============== App ==============
function App() {
  const D = window.TRIP_DATA;
  return (
    <>
      <TopNav days={D.days} />
      <Hero data={D.hero} />
      <div className="rules">
        <div className="rules__inner">
          <strong>☀️ May ground rules:</strong> {D.rules}
        </div>
      </div>
      <RouteMap route={D.route} path={D.routePath} />
      <Passage data={D.prologue} />
      <section className="section" id="days">
        <div className="section__eyebrow">The Days</div>
        <h2 className="section__title">Seven days, <em>one loop</em></h2>
        <p className="section__intro">Each day has a journal at the bottom: drop your memories at the end of the day.</p>
        <div className="days">
          {D.days.map(d => <Day key={d.num} d={d} />)}
        </div>
      </section>
      <Packing items={D.packing} />
      <Passage data={D.epilogue} />
      <footer className="footer">
        With love · May 9–15, 2026 · Kelli · Sarah · Lizzie · Mom · Dad 🌵
      </footer>
      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
