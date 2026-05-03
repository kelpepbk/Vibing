/* Kelli's AZ Trip — components */

const { useState, useEffect, useMemo, useCallback } = React;

// ============== Supabase client ==============
const _db = (() => {
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_ANON_KEY;
  if (!url || !key || url === 'YOUR_SUPABASE_URL') return null;
  return window.supabase.createClient(url, key);
})();

// ============== Shared constants ==============
const PEOPLE = ["Kelli", "Sarah", "Lizzie", "Mom", "Dad"];
const INITIALS = { Kelli: "K", Sarah: "S", Lizzie: "L", Mom: "M", Dad: "D" };
const AVATAR_COLORS = {
  Kelli:  "var(--accent)",
  Sarah:  "var(--plum)",
  Lizzie: "var(--sky)",
  Mom:    "var(--green)",
  Dad:    "var(--canyon)",
};

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
  const days  = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const mins  = Math.floor((abs % 3600000) / 60000);
  const secs  = Math.floor((abs % 60000) / 1000);

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
      {[["Days", days], ["Hours", hours], ["Minutes", mins], ["Seconds", secs]].map(([lab, n]) => (
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
            <line x1="200" y1="0" x2="200" y2="440" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 6" />
            <text x="100" y="30" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">NEVADA</text>
            <text x="270" y="30" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">UTAH</text>
            <text x="270" y="420" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="3" fontFamily="var(--font-ui)">ARIZONA</text>
            <path
              d="M 90 230 L 240 130 L 90 230 L 470 200 L 600 300 L 510 90 L 600 300 L 660 220 L 90 230"
              fill="none" stroke="#E8742C" strokeWidth="2.5" strokeLinecap="round"
              style={{ strokeDashoffset: draw ? 0 : 2400, strokeDasharray: "6 8", transition: "stroke-dashoffset 3s ease-out" }}
              opacity="0.85"
            />
            {route.map((p, i) => (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`} style={{ opacity: draw ? 1 : 0, transition: `opacity 0.5s ease ${0.4 + i * 0.15}s` }}>
                <circle r="22" fill="url(#glow)" />
                <circle r="6" fill="#E8742C" stroke="#fff" strokeWidth="2" />
                <text x="0" y={p.id === "sedona" || p.id === "flag" ? "30" : "-14"} fontSize="13" fontFamily="var(--font-display)" fill="#fff" textAnchor="middle" fontStyle="italic">{p.name}</text>
                <text x="0" y={p.id === "sedona" || p.id === "flag" ? "44" : "-28"} fontSize="9" letterSpacing="2" fill="rgba(255,217,181,0.7)" textAnchor="middle" fontFamily="var(--font-ui)" fontWeight="700">{p.sub.toUpperCase()}</text>
              </g>
            ))}
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

// ============== MemoryModal ==============
function MemoryModal({ dayNum, dayTitle, entry, onClose, onSaved }) {
  const [who,          setWho]          = useState(entry?.person     || PEOPLE[0]);
  const [text,         setText]         = useState(entry?.entry_text || '');
  const [photoFile,    setPhotoFile]    = useState(null);
  const [photoPreview, setPhotoPreview] = useState(entry?.photo_url  || null);
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (!_db) { alert('Supabase not configured — add your credentials to index.html.'); return; }
    setSaving(true);
    setError(null);
    try {
      let photo_url = entry ? entry.photo_url : null;
      if (entry?.photo_url && !photoPreview && !photoFile) photo_url = null;
      if (photoFile) {
        const ext = photoFile.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await _db.storage.from('entry-photos').upload(path, photoFile);
        if (upErr) throw upErr;
        photo_url = _db.storage.from('entry-photos').getPublicUrl(path).data.publicUrl;
      }
      if (entry?.id) {
        const { error: e } = await _db.from('journal_entries').update({ person: who, entry_text: trimmed, photo_url }).eq('id', entry.id);
        if (e) throw e;
      } else {
        const { error: e } = await _db.from('journal_entries').insert({ day_num: dayNum, person: who, entry_text: trimmed, photo_url });
        if (e) throw e;
      }
      onSaved();
      onClose();
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__head">
          <div>
            <div className="modal__eyebrow">Day {dayNum} · {dayTitle}</div>
            <div className="modal__title">{entry ? 'Edit memory' : 'Add a memory'}</div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Who's writing</label>
            <div className="modal__who-grid">
              {PEOPLE.map(p => (
                <button key={p} type="button"
                  className={`modal__who-btn ${who === p ? 'is-active' : ''}`}
                  style={{ '--who-color': AVATAR_COLORS[p] }}
                  onClick={() => setWho(p)}>
                  <span className="modal__who-init">{INITIALS[p]}</span>{p}
                </button>
              ))}
            </div>
          </div>
          <div className="modal__field">
            <label className="modal__label">Memory</label>
            <textarea className="modal__textarea"
              placeholder="What happened? What stuck with you? What do you want to remember?"
              value={text} onChange={e => setText(e.target.value)} rows={6} autoFocus />
          </div>
          <div className="modal__field">
            <label className="modal__label">Photo <span className="modal__opt">optional</span></label>
            {photoPreview ? (
              <div className="modal__photo-preview">
                <img src={photoPreview} alt="Preview" />
                <button type="button" className="modal__photo-remove"
                  onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}>Remove photo</button>
              </div>
            ) : (
              <label className="modal__upload-btn">
                <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
                📷 Choose a photo
              </label>
            )}
          </div>
          {error && <div className="modal__error">{error}</div>}
        </div>
        <div className="modal__footer">
          <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="modal__btn modal__btn--submit" onClick={submit} disabled={!text.trim() || saving}>
            {saving ? 'Saving…' : entry ? 'Save changes' : 'Save memory'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== MemoriesSection ==============
function MemoriesSection({ days, refreshKey }) {
  const [entries,   setEntries]  = useState([]);
  const [loading,   setLoading]  = useState(true);
  const [openDays,  setOpenDays] = useState({});
  const [editEntry, setEditEntry] = useState(null);

  const load = useCallback(async () => {
    if (!_db) { setLoading(false); return; }
    const { data, error } = await _db.from('journal_entries').select('*').order('created_at', { ascending: true });
    if (!error) setEntries(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load, refreshKey]);

  useEffect(() => {
    if (!_db) return;
    const ch = _db.channel('journal_entries_rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'journal_entries' }, load)
      .subscribe();
    return () => _db.removeChannel(ch);
  }, [load]);

  const toggle = (num) => setOpenDays(prev => ({ ...prev, [num]: !prev[num] }));

  const handleDelete = async (id) => {
    if (!confirm('Delete this memory?')) return;
    await _db.from('journal_entries').delete().eq('id', id);
    load();
  };

  const byDay = useMemo(() =>
    days.reduce((acc, d) => { acc[d.num] = entries.filter(e => e.day_num === d.num); return acc; }, {}),
  [days, entries]);

  const total = entries.length;

  return (
    <section className="section memories-section" id="memories">
      <div className="section__eyebrow">Memories</div>
      <h2 className="section__title">The <em>journal</em></h2>
      <p className="section__intro">
        {!_db ? 'Configure Supabase in index.html to enable shared memories.'
          : loading ? 'Loading…'
          : total === 0 ? 'No memories yet — add them from each day above.'
          : `${total} ${total === 1 ? 'memory' : 'memories'} from five travelers.`}
      </p>
      <div className="memories__list">
        {days.map(d => {
          const dayEntries = byDay[d.num] || [];
          const isOpen = !!openDays[d.num];
          const writers = [...new Set(dayEntries.map(e => e.person))];
          return (
            <div key={d.num} className={`accordion ${isOpen ? 'is-open' : ''}`}>
              <button className="accordion__trigger" onClick={() => toggle(d.num)}>
                <span className="accordion__num">{d.num}</span>
                <div className="accordion__info">
                  <div className="accordion__title">{d.title}</div>
                  <div className="accordion__date">{d.date}</div>
                </div>
                <div className="accordion__meta">
                  {writers.length > 0 && (
                    <div className="accordion__avatars">
                      {writers.map(p => (
                        <span key={p} className="acc-avatar" style={{ background: AVATAR_COLORS[p] }}>{INITIALS[p]}</span>
                      ))}
                    </div>
                  )}
                  <span className="accordion__count">{dayEntries.length} {dayEntries.length === 1 ? 'memory' : 'memories'}</span>
                  <span className={`accordion__chevron ${isOpen ? 'is-open' : ''}`}>›</span>
                </div>
              </button>
              {isOpen && (
                <div className="accordion__body">
                  {dayEntries.length === 0
                    ? <p className="accordion__empty">No memories for this day yet.</p>
                    : dayEntries.map(entry => (
                      <div key={entry.id} className="mem-entry">
                        <div className="mem-entry__avatar" style={{ background: AVATAR_COLORS[entry.person] }}>{INITIALS[entry.person]}</div>
                        <div className="mem-entry__body">
                          <div className="mem-entry__head">
                            <span className="mem-entry__who">{entry.person}</span>
                            <span className="mem-entry__when">{new Date(entry.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                            <div className="mem-entry__actions">
                              <button className="mem-entry__btn" onClick={() => setEditEntry(entry)}>Edit</button>
                              <button className="mem-entry__btn mem-entry__btn--del" onClick={() => handleDelete(entry.id)}>Delete</button>
                            </div>
                          </div>
                          <p className="mem-entry__text">{entry.entry_text}</p>
                          {entry.photo_url && (
                            <div className="mem-entry__photo">
                              <img src={entry.photo_url} alt={`${entry.person}'s photo`} loading="lazy" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
      {editEntry && (
        <MemoryModal
          dayNum={editEntry.day_num}
          dayTitle={days.find(d => d.num === editEntry.day_num)?.title || ''}
          entry={editEntry}
          onClose={() => setEditEntry(null)}
          onSaved={load}
        />
      )}
    </section>
  );
}

// ============== Day ==============
function Day({ d, onAddMemory }) {
  return (
    <article className="day" id={`day-${d.num}`} data-screen-label={`${d.num} ${d.title}`}>
      <div className="day__media-wrap">
        <div className={`day__media ${d.image2 ? "day__media--double" : ""}`}>
          <div className="day__media-img">
            <img src={d.image} alt={d.caption} loading="lazy"
              onError={(ev) => { if (d.fallback && ev.currentTarget.src !== d.fallback) ev.currentTarget.src = d.fallback; }} />
            <div className="day__media-caption">{d.caption}</div>
          </div>
          {d.image2 && (
            <div className="day__media-img">
              <img src={d.image2} alt={d.caption2 || d.caption} loading="lazy" />
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
        <button className="add-memory-btn" onClick={() => onAddMemory(d.num, d.title)}>
          <span className="add-memory-btn__plus">＋</span> Add a memory
        </button>
      </div>
    </article>
  );
}

// ============== Packing ==============
function Packing({ items }) {
  const [checked, setChecked] = useState(() => {
    try { const r = localStorage.getItem("azpacking"); return r ? JSON.parse(r) : {}; } catch { return {}; }
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
          <div key={name} className={`pack-item ${checked[name] ? "is-checked" : ""}`}
            onClick={() => toggle(name)} role="button" tabIndex={0}
            onKeyDown={(ev) => { if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); toggle(name); } }}>
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
          {data.paragraphs.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
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
      const ids = ["top", "map", ...days.map(d => `day-${d.num}`), "packing", "memories", "epilogue"];
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
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
            AZ/UT 2026<small>May 9–15 · 2026</small>
          </a>
          <div className="topnav__links">
            <a href="#map" className={`topnav__link ${active === "map" ? "is-active" : ""}`}>Route</a>
            {days.map(d => (
              <a key={d.num} href={`#day-${d.num}`} className={`topnav__link ${active === `day-${d.num}` ? "is-active" : ""}`}>Day {d.num}</a>
            ))}
            <a href="#packing"  className={`topnav__link ${active === "packing"  ? "is-active" : ""}`}>Pack</a>
            <a href="#memories" className={`topnav__link ${active === "memories" ? "is-active" : ""}`}>Memories</a>
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
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme",   tweaks.theme);
    root.setAttribute("data-density", tweaks.density);
    document.body.classList.toggle("no-imagery", !tweaks.imagery);
  }, [tweaks]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio value={tweaks.theme} onChange={(v) => setTweak("theme", v)}
          options={[{ value: "default", label: "Sand" }, { value: "dusk", label: "Dusk" }, { value: "noon", label: "Noon" }]} />
      </TweakSection>
      <TweakSection label="Density">
        <TweakRadio value={tweaks.density} onChange={(v) => setTweak("density", v)}
          options={[{ value: "cozy", label: "Cozy" }, { value: "comfy", label: "Comfy" }, { value: "spacious", label: "Spacious" }]} />
      </TweakSection>
      <TweakSection label="Imagery">
        <TweakToggle value={tweaks.imagery} onChange={(v) => setTweak("imagery", v)} label="Show photos" />
      </TweakSection>
    </TweaksPanel>
  );
}

// ============== App ==============
function App() {
  const D = window.TRIP_DATA;
  const [modalDay,   setModalDay]   = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openModal  = (num, title) => setModalDay({ num, title });
  const closeModal = () => setModalDay(null);
  const onSaved    = () => { setRefreshKey(k => k + 1); closeModal(); };

  return (
    <>
      <TopNav days={D.days} />
      <Hero data={D.hero} />
      <div className="rules">
        <div className="rules__inner"><strong>☀️ May ground rules:</strong> {D.rules}</div>
      </div>
      <RouteMap route={D.route} path={D.routePath} />
      <Passage data={D.prologue} />
      <Packing items={D.packing} />
      <section className="section" id="days">
        <div className="section__eyebrow">The Days</div>
        <h2 className="section__title">Seven days, <em>one loop</em></h2>
        <div className="days">
          {D.days.map(d => <Day key={d.num} d={d} onAddMemory={openModal} />)}
        </div>
      </section>
      <MemoriesSection days={D.days} refreshKey={refreshKey} />
      <Passage data={D.epilogue} />
      <footer className="footer">
        With love · May 9–15, 2026 · Kelli · Sarah · Lizzie · Mom · Dad 🌵
      </footer>
      <Tweaks />
      {modalDay && (
        <MemoryModal
          dayNum={modalDay.num}
          dayTitle={modalDay.title}
          onClose={closeModal}
          onSaved={onSaved}
        />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
