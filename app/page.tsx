"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const herName = "Rudrani";
  const myName = "Anurag";
  const specialDate = "Every day with you";
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationSec, setDurationSec] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [hasAudioError, setHasAudioError] = useState(false);

  const playlist = useMemo(
    () => [
      { title: "Naal Nachna", file: "NaalNachna.mp3" },
      { title: "Gehra Hua", file: "GehraHua.mp3" },
    ],
    [],
  );

  const currentTrack = playlist[Math.min(trackIndex, playlist.length - 1)];
  const currentSrc = `/${encodeURIComponent(currentTrack.file)}`;

  const nextTrack = () => setTrackIndex((i) => (i + 1) % playlist.length);
  const prevTrack = () =>
    setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);

  useEffect(() => {
    if (!isPlaying) return;
    const el = audioRef.current;
    if (!el) return;
    setHasAudioError(false);
    el.load();
    void el.play().catch(() => {
      setIsPlaying(false);
    });
  }, [currentSrc, isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = Math.max(0, Math.min(1, volume));
  }, [volume]);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      return;
    }

    try {
      await el.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const m = Math.floor(safe / 60);
    const s = Math.floor(safe % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const hearts = [
    { left: "6%", size: 14, duration: 14, delay: -2, opacity: 0.7 },
    { left: "14%", size: 10, duration: 12, delay: -7, opacity: 0.45 },
    { left: "22%", size: 18, duration: 16, delay: -10, opacity: 0.6 },
    { left: "33%", size: 12, duration: 13, delay: -4, opacity: 0.55 },
    { left: "41%", size: 9, duration: 11, delay: -9, opacity: 0.35 },
    { left: "52%", size: 16, duration: 15, delay: -6, opacity: 0.65 },
    { left: "61%", size: 11, duration: 12, delay: -12, opacity: 0.4 },
    { left: "69%", size: 20, duration: 18, delay: -8, opacity: 0.6 },
    { left: "77%", size: 13, duration: 14, delay: -11, opacity: 0.5 },
    { left: "86%", size: 10, duration: 12, delay: -5, opacity: 0.35 },
    { left: "92%", size: 17, duration: 16, delay: -13, opacity: 0.55 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07030f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(236,72,153,.38),transparent_46%),radial-gradient(circle_at_78%_12%,rgba(168,85,247,.28),transparent_44%),radial-gradient(circle_at_50%_92%,rgba(251,113,133,.24),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute bottom-[-24px] select-none blur-[0.2px]"
            style={{
              left: h.left,
              opacity: h.opacity,
              fontSize: `${h.size}px`,
              animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-7">
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/10"
        >
          <span className="text-pink-200/90">♥</span>
          <span className="font-medium tracking-wide">
            For <span className="text-white">{herName}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm text-white/80 md:flex">
          <a className="transition hover:text-white" href="#letter">
            Love letter
          </a>
          <a className="transition hover:text-white" href="#reasons">
            Reasons
          </a>
          <a className="transition hover:text-white" href="#timeline">
            Timeline
          </a>
          <a className="transition hover:text-white" href="#gallery">
            Gallery
          </a>
        </nav>

        <a
          href="#letter"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold shadow-[0_12px_40px_rgba(236,72,153,.25)] transition hover:brightness-110 active:brightness-95"
        >
          Open the letter
        </a>
      </header>

      <main id="top" className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
        <section className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75 backdrop-blur">
              <span className="text-pink-200/90">♥</span>
              <span>Made with love • {specialDate}</span>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              To the love of my life,
              <span className="block bg-gradient-to-r from-pink-200 via-rose-200 to-fuchsia-200 bg-clip-text text-transparent">
                {herName}
              </span>
            </h1>

            <p className="max-w-xl text-pretty text-base leading-7 text-white/78 sm:text-lg">
              I made this little place on the internet just for you — something
              soft, sweet, and true. Whenever you open it, I hope it feels like
              a warm hug.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#reasons"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
              >
                Reasons I love you
              </a>
              <a
                href="#timeline"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-transparent px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                Our little timeline
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 opacity-70 blur-3xl">
              <div className="h-full w-full rounded-[32px] bg-[conic-gradient(from_210deg,rgba(236,72,153,.35),rgba(168,85,247,.28),rgba(251,113,133,.22),rgba(236,72,153,.35))]" />
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium tracking-wide text-white/60">
                    Today’s mood
                  </p>
                  <p className="text-lg font-semibold">Hopelessly in love</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/7 text-2xl text-pink-200 shadow-inner">
                  ♥
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm text-white/78">
                    <span className="text-white/92 font-semibold">
                      Favorite thing:
                    </span>{" "}
                    seeing you smile.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm text-white/78">
                    <span className="text-white/92 font-semibold">
                      Promise:
                    </span>{" "}
                    I’ll always choose you.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm text-white/78">
                    <span className="text-white/92 font-semibold">
                      Secret:
                    </span>{" "}
                    you’re my favorite place.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-white/72">
                  From <span className="font-semibold text-white">{myName}</span>
                </p>
                <a
                  href="#letter"
                  className="text-sm font-semibold text-pink-200 transition hover:text-pink-100"
                >
                  Read the letter →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="letter" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/60">
                A love letter
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Just for you, {herName}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsLetterOpen((v) => !v)}
              aria-expanded={isLetterOpen}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              <span className="text-pink-200/90">♥</span>
              <span>{isLetterOpen ? "Close letter" : "Open letter"}</span>
            </button>
          </div>

          <button
            type="button"
            aria-label={isLetterOpen ? "Close love letter" : "Open love letter"}
            onClick={() => setIsLetterOpen((v) => !v)}
            className="mt-6 w-full"
          >
            <div className="relative mx-auto max-w-4xl">
              <div
                className={`relative w-full rounded-[28px] border border-white/12 bg-gradient-to-b from-white/10 via-white/6 to-white/4 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur transition-[height] duration-700 [perspective:1200px] ${
                  isLetterOpen ? "h-[620px] sm:h-[680px]" : "h-[360px] sm:h-[420px]"
                }`}
              >
                <div className="absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_at_top,black,transparent_68%)] bg-[linear-gradient(120deg,rgba(236,72,153,.22),transparent_35%),linear-gradient(320deg,rgba(168,85,247,.20),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:26px_26px]" />

                <div
                  className={`absolute left-6 right-6 bottom-10 overflow-hidden rounded-2xl border border-rose-200/60 bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100/70 px-7 py-6 text-left text-rose-950 shadow-[0_22px_60px_rgba(0,0,0,.28)] transition-[transform,opacity] duration-700 ${
                    isLetterOpen
                      ? "opacity-100 [transform:translateY(-46%)]"
                      : "opacity-0 [transform:translateY(120%)]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)] bg-[radial-gradient(circle_at_20%_22%,rgba(244,63,94,.18),transparent_46%),radial-gradient(circle_at_82%_72%,rgba(168,85,247,.14),transparent_52%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle,rgba(244,63,94,.9)_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-rose-500/80">
                        Sealed with love
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-rose-950">
                        For {herName}
                      </p>
                    </div>
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-base text-white shadow-[0_14px_40px_rgba(244,63,94,.25)] ring-1 ring-white/50">
                      ♥
                    </div>
                  </div>
                  <div
                    className="relative mt-4 max-h-[420px] overflow-auto pr-2 text-sm leading-7 text-rose-900/85"
                  >
                    <p>
                      I love you in the quiet moments, and in the loud ones. I
                      love the way you make ordinary days feel like something
                      worth remembering.
                    </p>
                    <p className="mt-3">
                      When life gets heavy, I want to be your soft place to
                      land. When life is bright, I want to be the one cheering
                      the loudest for you.
                    </p>
                    <p className="mt-3">
                      Thank you for being you. Thank you for letting me love
                      you.
                    </p>
                    <p className="mt-3 font-semibold text-rose-950">
                      Always yours, {myName}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[58%] rounded-b-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.09))]" />
                <div className="absolute inset-0 [clip-path:polygon(0_100%,50%_52%,100%_100%,100%_0,0_0)] bg-gradient-to-b from-pink-300/10 via-rose-300/10 to-white/5" />
                <div className="absolute inset-0 [clip-path:polygon(0_0,50%_54%,100%_0,100%_100%,0_100%)] bg-gradient-to-b from-fuchsia-300/10 via-rose-300/10 to-white/5" />

                <div
                  className={`absolute left-0 right-0 top-0 h-[58%] origin-top [clip-path:polygon(0_0,100%_0,50%_82%)] bg-gradient-to-b from-white/14 via-white/10 to-pink-200/10 shadow-[0_16px_50px_rgba(0,0,0,.22)] transition-transform duration-700 [backface-visibility:hidden] ${
                    isLetterOpen ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"
                  }`}
                />

                <div
                  className={`absolute left-1/2 top-[56%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-xl text-white shadow-[0_20px_60px_rgba(236,72,153,.32)] ring-1 ring-white/40 transition duration-500 ${
                    isLetterOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  ♥
                </div>

                <div className="absolute inset-x-0 bottom-5 flex justify-center">
                  <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                    {isLetterOpen ? "Tap to close" : "Tap to open"}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </section>

        <section id="reasons" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/60">
                Little things
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Reasons I love you
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-white/70 md:block">
              Swap these with the real reasons — the ones only you two know.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Your smile makes everything lighter.",
              "You’re kind in a way that feels rare.",
              "You listen with your whole heart.",
              "You make me want to be better.",
              "Your laugh is my favorite sound.",
              "With you, I feel like I’m home.",
            ].map((reason) => (
              <div
                key={reason}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur transition hover:bg-white/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/20 blur-2xl transition group-hover:bg-pink-500/30" />
                <p className="relative text-sm leading-7 text-white/78">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/7 text-pink-200">
                    ♥
                  </span>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="timeline" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/60">
                Us
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Our little timeline
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-white/70 md:block">
              Replace each moment with your real memories.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "The first hello",
                text: "The moment everything started to feel different.",
              },
              {
                title: "Our first date",
                text: "Time moved fast, but it felt like home.",
              },
              {
                title: "The little traditions",
                text: "Songs, jokes, and small things that became ours.",
              },
              {
                title: "Today",
                text: "Still choosing you. Again and again.",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 p-6 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/7 text-sm font-semibold text-pink-200">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/75">
                      {item.text}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-fuchsia-500/15 blur-3xl" />
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/60">
                Memories
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Our gallery
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-white/70 md:block">
              Our favorite moments, kept right here.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                alt: "Our moment",
                src: "/Photos1.jpg",
              },
              {
                alt: "A sweet memory",
                src: "/Photos2.jpg",
              },
              {
                alt: "Forever",
                src: "/Photos3.jpg",
              },
            ].map((card) => (
              <div
                key={card.src}
                className="group overflow-hidden rounded-2xl border border-white/12 bg-white/6 backdrop-blur transition hover:bg-white/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    priority={card.src === "/Photos1.jpg"}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,3,15,.70),rgba(7,3,15,.00)_55%)] opacity-90" />
                  <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.16),transparent_40%,rgba(255,255,255,.10))]" />
                </div>

                <div className="p-5">
                  <p className="text-center text-2xl leading-none">❤️</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="music" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/60">
                For you
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Your fav music
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-white/70 md:block">
              Press play and let the moment feel soft.
            </p>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/12 bg-gradient-to-b from-white/10 via-white/6 to-white/4 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] bg-[linear-gradient(120deg,rgba(236,72,153,.20),transparent_35%),linear-gradient(320deg,rgba(168,85,247,.18),transparent_36%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:26px_26px]" />

            <div className="relative p-7 sm:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute -inset-3 rounded-full blur-2xl transition-opacity ${isPlaying ? "opacity-90" : "opacity-60"} bg-[radial-gradient(circle,rgba(236,72,153,.55),transparent_60%)]`} />
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(236,72,153,.25)] ring-1 ring-white/40">
                      <Image
                        src="/GehraHuaImg.jpg"
                        alt="Gehra Hua cover"
                        fill
                        sizes="56px"
                        className="object-cover"
                        priority
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(236,72,153,.18),transparent_40%,rgba(168,85,247,.14))]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium tracking-wide text-white/60">
                        Now playing
                      </p>
                      <div className={`flex items-end gap-1 ${isPlaying ? "opacity-100" : "opacity-55"} transition-opacity`}>
                        <span
                          className="h-3 w-1 rounded-full bg-pink-200/80"
                          style={{
                            animationName: isPlaying ? "equalize" : "none",
                            animationDuration: "1s",
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: "0ms",
                          }}
                        />
                        <span
                          className="h-4 w-1 rounded-full bg-rose-200/80"
                          style={{
                            animationName: isPlaying ? "equalize" : "none",
                            animationDuration: "1.2s",
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: "120ms",
                          }}
                        />
                        <span
                          className="h-2 w-1 rounded-full bg-fuchsia-200/80"
                          style={{
                            animationName: isPlaying ? "equalize" : "none",
                            animationDuration: "0.9s",
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: "220ms",
                          }}
                        />
                        <span
                          className="h-5 w-1 rounded-full bg-pink-200/80"
                          style={{
                            animationName: isPlaying ? "equalize" : "none",
                            animationDuration: "1.35s",
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: "60ms",
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-lg font-semibold tracking-tight">
                      {currentTrack.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {playlist.map((t, i) => {
                        const active = i === trackIndex;
                        return (
                          <button
                            key={t.file}
                            type="button"
                            onClick={() => setTrackIndex(i)}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                              active
                                ? "border-white/20 bg-white/14 text-white"
                                : "border-white/12 bg-white/6 text-white/75 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {t.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={prevTrack}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
                    aria-label="Previous song"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => void togglePlay()}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold shadow-[0_12px_40px_rgba(236,72,153,.28)] transition hover:brightness-110 active:brightness-95"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={nextTrack}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
                    aria-label="Next song"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{formatTime(currentSec)}</span>
                  <span>{durationSec ? formatTime(durationSec) : "0:00"}</span>
                </div>

                <div className="mt-3">
                  <input
                    type="range"
                    min={0}
                    max={durationSec || 0}
                    step={0.1}
                    value={Math.min(currentSec, durationSec || 0)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setCurrentSec(value);
                      const el = audioRef.current;
                      if (el) el.currentTime = value;
                    }}
                    className="love-range"
                    style={{
                      background: durationSec
                        ? `linear-gradient(to right, rgba(236,72,153,.95) ${Math.min(100, (currentSec / durationSec) * 100)}%, rgba(255,255,255,.18) ${Math.min(100, (currentSec / durationSec) * 100)}%)`
                        : "rgba(255,255,255,.18)",
                    }}
                    aria-label="Seek"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/75">🔊</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="love-range max-w-[160px]"
                      style={{
                        background: `linear-gradient(to right, rgba(168,85,247,.95) ${Math.min(100, volume * 100)}%, rgba(255,255,255,.18) ${Math.min(100, volume * 100)}%)`,
                        height: 8,
                      }}
                      aria-label="Volume"
                    />
                  </div>

                  <div className="text-sm text-white/70">
                    <span className="text-pink-200/90">♥</span>{" "}
                    {isPlaying ? "Playing" : "Paused"}
                  </div>
                </div>

                {hasAudioError ? (
                  <div className="mt-4 rounded-2xl border border-rose-200/20 bg-rose-500/10 px-4 py-3 text-sm text-white/80">
                    Add these files to your public folder:
                    <span className="ml-2 font-semibold text-white">
                      NaalNachna.mp3, GehraHua.mp3
                    </span>
                  </div>
                ) : null}
              </div>

              <p className="mt-5 text-center text-2xl leading-none">❤️</p>

              <audio
                ref={audioRef}
                src={currentSrc}
                preload="metadata"
                className="hidden"
                onLoadedMetadata={(e) => {
                  const el = e.currentTarget;
                  setDurationSec(Number.isFinite(el.duration) ? el.duration : 0);
                  setHasAudioError(false);
                }}
                onTimeUpdate={(e) => {
                  setCurrentSec(e.currentTarget.currentTime);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => nextTrack()}
                onError={() => {
                  setHasAudioError(true);
                  setIsPlaying(false);
                }}
              />
            </div>
          </div>
        </section>

        <footer className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-10 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/70">
            Built with love for{" "}
            <span className="font-semibold text-white">{herName}</span>.
          </p>
          <p className="text-sm text-white/55">
            <span className="text-pink-200/90">♥</span> {myName}
          </p>
        </footer>
      </main>
    </div>
  );
}
