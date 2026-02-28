export default function EventTypeRow({ evt, onToggle, onOpen, onCopy, onMore }) {
    return (
      <div className="px-5 py-4 flex items-center gap-4">
        {/* Left: title + slug + duration pill */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-zinc-900 truncate">{evt.title}</div>
            <div className="text-sm text-zinc-500 truncate">{evt.slug}</div>
          </div>
  
          <div className="mt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700">
              <ClockIcon />
              {evt.durationMins}m
            </span>
          </div>
        </div>
  
        {/* Right: hidden label + toggle + actions */}
        <div className="flex items-center gap-3">
          {evt.hidden ? <span className="text-sm text-zinc-500">Hidden</span> : null}
  
          <Toggle checked={evt.enabled} onChange={onToggle} />
  
          <div className="flex items-center gap-2">
            <IconButton onClick={onOpen} ariaLabel="Open">
              <ExternalIcon />
            </IconButton>
            <IconButton onClick={onCopy} ariaLabel="Copy link">
              <LinkIcon />
            </IconButton>
            <IconButton onClick={onMore} ariaLabel="More">
              <MoreIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
  
  function IconButton({ children, onClick, ariaLabel }) {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="h-9 w-9 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition flex items-center justify-center text-zinc-600"
      >
        {children}
      </button>
    );
  }
  
  function Toggle({ checked, onChange }) {
    return (
      <button
        type="button"
        onClick={onChange}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-zinc-900" : "bg-zinc-200",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            checked ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    );
  }
  
  /* icons */
  function ClockIcon() {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  function ExternalIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  function LinkIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  function MoreIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h.01M12 12h.01M19 12h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }