import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═══════════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#c9a84c;--gold-lt:#e8c97a;--gold-dim:rgba(201,168,76,.1);--gold-border:rgba(201,168,76,.25);
  --bg:#08090d;--surface:#0f111a;--card:#141720;--card2:#1a1e2a;--border:#1e2535;
  --text:#eaedf5;--muted:#6b7585;--faint:#374151;
  --green:#22c55e;--red:#ef4444;--blue:#3b82f6;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;line-height:1.65;font-size:15px;min-height:100vh;overflow-x:hidden}
::selection{background:rgba(201,168,76,.3);color:var(--text)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:10px}

/* NAV */
.nav{position:sticky;top:0;z-index:100;background:rgba(8,9,13,.94);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);height:60px;display:flex;align-items:center;padding:0 24px;gap:16px}
.nav-logo{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:var(--gold);letter-spacing:-.3px;margin-right:4px;white-space:nowrap}
.nav-logo span{color:var(--text)}
.nav-tabs{display:flex;gap:1px;flex:1}
.nt{padding:6px 12px;border-radius:8px;border:none;background:transparent;color:var(--muted);cursor:pointer;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:all .18s;white-space:nowrap}
.nt:hover{color:var(--text);background:var(--card)}
.nt.on{color:var(--gold);background:var(--gold-dim)}
.nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.nav-signin{padding:6px 14px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all .18s}
.nav-signin:hover{color:var(--text);border-color:var(--muted)}
.nav-pro{padding:7px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#0a0c10;cursor:pointer;font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;transition:all .18s}
.nav-pro:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.35)}

/* HERO */
.hero{position:relative;padding:90px 24px 80px;text-align:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -5%,rgba(201,168,76,.08) 0%,transparent 65%);pointer-events:none}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:48px 48px;opacity:.25;pointer-events:none}
.hero-pill{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);border-radius:100px;padding:5px 14px 5px 8px;font-size:12px;font-weight:600;letter-spacing:.5px;margin-bottom:24px;position:relative;z-index:1}
.hero-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(38px,5.5vw,68px);font-weight:900;line-height:1.08;letter-spacing:-1.5px;margin-bottom:20px;position:relative;z-index:1}
.hero h1 em{color:var(--gold);font-style:normal;position:relative}
.hero-sub{font-size:17px;color:var(--muted);max-width:540px;margin:0 auto 36px;position:relative;z-index:1;line-height:1.7}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;margin-bottom:48px}
.btn-primary{padding:14px 28px;border-radius:11px;border:none;background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#08090d;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;letter-spacing:.2px}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(201,168,76,.35)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-secondary{padding:14px 28px;border-radius:11px;border:1px solid var(--border);background:var(--card);color:var(--text);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s}
.btn-secondary:hover{border-color:var(--gold-border);color:var(--gold);transform:translateY(-2px)}
.btn-sm{padding:9px 18px;border-radius:9px;font-size:13px}
.btn-outline{padding:9px 18px;border-radius:9px;border:1px solid var(--border);background:transparent;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .18s}
.btn-outline:hover{border-color:var(--gold-border);color:var(--gold)}

/* HERO STATS */
.hero-stats{display:flex;justify-content:center;gap:0;position:relative;z-index:1}
.hstat{padding:16px 32px;border:1px solid var(--border);background:var(--card);text-align:center}
.hstat:first-child{border-radius:12px 0 0 12px}
.hstat:last-child{border-radius:0 12px 12px 0}
.hstat:not(:first-child){border-left:none}
.hstat-num{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--gold);line-height:1}
.hstat-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:4px;font-weight:600}

/* SECTION */
.page{max-width:1080px;margin:0 auto;padding:0 24px 80px}
.sec-header{margin-bottom:32px}
.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:2.5px;color:var(--gold);margin-bottom:8px;font-weight:700}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(24px,3vw,34px);font-weight:700;margin-bottom:8px;letter-spacing:-.5px}
.sec-sub{color:var(--muted);font-size:14px;max-width:520px;line-height:1.7}
.badge-free{display:inline-block;background:rgba(34,197,94,.1);color:var(--green);border:1px solid rgba(34,197,94,.2);border-radius:6px;padding:2px 10px;font-size:11px;font-weight:700;letter-spacing:.8px;margin-left:10px;vertical-align:middle}
.badge-pro{display:inline-block;background:var(--gold-dim);color:var(--gold);border:1px solid var(--gold-border);border-radius:6px;padding:2px 10px;font-size:11px;font-weight:700;letter-spacing:.8px;margin-left:10px;vertical-align:middle}
.divider{border:none;border-top:1px solid var(--border);margin:56px 0}

/* FEATURE CARDS */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.feat-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px;transition:all .22s;cursor:pointer}
.feat-card:hover{border-color:var(--gold-border);transform:translateY(-3px);background:var(--card2)}
.feat-icon{font-size:28px;margin-bottom:12px;display:block}
.feat-card h3{font-size:15px;font-weight:600;margin-bottom:6px}
.feat-card p{font-size:13px;color:var(--muted);line-height:1.55}
.feat-tag{display:inline-block;margin-top:12px;font-size:11px;font-weight:700;padding:3px 9px;border-radius:6px}
.ftfree{background:rgba(34,197,94,.1);color:var(--green);border:1px solid rgba(34,197,94,.2)}
.ftpro{background:var(--gold-dim);color:var(--gold);border:1px solid var(--gold-border)}

/* HOW IT WORKS */
.steps-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0;position:relative}
.step{padding:24px;text-align:center;position:relative}
.step:not(:last-child)::after{content:'→';position:absolute;right:-10px;top:50%;transform:translateY(-50%);color:var(--gold);font-size:18px;opacity:.5;display:none}
@media(min-width:600px){.step:not(:last-child)::after{display:block}}
.step-num{width:44px;height:44px;border-radius:12px;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--gold)}
.step h4{font-size:14px;font-weight:600;margin-bottom:5px}
.step p{font-size:12px;color:var(--muted);line-height:1.6}

/* TESTIMONIALS */
.testi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.testi-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px}
.testi-stars{color:var(--gold);font-size:13px;margin-bottom:12px;letter-spacing:2px}
.testi-text{font-size:14px;color:#c9d0e0;line-height:1.75;margin-bottom:16px;font-style:italic}
.testi-author{display:flex;align-items:center;gap:10px}
.testi-avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0}
.testi-name{font-size:14px;font-weight:600}
.testi-role{font-size:12px;color:var(--muted)}

/* TRUST STRIP */
.trust-strip{background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 24px;display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);white-space:nowrap}
.trust-icon{font-size:16px}

/* FAQ */
.faq-list{display:flex;flex-direction:column;gap:2px}
.faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s}
.faq-item.open{border-color:var(--gold-border)}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;cursor:pointer;font-size:14px;font-weight:600;gap:12px}
.faq-q:hover{color:var(--gold)}
.faq-chevron{color:var(--muted);font-size:16px;flex-shrink:0;transition:transform .2s}
.faq-item.open .faq-chevron{transform:rotate(180deg);color:var(--gold)}
.faq-a{padding:0 20px 18px;font-size:14px;color:var(--muted);line-height:1.75;border-top:1px solid var(--border);margin-top:0;padding-top:14px}

/* NEWSLETTER */
.nl-box{background:linear-gradient(135deg,var(--card) 0%,rgba(201,168,76,.06) 100%);border:1px solid var(--gold-border);border-radius:18px;padding:40px;text-align:center}
.nl-box h2{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;margin-bottom:8px}
.nl-box p{color:var(--muted);font-size:14px;margin-bottom:24px}
.nl-form{display:flex;gap:10px;max-width:420px;margin:0 auto;flex-wrap:wrap;justify-content:center}
.nl-input{flex:1;min-width:200px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:11px 16px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border .2s}
.nl-input:focus{border-color:var(--gold)}
.nl-input::placeholder{color:var(--muted)}

/* RESUME BUILDER */
.builder-grid{display:grid;grid-template-columns:360px 1fr;gap:20px;align-items:start}
@media(max-width:820px){.builder-grid{grid-template-columns:1fr}}
.form-panel{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:10px}
.panel-head{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--gold);margin-bottom:2px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.fg{display:flex;flex-direction:column;gap:4px}
.fl{font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);font-weight:600}
.fi{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border .2s;width:100%;resize:none}
.fi:focus{border-color:var(--gold)}
.fi::placeholder{color:var(--faint)}
.gen-btn{width:100%;padding:13px;border-radius:10px;border:none;background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#08090d;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;margin-top:4px}
.gen-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(201,168,76,.3)}
.gen-btn:disabled{opacity:.5;cursor:not-allowed}
.tpicker{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-bottom:14px}
.tcard{border-radius:9px;overflow:hidden;cursor:pointer;border:2px solid transparent;transition:all .18s}
.tcard:hover:not(.sel){border-color:rgba(201,168,76,.4);transform:translateY(-2px)}
.tcard.sel{border-color:var(--gold)}
.tthumb{height:62px;position:relative;overflow:hidden}
.tname{background:var(--surface);padding:5px;text-align:center;font-size:10px;font-weight:600;color:var(--muted)}
.tcard.sel .tname{color:var(--gold)}
.preview-box{display:flex;flex-direction:column;gap:12px}
.preview-frame{border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:0 24px 60px rgba(0,0,0,.6)}
.preview-frame iframe{width:100%;height:520px;border:none;display:block}
.ph-box{display:flex;align-items:center;justify-content:center;height:300px;background:var(--card);border-radius:12px;border:1px dashed var(--border);flex-direction:column;gap:12px;color:var(--muted);font-size:14px}
.dl-row{display:flex;gap:8px;flex-wrap:wrap}
.dl-btn{display:flex;align-items:center;gap:7px;padding:9px 16px;border-radius:9px;border:1px solid var(--border);background:var(--card);color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .18s}
.dl-btn:hover{border-color:var(--gold-border);color:var(--gold)}
.dl-main{background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#08090d;border:none;font-weight:700}
.dl-main:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.3);color:#08090d!important}
.ail{display:flex;gap:8px;align-items:center;color:var(--muted);font-size:13px;padding:16px}
.dot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:bounce .8s infinite}
.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

/* CAREER TIPS */
.tips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.tip-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px;cursor:pointer;transition:all .22s;position:relative;overflow:hidden}
.tip-card::before{content:'';position:absolute;inset:0;background:var(--gold-dim);opacity:0;transition:opacity .2s}
.tip-card:hover{border-color:rgba(201,168,76,.4);transform:translateY(-3px)}
.tip-card:hover::before{opacity:1}
.tip-icon{font-size:32px;margin-bottom:12px;display:block;position:relative}
.tip-card h3{font-size:16px;font-weight:600;margin-bottom:6px;position:relative}
.tip-card p{font-size:13px;color:var(--muted);line-height:1.55;position:relative}
.tip-detail{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;animation:slideup .3s ease}
@keyframes slideup{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.tip-point{display:flex;gap:12px;padding:14px;background:var(--surface);border-radius:10px;border:1px solid var(--border);margin-bottom:10px}
.tip-point:last-child{margin-bottom:0}
.tip-num{min-width:28px;height:28px;border-radius:8px;background:var(--gold-dim);color:var(--gold);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.tip-point h4{font-size:14px;font-weight:600;margin-bottom:3px}
.tip-point p{font-size:13px;color:var(--muted);line-height:1.55}
.ai-loading{display:flex;gap:8px;align-items:center;color:var(--muted);font-size:13px;padding:20px 0}
.back-btn{display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:var(--gold);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;margin-bottom:20px;padding:0;transition:opacity .15s}
.back-btn:hover{opacity:.7}

/* COURSES */
.courses-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.course-card{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:all .22s;cursor:pointer}
.course-card:hover{transform:translateY(-4px);border-color:rgba(201,168,76,.3);box-shadow:0 20px 50px rgba(0,0,0,.4)}
.course-banner{height:110px;display:flex;align-items:center;justify-content:center;font-size:46px;position:relative}
.course-body{padding:18px}
.course-body h3{font-size:16px;font-weight:600;margin-bottom:6px}
.course-body p{font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.55}
.course-meta{display:flex;align-items:center;justify-content:space-between}
.course-dur{font-size:12px;color:var(--muted)}
.ctag{font-size:11px;font-weight:700;letter-spacing:.8px;padding:3px 10px;border-radius:6px}
.ctag-f{background:rgba(34,197,94,.1);color:var(--green);border:1px solid rgba(34,197,94,.2)}
.ctag-p{background:var(--gold-dim);color:var(--gold);border:1px solid var(--gold-border)}
.course-includes{background:var(--surface);border-radius:8px;padding:10px 12px;margin-bottom:12px;border:1px solid var(--border)}
.ci-row{display:flex;gap:7px;align-items:center;margin-bottom:4px;font-size:12px;color:#9ca3af}
.ci-row:last-child{margin-bottom:0}
.ci-check{font-size:10px;color:var(--green)}

/* LESSON LAYOUT */
.lesson-layout{display:grid;grid-template-columns:250px 1fr;gap:18px;align-items:start}
@media(max-width:740px){.lesson-layout{grid-template-columns:1fr}}
.lsidebar{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden;position:sticky;top:68px}
.lside-head{padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--gold);border-bottom:1px solid var(--border)}
.litem{display:flex;align-items:center;gap:9px;padding:11px 14px;border-bottom:1px solid rgba(30,37,53,.8);cursor:pointer;transition:all .15s}
.litem:last-child{border-bottom:none}
.litem:hover:not(.la){background:rgba(201,168,76,.04)}
.la{background:var(--gold-dim)}
.ldone .lnum-b{background:rgba(34,197,94,.15);color:var(--green)}
.lnum-b{width:24px;height:24px;border-radius:7px;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--muted);flex-shrink:0}
.la .lnum-b{background:rgba(201,168,76,.2);color:var(--gold)}
.ltitle-b{font-size:12px;flex:1;line-height:1.4}
.ldur-b{font-size:11px;color:var(--muted);flex-shrink:0}
.lbox{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:slideup .3s ease}
.lbox-head{padding:20px 24px;border-bottom:1px solid var(--border)}
.lbox-head h2{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:4px}
.lbox-head p{color:var(--muted);font-size:12px}
.lbox-body{padding:22px;display:flex;flex-direction:column;gap:18px}
.vid-wrap{width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#000}
.vid-wrap iframe{width:100%;height:100%;border:none}
.vid-label{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--muted)}
.intro-box{background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:14px 16px}
.intro-box p{font-size:14px;color:#e8c97a;line-height:1.75;font-weight:500}
.prose p{font-size:14px;line-height:1.85;color:#d1d5db;margin-bottom:12px}
.prose p:last-child{margin-bottom:0}
.kps{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px}
.kps h4{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--gold);margin-bottom:12px}
.kp{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start}
.kp:last-child{margin-bottom:0}
.kp-icon{font-size:18px;flex-shrink:0;line-height:1}
.kp h5{font-size:13px;font-weight:600;margin-bottom:3px}
.kp p{font-size:12px;color:var(--muted);line-height:1.5}
.exercise-box{background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.2);border-radius:12px;padding:16px}
.exercise-box h4{font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
.exercise-box p{font-size:13px;color:#d1d5db;line-height:1.65}
.protip-box{background:rgba(34,197,94,.05);border-left:3px solid var(--green);padding:12px 16px;border-radius:0 10px 10px 0}
.protip-box strong{color:var(--green);font-size:11px;text-transform:uppercase;letter-spacing:.8px;display:block;margin-bottom:4px}
.protip-box p{font-size:13px;color:#d1d5db;line-height:1.6}
.prog-bar{height:3px;background:var(--border);border-radius:3px;overflow:hidden;margin:0 24px 18px}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-lt));border-radius:3px;transition:width .4s}
.lnav{display:flex;justify-content:space-between;align-items:center;padding:14px 22px;border-top:1px solid var(--border);gap:8px;flex-wrap:wrap}

/* QUIZ */
.quiz-box{background:rgba(201,168,76,.04);border:1px solid var(--gold-border);border-radius:14px;padding:22px;animation:slideup .3s ease}
.quiz-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.quiz-hd h3{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--gold-lt)}
.quiz-prog-badge{font-size:12px;color:var(--muted);background:var(--border);padding:3px 10px;border-radius:100px}
.quiz-qnum{font-size:11px;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px}
.quiz-q{font-size:15px;font-weight:500;line-height:1.65;margin-bottom:18px}
.quiz-opts{display:flex;flex-direction:column;gap:9px}
.qopt{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;border:1px solid var(--border);background:var(--card);cursor:pointer;transition:all .18s;font-size:14px;color:#c9d0e0;text-align:left;width:100%}
.qopt:hover:not(.qans){border-color:rgba(201,168,76,.4);background:rgba(201,168,76,.04)}
.qopt.qsel{border-color:var(--gold);background:var(--gold-dim)}
.qopt.qcorr{border-color:var(--green);background:rgba(34,197,94,.08);color:var(--green)}
.qopt.qwrong{border-color:var(--red);background:rgba(239,68,68,.08);color:var(--red)}
.qopt.qshow{border-color:var(--green);background:rgba(34,197,94,.05);color:var(--green)}
.opt-ltr{width:26px;height:26px;border-radius:7px;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;color:var(--muted)}
.qopt.qsel .opt-ltr{background:rgba(201,168,76,.2);color:var(--gold)}
.qopt.qcorr .opt-ltr{background:rgba(34,197,94,.2);color:var(--green)}
.qopt.qwrong .opt-ltr{background:rgba(239,68,68,.2);color:var(--red)}
.qopt.qshow .opt-ltr{background:rgba(34,197,94,.15);color:var(--green)}
.quiz-fb{margin-top:14px;padding:12px 14px;border-radius:10px;font-size:13px;line-height:1.5}
.quiz-fb.corr{background:rgba(34,197,94,.07);border:1px solid rgba(34,197,94,.2);color:#86efac}
.quiz-fb.wrong{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);color:#fca5a5}
.score-ring{width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0 auto 16px;border:4px solid}
.score-ring.pass{border-color:var(--green);background:rgba(34,197,94,.07)}
.score-ring.fail{border-color:var(--red);background:rgba(239,68,68,.07)}
.score-num{font-family:'Playfair Display',serif;font-size:24px;font-weight:700}
.score-ring.pass .score-num{color:var(--green)}
.score-ring.fail .score-num{color:var(--red)}

/* ASSESSMENT */
.assess-box{background:var(--card);border:1px solid var(--gold-border);border-radius:16px;padding:28px;text-align:center;animation:slideup .3s ease}
.assess-badge{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);border-radius:100px;padding:6px 16px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:16px}
.info-pills{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.info-pill{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 16px;text-align:center}
.info-pill .ip-icon{font-size:20px;margin-bottom:4px}
.info-pill .ip-txt{font-size:12px;color:var(--muted)}

/* CERTIFICATE */
.cert-overlay{position:fixed;inset:0;background:rgba(5,6,10,.97);z-index:500;display:flex;flex-direction:column;align-items:center;padding:20px;overflow-y:auto}
.cert-toolbar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;justify-content:center}
.cert-frame{background:#faf8f0;border-radius:4px;width:100%;max-width:840px;box-shadow:0 40px 100px rgba(0,0,0,.8)}
.cert-inner{padding:58px 68px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:570px}
.c-border-out{position:absolute;inset:13px;border:2px solid #c9a84c;pointer-events:none}
.c-border-in{position:absolute;inset:19px;border:.5px solid rgba(201,168,76,.3);pointer-events:none}
.c-corner{position:absolute;font-size:20px}
.c-corner.tl{top:6px;left:6px}.c-corner.tr{top:6px;right:6px}
.c-corner.bl{bottom:6px;left:6px}.c-corner.br{bottom:6px;right:6px}
.c-wm{position:absolute;font-family:'Playfair Display',serif;font-size:88px;color:rgba(201,168,76,.04);font-weight:900;transform:rotate(-30deg);top:50%;left:50%;translate:-50% -50%;white-space:nowrap;pointer-events:none}
.c-logo{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#c9a84c;letter-spacing:1px}
.c-logo span{color:#1a1410}
.c-div{width:72px;height:2px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:10px auto}
.c-main-title{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600;color:#0d1b2a;letter-spacing:1px;line-height:1.1;margin-bottom:8px}
.c-subtitle{font-family:'Cormorant Garamond',serif;font-size:17px;color:#8b7355;font-style:italic;margin-bottom:18px}
.c-name{font-family:'Playfair Display',serif;font-size:40px;font-weight:700;color:#c9a84c;letter-spacing:.5px;line-height:1.2;margin-bottom:4px}
.c-name-line{width:280px;height:1px;background:rgba(201,168,76,.5);margin:0 auto 16px}
.c-body{font-family:'Cormorant Garamond',serif;font-size:17px;color:#374151;line-height:1.7;margin-bottom:5px}
.c-course{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0d1b2a;margin-bottom:16px;padding:0 20px}
.c-meta{display:flex;justify-content:center;gap:52px;margin-bottom:20px}
.c-meta-item{text-align:center}
.c-meta-label{font-size:9px;text-transform:uppercase;letter-spacing:1.8px;color:#9ca3af;margin-bottom:4px;font-family:'DM Sans',sans-serif}
.c-meta-value{font-size:13px;font-weight:600;color:#374151;font-family:'DM Sans',sans-serif}
.c-sigs{display:flex;justify-content:center;gap:72px;margin-top:16px}
.c-sig{text-align:center}
.c-sig-script{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#0d1b2a;margin-bottom:4px}
.c-sig-line{width:110px;height:1px;background:rgba(201,168,76,.4);margin:0 auto 6px}
.c-sig-name{font-size:11px;font-weight:600;color:#374151;font-family:'DM Sans',sans-serif}
.c-sig-role{font-size:9px;color:#9ca3af;font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}
.c-seal{position:absolute;bottom:62px;right:62px;width:68px;height:68px;border-radius:50%;border:2px solid #c9a84c;display:flex;align-items:center;justify-content:center;flex-direction:column;opacity:.75}
.name-prompt{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin-bottom:20px;text-align:center;max-width:480px;width:100%}
.name-prompt p{font-size:13px;color:var(--muted);margin-bottom:10px}
.name-prompt input{background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:11px 16px;color:var(--text);font-family:'Playfair Display',serif;font-size:16px;outline:none;width:100%;max-width:320px;transition:border .2s;text-align:center}
.name-prompt input:focus{border-color:var(--gold)}

/* MODAL */
.modal-bg{position:fixed;inset:0;background:rgba(8,9,13,.9);backdrop-filter:blur(10px);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:36px;max-width:440px;width:100%;text-align:center;animation:slideup .3s ease;box-shadow:0 40px 80px rgba(0,0,0,.7);position:relative}
.modal h2{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;margin-bottom:8px}
.modal>p{color:var(--muted);font-size:14px;margin-bottom:24px}
.modal-x{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--muted);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.modal-x:hover{color:var(--text)}
.plan-row{display:flex;gap:10px;margin-bottom:20px}
.plan-opt{flex:1;border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:all .18s;text-align:center}
.plan-opt.pon{border-color:var(--gold);background:var(--gold-dim)}
.plan-opt h4{font-size:13px;font-weight:600;margin-bottom:6px}
.plan-opt .plan-price{font-size:24px;font-weight:700;color:var(--gold);font-family:'Playfair Display',serif}
.plan-opt .plan-per{font-size:11px;color:var(--muted)}
.plan-opt .plan-save{font-size:11px;color:var(--green);font-weight:600;margin-top:4px}

/* PRICING */
.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}
.price-card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:28px;text-align:center;transition:all .2s;position:relative;display:flex;flex-direction:column}
.price-card.pc-feat{border-color:var(--gold);background:linear-gradient(160deg,var(--card),rgba(201,168,76,.05))}
.price-card:hover{transform:translateY(-4px)}
.price-card h3{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:10px}
.price-card .big-price{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;margin:12px 0 4px;letter-spacing:-.5px}
.price-card .price-per{font-size:14px;color:var(--muted);font-weight:400;font-family:'DM Sans',sans-serif}
.price-card .price-desc{font-size:13px;color:var(--muted);margin-bottom:20px;line-height:1.5}
.price-feats{text-align:left;margin:16px 0;display:flex;flex-direction:column;gap:9px;flex:1}
.price-feat{display:flex;gap:9px;font-size:13px;color:#9ca3af;align-items:flex-start;line-height:1.5}
.feat-check{color:var(--green);flex-shrink:0;margin-top:1px;font-size:13px}
.feat-badge-top{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#08090d;border-radius:100px;padding:4px 16px;font-size:11px;font-weight:700;letter-spacing:.5px;white-space:nowrap}

/* ABOUT */
.about-hero{background:linear-gradient(135deg,var(--card),rgba(201,168,76,.05));border:1px solid var(--border);border-radius:20px;padding:48px;text-align:center;margin-bottom:32px}
.about-hero h1{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;margin-bottom:12px}
.about-hero p{color:var(--muted);font-size:16px;line-height:1.8;max-width:580px;margin:0 auto 24px}
.values-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:32px}
.value-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center}
.value-icon{font-size:28px;margin-bottom:10px}
.value-card h4{font-size:15px;font-weight:600;margin-bottom:6px}
.value-card p{font-size:13px;color:var(--muted);line-height:1.55}
.story-box{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:32px}
.story-box h2{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;margin-bottom:16px}
.story-box p{font-size:14px;color:#c9d0e0;line-height:1.85;margin-bottom:12px}

/* FOOTER */
.footer{background:var(--surface);border-top:1px solid var(--border);padding:48px 24px 28px}
.footer-inner{max-width:1080px;margin:0 auto}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
@media(max-width:700px){.footer-top{grid-template-columns:1fr 1fr}}
.footer-brand p{font-size:13px;color:var(--muted);margin-top:10px;line-height:1.7;max-width:280px}
.footer-col h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--gold);margin-bottom:14px}
.footer-col a{display:block;font-size:13px;color:var(--muted);margin-bottom:9px;cursor:pointer;transition:color .15s;text-decoration:none}
.footer-col a:hover{color:var(--text)}
.footer-bottom{border-top:1px solid var(--border);padding-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.footer-bottom p{font-size:12px;color:var(--muted)}
.footer-socials{display:flex;gap:12px}
.footer-social{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);background:var(--card);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;transition:all .15s}
.footer-social:hover{border-color:var(--gold-border);color:var(--gold)}

/* NOTIFICATION TOAST */
.toast{position:fixed;bottom:24px;right:24px;background:var(--card);border:1px solid var(--green);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:10px;z-index:999;animation:slideup .3s ease;box-shadow:0 10px 40px rgba(0,0,0,.5)}
.toast span{font-size:14px;font-weight:500}
.toast .toast-icon{font-size:18px}

@media print{body>*:not(.cert-overlay){display:none!important}.cert-overlay{position:static!important;background:none!important;padding:0!important}.cert-toolbar,.back-btn,.name-prompt{display:none!important}.cert-frame{box-shadow:none!important;max-width:100%!important}}
@media(max-width:600px){.hero h1{font-size:32px}.hstat{padding:12px 16px}.hstat-num{font-size:20px}.hero-stats{flex-wrap:wrap}.hstat{border-radius:10px!important;border:1px solid var(--border)!important;margin:4px}.footer-top{grid-template-columns:1fr}}
`;

// ═══════════════════════════════════════════════════════════════════════
// RESUME TEMPLATE HTML GENERATORS
// ═══════════════════════════════════════════════════════════════════════
const GF = "https://fonts.googleapis.com/css2?family=";
const tmplFns = {
  classic: d => `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="${GF}Cormorant+Garamond:wght@400;600;700&family=EB+Garamond:ital@0;1&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'EB Garamond',serif;font-size:11.5pt;color:#1a1a1a;background:#fff;padding:44px 52px;max-width:800px;margin:0 auto}.nm{font-family:'Cormorant Garamond',serif;font-size:28pt;font-weight:700;letter-spacing:2px;text-align:center}.ti{font-size:12pt;text-align:center;color:#555;margin:5px 0 10px;font-style:italic}.ct{display:flex;justify-content:center;gap:20px;font-size:9.5pt;color:#666;flex-wrap:wrap;margin-bottom:2px}hr.T{border:none;border-top:2px solid #1a1a1a;margin:12px 0}hr.t{border:none;border-top:.5px solid #aaa;margin:10px 0}.sh{font-family:'Cormorant Garamond',serif;font-size:12pt;font-weight:700;text-transform:uppercase;letter-spacing:3px;margin-bottom:9px}.sec{margin-bottom:16px}.sum{font-size:11pt;line-height:1.75;color:#333}.bul{display:flex;gap:8px;margin-bottom:6px;font-size:11pt;line-height:1.65}.bul::before{content:'▸';font-size:8pt;margin-top:4px;flex-shrink:0}.skrow{display:flex;flex-wrap:wrap;gap:6px}.sk{background:#f5f5f5;border:.5px solid #ccc;border-radius:3px;padding:3px 9px;font-size:10pt}@media print{body{padding:28px 36px}}</style></head><body><div class="nm">${d.name||'Your Name'}</div><div class="ti">${d.title||'Professional Title'}</div><div class="ct">${d.email?`<span>✉ ${d.email}</span>`:''} ${d.phone?`<span>· ${d.phone}</span>`:''} ${d.location?`<span>· ${d.location}</span>`:''}</div><hr class="T">${d.summary?`<div class="sec"><div class="sh">Professional Summary</div><div class="sum">${d.summary}</div></div><hr class="t">`:''}${d.experience_bullets?.length?`<div class="sec"><div class="sh">Key Achievements</div>${d.experience_bullets.map(b=>`<div class="bul">${b}</div>`).join('')}</div><hr class="t">`:''}${d.skills_list?.length?`<div class="sec"><div class="sh">Core Skills</div><div class="skrow">${d.skills_list.map(s=>`<span class="sk">${s}</span>`).join('')}</div></div><hr class="t">`:''}${d.education_line?`<div class="sec"><div class="sh">Education</div><div class="sum">${d.education_line}</div></div>`:''}</body></html>`,
  modern: d => `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="${GF}Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Montserrat',sans-serif;font-size:10pt;background:#fff;display:flex;min-height:100vh}.side{width:200px;min-width:200px;background:#1e3a5f;color:#fff;padding:30px 18px;display:flex;flex-direction:column;gap:18px}.nm{font-size:14pt;font-weight:700;line-height:1.2}.ti{font-size:9pt;color:#93c5fd;font-weight:500}.sh-s{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;margin-bottom:8px}.ct p{font-size:8.5pt;color:#e0eeff;margin-bottom:5px}.sk-i{background:rgba(255,255,255,.1);border-radius:4px;padding:4px 8px;font-size:8pt;color:#e0eeff;margin-bottom:4px}.main{flex:1;padding:30px 24px}.sh-m{font-size:9.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:5px;margin-bottom:10px}.sec{margin-bottom:16px}.sum{font-size:10pt;line-height:1.75;color:#374151}.bul{display:flex;gap:8px;margin-bottom:6px;font-size:10pt;line-height:1.6;color:#374151}.bul::before{content:'•';color:#1e3a5f;font-weight:700;flex-shrink:0}.edu{font-size:10pt;color:#374151}</style></head><body><div class="side"><div><div class="nm">${d.name||'Your Name'}</div><div class="ti">${d.title||'Professional Title'}</div></div><div><div class="sh-s">Contact</div><div class="ct">${d.email?`<p>✉ ${d.email}</p>`:''} ${d.phone?`<p>${d.phone}</p>`:''} ${d.location?`<p>${d.location}</p>`:''}</div></div>${d.skills_list?.length?`<div><div class="sh-s">Skills</div>${d.skills_list.map(s=>`<div class="sk-i">${s}</div>`).join('')}</div>`:''}</div><div class="main">${d.summary?`<div class="sec"><div class="sh-m">Profile</div><div class="sum">${d.summary}</div></div>`:''}${d.experience_bullets?.length?`<div class="sec"><div class="sh-m">Key Achievements</div>${d.experience_bullets.map(b=>`<div class="bul">${b}</div>`).join('')}</div>`:''}${d.education_line?`<div class="sec"><div class="sh-m">Education</div><div class="edu">${d.education_line}</div></div>`:''}</div></body></html>`,
  minimal: d => `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="${GF}Lora:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Source Sans 3',sans-serif;font-size:11pt;color:#111;background:#fff;padding:52px 60px;max-width:800px;margin:0 auto}.nm{font-family:'Lora',serif;font-size:30pt;font-weight:600;letter-spacing:-1px;margin-bottom:4px}.ti{font-size:12pt;color:#c9a84c;font-weight:600;margin-bottom:14px}.acc{width:48px;height:3px;background:#c9a84c;border-radius:2px;margin-bottom:14px}.ct{display:flex;gap:24px;font-size:9.5pt;color:#888;margin-bottom:30px}.sh{font-size:8pt;font-weight:600;text-transform:uppercase;letter-spacing:3px;color:#c9a84c;margin-bottom:9px}.sec{display:grid;grid-template-columns:90px 1fr;gap:18px;margin-bottom:18px;align-items:start}.sum{font-size:11pt;line-height:1.8;color:#333;font-family:'Lora',serif;font-style:italic}.bul{display:flex;gap:10px;margin-bottom:7px;font-size:10.5pt;line-height:1.65;color:#333}.bul::before{content:'—';color:#c9a84c;flex-shrink:0;font-weight:300}.skrow{display:flex;flex-wrap:wrap;gap:8px}.sk{border:.5px solid #ddd;padding:4px 10px;font-size:9.5pt;color:#555;border-radius:2px}.edu{font-size:10.5pt;color:#333;line-height:1.7}</style></head><body><div class="nm">${d.name||'Your Name'}</div><div class="ti">${d.title||'Professional Title'}</div><div class="acc"></div><div class="ct">${d.email?`<span>${d.email}</span>`:''} ${d.phone?`<span>${d.phone}</span>`:''} ${d.location?`<span>${d.location}</span>`:''}</div>${d.summary?`<div class="sec"><div class="sh">About</div><div class="sum">${d.summary}</div></div>`:''}${d.experience_bullets?.length?`<div class="sec"><div class="sh">Experience</div><div>${d.experience_bullets.map(b=>`<div class="bul">${b}</div>`).join('')}</div></div>`:''}${d.skills_list?.length?`<div class="sec"><div class="sh">Skills</div><div class="skrow">${d.skills_list.map(s=>`<span class="sk">${s}</span>`).join('')}</div></div>`:''}${d.education_line?`<div class="sec"><div class="sh">Education</div><div class="edu">${d.education_line}</div></div>`:''}</body></html>`,
  exec: d => `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="${GF}Raleway:wght@300;400;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Raleway',sans-serif;font-size:10.5pt;color:#1a1a1a;background:#fff;max-width:800px;margin:0 auto}.hdr{background:#0d1b2a;color:#fff;padding:32px 42px 26px}.nm{font-size:24pt;font-weight:800;letter-spacing:-1px;margin-bottom:4px}.ti{font-size:11pt;font-weight:300;color:#93c5fd;margin-bottom:12px}.ct{display:flex;gap:20px;font-size:9pt;color:#94a3b8;flex-wrap:wrap}.main{padding:28px 42px}.sh{font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:#0d1b2a;margin-bottom:8px}.al{width:100%;height:1px;background:linear-gradient(90deg,#c9a84c,transparent);margin-bottom:12px}.sec{margin-bottom:20px}.sum{font-size:10.5pt;line-height:1.8;color:#374151}.bul{display:flex;gap:10px;margin-bottom:7px;font-size:10.5pt;line-height:1.65;color:#374151}.bul::before{content:'▶';color:#c9a84c;font-size:6pt;margin-top:5px;flex-shrink:0}.two{display:grid;grid-template-columns:1fr 1fr;gap:28px}.skrow{display:flex;flex-wrap:wrap;gap:6px}.sk{background:#f0f4f8;padding:4px 10px;font-size:9.5pt;color:#374151;border-radius:4px;border-left:2px solid #c9a84c}.edu{font-size:10.5pt;color:#374151;line-height:1.7}</style></head><body><div class="hdr"><div class="nm">${d.name||'Your Name'}</div><div class="ti">${d.title||'Professional Title'}</div><div class="ct">${d.email?`<span>✉ ${d.email}</span>`:''} ${d.phone?`<span>📱 ${d.phone}</span>`:''} ${d.location?`<span>📍 ${d.location}</span>`:''}</div></div><div class="main">${d.summary?`<div class="sec"><div class="sh">Executive Summary</div><div class="al"></div><div class="sum">${d.summary}</div></div>`:''}${d.experience_bullets?.length?`<div class="sec"><div class="sh">Key Contributions</div><div class="al"></div>${d.experience_bullets.map(b=>`<div class="bul">${b}</div>`).join('')}</div>`:''}<div class="two">${d.skills_list?.length?`<div class="sec"><div class="sh">Core Competencies</div><div class="al"></div><div class="skrow">${d.skills_list.map(s=>`<span class="sk">${s}</span>`).join('')}</div></div>`:'<div></div>'}${d.education_line?`<div class="sec"><div class="sh">Education</div><div class="al"></div><div class="edu">${d.education_line}</div></div>`:'<div></div>'}</div></div></body></html>`,
  creative: d => `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="${GF}Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Outfit',sans-serif;font-size:10.5pt;background:#fff;display:flex;min-height:100vh}.bar{width:8px;background:linear-gradient(180deg,#c9a84c,#e8c97a,#c9a84c);flex-shrink:0}.main{flex:1;padding:34px 36px}.hdr{border-bottom:2px solid #f0f0f0;padding-bottom:16px;margin-bottom:20px}.nm{font-size:24pt;font-weight:800;color:#0a0c10;letter-spacing:-1px;margin-bottom:3px}.ti{font-size:11pt;font-weight:500;color:#c9a84c;margin-bottom:10px}.ct{display:flex;gap:16px;font-size:9pt;color:#9ca3af;flex-wrap:wrap}.g2{display:grid;grid-template-columns:1fr 1fr;gap:26px}.sh{font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c9a84c;margin-bottom:9px;display:flex;align-items:center;gap:8px}.sh::after{content:'';flex:1;height:1px;background:#e5e7eb}.sec{margin-bottom:18px}.sum{font-size:10.5pt;line-height:1.8;color:#374151}.bul{display:flex;gap:10px;margin-bottom:7px;font-size:10.5pt;line-height:1.6;color:#374151}.dg{width:6px;height:6px;border-radius:50%;background:#c9a84c;flex-shrink:0;margin-top:6px}.skrow{display:flex;flex-wrap:wrap;gap:6px}.sk{background:#fef9ec;border:1px solid #f0d78a;color:#92650a;border-radius:100px;padding:3px 11px;font-size:9.5pt;font-weight:500}.edu{font-size:10.5pt;color:#374151;line-height:1.7}</style></head><body><div class="bar"></div><div class="main"><div class="hdr"><div class="nm">${d.name||'Your Name'}</div><div class="ti">${d.title||'Professional Title'}</div><div class="ct">${d.email?`<span>✉ ${d.email}</span>`:''} ${d.phone?`<span>· ${d.phone}</span>`:''} ${d.location?`<span>· ${d.location}</span>`:''}</div></div>${d.summary?`<div class="sec"><div class="sh">About Me</div><div class="sum">${d.summary}</div></div>`:''}${d.experience_bullets?.length?`<div class="sec"><div class="sh">Highlights</div>${d.experience_bullets.map(b=>`<div class="bul"><div class="dg"></div>${b}</div>`).join('')}</div>`:''}<div class="g2">${d.skills_list?.length?`<div class="sec"><div class="sh">Skills</div><div class="skrow">${d.skills_list.map(s=>`<span class="sk">${s}</span>`).join('')}</div></div>`:'<div></div>'}${d.education_line?`<div class="sec"><div class="sh">Education</div><div class="edu">${d.education_line}</div></div>`:'<div></div>'}</div></div></body></html>`,
};
const TEMPLATES = [{id:'classic',name:'Classic'},{id:'modern',name:'Modern'},{id:'minimal',name:'Minimal'},{id:'exec',name:'Executive'},{id:'creative',name:'Creative'}];

// ═══════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════
const TIPS_DATA = [
  {id:'personality',icon:'🌟',title:'Personality Building',desc:'Craft a magnetic professional identity that commands respect in any room.',color:'rgba(201,168,76,.06)',
   points:[{h:'Define Your 3 Core Values',b:'Write 3 non-negotiables that guide every decision you make professionally. People with clear values are perceived as more trustworthy and decisive by everyone around them.'},{h:'Develop a Growth Mindset Daily',b:'Replace "I can\'t do this" with "I can\'t do this yet." Read one career-relevant book per month. Keep a daily reflection journal of what you learned. The habit, not the content, is the transformation.'},{h:'Master Non-Verbal Communication',b:'55% of professional impressions are formed before you speak. Practice a firm handshake, steady eye contact, open posture with feet hip-width and shoulders back. Rehearse in a mirror daily for 5 minutes.'},{h:'Build Emotional Intelligence',b:'Practice the STOP technique — Stop, Take a breath, Observe your emotion, Proceed with intention. This 10-second habit prevents 90% of reactive professional mistakes.'},{h:'Develop a Signature Presence',b:'Dress intentionally, speak deliberately, and choose 2–3 topics you become genuinely expert in. People remember specialists who communicate with quiet confidence far more than people who are good at everything.'}]},
  {id:'networking',icon:'🤝',title:'Strategic Networking',desc:'Build relationships that open doors — not just a list of contacts.',color:'rgba(34,197,94,.03)',
   points:[{h:'Give Generously Before You Ask',b:'Share an article, make an introduction, offer a useful skill. Generosity without expectation creates advocates who will recommend you without you ever having to ask.'},{h:'Attend 2 Events Per Month',b:'Go to industry meetups, webinars, and alumni events. Prepare 3 thoughtful questions in advance. Ask about their challenges, not their job title — deep questions create memorable conversations.'},{h:'Follow Up Within 24 Hours',b:'Send a personalised message referencing something specific from your conversation. "I loved what you said about X — I had a similar experience with..." This is what 95% of people skip, which is exactly why it works.'},{h:'Maintain 10 Key Relationships',b:'Identify your 10 most valuable professional relationships. Set a monthly calendar reminder for each. Check in with something genuinely useful — not just "Hope you\'re well."'},{h:'Build an Online Presence First',b:'Post 3 times per week on LinkedIn before any event. When you walk into a room, people who\'ve read your content feel they already know you. This changes every conversation you have.'}]},
  {id:'branding',icon:'💡',title:'Personal Branding',desc:'Become the name people mention when opportunities arise.',color:'rgba(59,130,246,.03)',
   points:[{h:'Define Your One-Line Positioning',b:'Complete this: "I help [specific audience] achieve [specific outcome] through [specific method]." If you can\'t complete it clearly, your brand isn\'t clear. Do this first before anything else.'},{h:'Create Content Consistently',b:'Post 3 times per week on LinkedIn — lessons learned, opinions on industry news, case studies from your work. Consistency over 60 days builds an audience. Most people quit at day 14.'},{h:'Build a Portfolio Website',b:'A simple site (Notion, Wix, or Webflow) with your story, 3 work samples, and a contact form makes you 40% more memorable than a resume alone. Set it up this weekend — it takes 4 hours.'},{h:'Become a Niche Expert',b:'Choose 1–2 topics and go deep, not wide. Write about those topics exclusively for 90 days. You will become known for them. Specialists are paid far more than generalists.'},{h:'Own Your Google Search Results',b:'Create profiles on GitHub, Medium, Substack, or Behance so your first page of Google results is curated by you. Recruiters search for you before they call you.'}]},
  {id:'linkedin',icon:'💼',title:'LinkedIn Mastery',desc:'Turn your LinkedIn profile into a 24/7 opportunity machine.',color:'rgba(59,130,246,.05)',
   points:[{h:'Rewrite Your Headline Immediately',b:'Your headline should say: "[Role] | I help [audience] achieve [result]." Not just your job title. Profiles with outcome-focused headlines get 3x more views from recruiters in the same 7-day period.'},{h:'Write a First-Person About Section',b:'Start with a bold hook about the problem you solve. Then explain your journey in 3 paragraphs. End with a specific call-to-action. Use "I" not "Experienced professional with 10+ years" — that opener kills interest instantly.'},{h:'Activate Creator Mode',b:'Enable Creator Mode in LinkedIn settings. This adds a Follow button, reveals your content in more feeds, and gives you access to Creator analytics. Do it today — it takes 2 minutes.'},{h:'Comment 10 Times Per Day',b:'Leave 5–7 sentence meaningful comments on posts in your niche. This is the single fastest way to grow on LinkedIn. Your comment reaches the audience of the original post — that is free visibility worth thousands of rupees in advertising.'},{h:'Ask for 3 Specific Recommendations',b:'Reach out to past managers or clients and give them specific guidance: "Could you mention my ability to manage high-pressure client relationships?" Specific recommendations are 5x more convincing than generic ones.'}]},
  {id:'interview',icon:'🎯',title:'Interview Excellence',desc:'Walk into any interview as the obvious choice before you say a word.',color:'rgba(201,168,76,.04)',
   points:[{h:'Master the STAR Method',b:'For every behavioural question, use: Situation (2 sentences), Task (1 sentence), Action (3–4 sentences, use "I" not "we"), Result (quantified outcome). Practice 15 stories using this structure. Every interview question maps to one of them.'},{h:'Research at 3 Levels',b:'Level 1: Company (mission, recent news, products). Level 2: Role (exact responsibilities, success metrics). Level 3: Interviewer (LinkedIn profile, recent posts, their career path). Reference all three in your answers naturally.'},{h:'Prepare 5 Strong Questions',b:'Ask: "What does success look like in the first 90 days?" "What is the biggest challenge this team is facing right now?" "How would you describe the culture?" These signal strategic thinking, not just interest.'},{h:'Do a 48-Hour Debrief Practice',b:'48 hours before any interview, write out answers to these 10: Tell me about yourself. Greatest strength. Greatest weakness. Why this company. Why this role. Tell me about a failure. A time you led. A time you disagreed. Where do you see yourself in 5 years. Salary expectation.'},{h:'Send a Follow-Up Email Within 4 Hours',b:'Most candidates do not do this. A 3-sentence thank-you email that references one specific thing discussed and reiterates your enthusiasm has been shown to change hiring decisions. Write it while you are still in the building.'}]},
  {id:'productivity',icon:'⚡',title:'Professional Productivity',desc:'Do the work of 3 people in the time of 1 — sustainably.',color:'rgba(34,197,94,.04)',
   points:[{h:'Time-Block Your 3 Most Important Tasks',b:'Every morning, identify your 3 Most Important Tasks for the day. Block 2–3 hours for deep work on them before you open email or Slack. Research shows this single habit accounts for 80% of career advancement.'},{h:'Apply the 2-Minute Rule',b:'If a task takes less than 2 minutes, do it immediately. This prevents small tasks from accumulating into an anxiety-producing backlog that drains your mental bandwidth all day.'},{h:'Weekly Review Every Friday',b:'Spend 20 minutes every Friday reviewing: what you completed, what is pending, what needs to move to next week, and what your top 3 priorities are for Monday. This one ritual prevents the Sunday-evening dread that kills professional momentum.'},{h:'Protect Your Energy, Not Just Your Time',b:'Schedule your hardest thinking work during your personal peak energy window (most people: 9–11am). Meetings in the early afternoon. Administrative tasks late afternoon. Mismatching task difficulty with energy level costs 3–4 hours of effective work per day.'},{h:'Learn to Say No Strategically',b:'Every time you say yes to something unaligned with your goals, you say no to something important. Use: "I can\'t take this on right now without compromising the quality of X — can we revisit next month?" This protects your reputation while declining.'}]},
];

const TESTIMONIALS = [
  {stars:5,text:"I landed a Senior PM role at Flipkart 3 weeks after using CareerCraft's resume builder and LinkedIn guide. The AI resume was so good the recruiter asked me if I had a professional writer. I told them about this platform.",name:"Arjun Mehta",role:"Senior Product Manager, Flipkart",avatar:"AM",color:"#1e3a5f"},
  {stars:5,text:"The Public Speaking course completely changed how I show up in client meetings. I used to avoid speaking. Now I volunteer to present. Got promoted within 2 months of finishing the course.",name:"Divya Krishnan",role:"Account Manager, Deloitte",avatar:"DK",color:"#1a3a1a"},
  {stars:5,text:"The certificate I downloaded was so beautiful and professional I actually framed it. But more importantly — the quiz format meant I actually retained what I learned. This isn't just content, it's real learning.",name:"Ravi Sharma",role:"Marketing Lead, Razorpay",avatar:"RS",color:"#2a1a3a"},
  {stars:5,text:"I'm a fresh graduate with no work experience. The resume builder and interview prep section helped me get 4 interview calls in a week. I start my first job next month.",name:"Priya Nair",role:"Business Analyst (fresher), TCS",avatar:"PN",color:"#1a2a3a"},
  {stars:5,text:"The LinkedIn tips alone are worth 10x the Pro subscription. I went from 0 profile views to being approached by 3 recruiters in the same month after following the exact steps.",name:"Karan Gupta",role:"Software Engineer, Zomato",avatar:"KG",color:"#2a1a1a"},
  {stars:5,text:"I was skeptical about online career platforms but this one is genuinely different. The content is deep, practical, and the platform looks absolutely beautiful. Worth every rupee.",name:"Sneha Iyer",role:"HR Business Partner, Infosys",avatar:"SI",color:"#1a3a2a"},
];

const FAQS = [
  {q:"Is the free version really free? What's the catch?",a:"Genuinely free — no credit card, no trial, no catch. The AI resume builder, all 5 resume templates with PDF download, the full Public Speaking course (4 video lessons + quizzes + certificate), the full Professional Communication course (4 video lessons + quizzes + certificate), and all 6 career tip guides are completely free forever. We make money when you upgrade to Pro for the premium courses."},
  {q:"What do I get with the Pro plan?",a:"Pro unlocks all 4 premium courses: Emotional Intelligence at Work, Negotiation & Influence, Creative Problem Solving, and Personal Branding & LinkedIn Mastery. You also get new courses added every month, downloadable workbooks and resources, and priority access to new features. It's ₹299/month or ₹1,999/year (that's 44% cheaper than monthly)."},
  {q:"How does the e-certificate work? Is it verifiable?",a:"After completing all lessons in a course and passing the final assessment (75% or above), you enter your name and download a professionally designed PDF certificate. It includes a unique Certificate ID, date of issue, course name, and duration. You can add it to your LinkedIn profile, CV, or share it with employers. Each certificate has a unique ID that confirms authenticity."},
  {q:"How is the AI resume builder different from a regular template?",a:"You enter your raw information in your own words — however messy or incomplete — and our AI rewrites it into polished, ATS-optimised professional language with strong action verbs and quantified bullet points. You then choose from 5 professional templates (Classic, Modern, Minimal, Executive, Creative) and download as PDF. It's like having a professional resume writer for free."},
  {q:"Can I cancel my Pro subscription anytime?",a:"Yes — cancel with one click anytime from your account settings. You keep access until the end of your billing period. No cancellation fees, no questions asked. We offer a 7-day money-back guarantee if you're not satisfied for any reason."},
  {q:"I have no professional experience. Can this platform help me?",a:"Absolutely — this platform is designed for everyone from fresh graduates to senior professionals. The resume builder works for first jobs, the interview prep covers entry-level interviews, and many of the soft skills courses are even more valuable early in your career. Several of our success stories are from freshers who landed their first role using CareerCraft."},
  {q:"How do I use this to get a job faster?",a:"Week 1: Build your AI resume (all 5 templates), optimise your LinkedIn using our guide. Week 2: Complete the Public Speaking course — this alone changes how you carry yourself in interviews. Week 3: Study the interview prep guide, practice your STAR stories. Week 4: Apply with your new resume. Users who follow this sequence report getting interview calls within 2–4 weeks."},
  {q:"Are the video lessons original content?",a:"The lessons use curated TED talks and expert talks from YouTube (some with 20M+ views) combined with our own original written content — detailed lesson notes, key takeaways, practice exercises, pro tips, and quizzes. This combination of the best public content + our original frameworks gives you far more than you'd get from either alone."},
];

const PAID_COURSES_DATA = [
  {id:3,icon:'🧠',title:'Emotional Intelligence at Work',desc:'Daniel Goleman\'s 5-pillar framework, self-regulation techniques, empathy-building exercises, and managing difficult workplace personalities.',color:'#1a0a20',price:'₹299',lessons:8,duration:'4h 30m'},
  {id:4,icon:'🤝',title:'Negotiation & Influence',desc:'Harvard Principled Negotiation + FBI\'s tactical empathy method. Scripts for salary negotiations, promotions, and everyday professional influence.',color:'#0a1520',price:'₹399',lessons:7,duration:'4h'},
  {id:5,icon:'🎨',title:'Creative Problem Solving',desc:'Design thinking, SCAMPER, lateral thinking, and reframing techniques from IDEO, Stanford d.school, and Google X.',color:'#0a1a0a',price:'₹349',lessons:6,duration:'3h 30m'},
  {id:6,icon:'🏆',title:'Personal Branding & LinkedIn',desc:'Build a brand that attracts opportunities while you sleep — content strategy, profile optimization, recruiter psychology, and audience building.',color:'#1a1500',price:'₹299',lessons:7,duration:'3h 45m'},
];

const FREE_COURSES_DATA = [
  {
    id:1,icon:'🗣️',title:'Public Speaking & Presence',desc:'From stage fright to commanding any room — with TED-level structure, vocal power techniques, and body language mastery.',color:'#0d1b2a',duration:'2h 40m',
    assessment:[
      {q:'What percentage of people experience fear of public speaking?',opts:['25%','50%','75%','90%'],ans:2,exp:'75% of people experience glossophobia — making it one of the most common fears worldwide and one of the most learnable skills.'},
      {q:'Harvard\'s Alison Wood Brooks found that saying what before a speech improves performance?',opts:['"I am calm"','"I am excited"','"I am prepared"','"I am confident"'],ans:1,exp:'"I am excited" reframes physiological arousal from threat to opportunity, measurably improving performance outcomes.'},
      {q:'Every effective speech should contain how many main points?',opts:['2','3','5','7'],ans:1,exp:'Three is the rule — the human brain naturally organises and retains information in triads. More than three and retention drops sharply.'},
      {q:'What percentage of communication impact does voice carry?',opts:['7%','38%','55%','20%'],ans:1,exp:'Voice carries 38% of impact in emotionally significant communication, according to Dr Albert Mehrabian\'s research.'},
      {q:'A strategic pause of how long creates the most emphasis after a key point?',opts:['0.5 seconds','2–4 seconds','8 seconds','15 seconds'],ans:1,exp:'2–4 seconds of deliberate silence after a key point gives it more weight than any adjective or exclamation mark ever could.'},
      {q:'What percentage of emotional communication is non-verbal?',opts:['7%','38%','55%','20%'],ans:2,exp:'Body language — posture, gestures, eye contact — carries 55% of emotional communication impact, according to Mehrabian\'s model.'},
      {q:'How long should eye contact with one person last in a group setting?',opts:['10–15 seconds','3–5 seconds','30 seconds','1 second'],ans:1,exp:'3–5 seconds creates genuine connection without feeling like staring. Move your gaze intentionally through the room after that.'},
      {q:'Amy Cuddy\'s research shows that holding a power pose for how long changes your hormonal profile?',opts:['30 seconds','2 minutes','10 minutes','1 hour'],ans:1,exp:'Exactly 2 minutes of expansive posture measurably raises testosterone and lowers cortisol — changing how you feel and appear.'},
    ],
    lessons:[
      {id:1,title:'Overcoming Fear & Stage Fright',dur:'22 min',videoId:'8eRx5Wo3xIA',videoLabel:'Julian Treasure — "How to speak so people want to listen" (TED)',
       intro:'Fear of public speaking affects 75% of people — yet it is one of the most learnable skills in the world. You will understand exactly why your body reacts the way it does and walk away with 5 proven, science-backed techniques.',
       prose:['When you stand up to speak, your amygdala — the brain\'s alarm system — interprets the audience\'s gaze as a physical threat. This triggers the same fight-or-flight response your ancestors used against predators. Cortisol and adrenaline flood your bloodstream, causing a racing heart, sweaty palms, dry mouth, and shaky hands. Here is the most important insight: your body is not failing you. It is giving you an enormous energy boost — the exact same chemistry that elite athletes feel before competition.','Harvard researcher Alison Wood Brooks found that people who told themselves "I am excited" before a high-stakes speech performed significantly better than those who tried to calm down. The same physiological state — reframed as excitement rather than threat — produces measurably better outcomes. You cannot think your way to calm. But you can redirect the energy.','Technique 1 — Box Breathing: Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 4 times. This physiologically activates your parasympathetic nervous system and lowers cortisol within 90 seconds. Use backstage, in the elevator, or at your desk. Technique 2 — Power Posing: 2 minutes of expansive, open posture before speaking raises testosterone and lowers cortisol measurably. Technique 3 — Vivid Visualization: 10 minutes of vividly imagining a successful speech activates identical neural pathways as actual rehearsal. Technique 4 — Audience Reframing: Replace "They are judging me" with "They want me to succeed. My success is their success." Technique 5 — Progressive Exposure: Record a 1-minute video opinion every day for 30 days. Your nervous system builds tolerance through repetition, not resolution.'],
       keyPoints:[{icon:'🧠',h:'Reframe anxiety as excitement',b:'Say "I am excited" instead of "I am nervous." Harvard research shows this reframe measurably improves speech performance outcomes.'},{icon:'💨',h:'Box breathing calms you in 90 seconds',b:'4-count in, hold 4, out 4, hold 4. Physiologically activates your parasympathetic nervous system before any high-stakes moment.'},{icon:'💪',h:'Power posing changes your chemistry',b:'2 minutes of open, expansive posture raises confidence hormones and lowers stress hormones — change your body to change your mind.'},{icon:'🎯',h:'Preparation is the ultimate cure',b:'80% of speaking anxiety comes from insufficient preparation. Know your opening and closing lines completely cold.'}],
       exercise:'This week, record yourself speaking on any topic for exactly 3 minutes on your phone. Watch it back once with sound and once on mute. Write one thing you did well and one specific thing to improve. Repeat weekly for 4 weeks.',
       proTip:'Elite speakers still feel nervous before taking the stage. The difference is they\'ve learned that butterflies mean they care about doing well. You don\'t eliminate the feeling — you channel it.',
       quiz:[{q:'What triggers your body\'s fight-or-flight response when you stand up to speak?',opts:['The bright lights on stage','The amygdala interpreting the audience as a threat','Dehydration from nerves','Incorrect breathing technique'],ans:1,exp:'The amygdala triggers fight-or-flight when it perceives the audience\'s gaze as a threat — even though they mean no harm whatsoever.'},{q:'What did Harvard\'s Alison Wood Brooks discover improves speech performance?',opts:['Saying "I am calm"','Saying "I am excited"','Deep meditation backstage','Avoiding eye contact initially'],ans:1,exp:'"I am excited" reframes the same physiological arousal from threat to opportunity, producing measurably better performance outcomes.'},{q:'What does Box Breathing involve?',opts:['Breathing into a paper bag','4 counts in, hold 4, out 4, hold 4','Just exhaling slowly for 30 seconds','Holding your breath for as long as possible'],ans:1,exp:'Box Breathing — 4-4-4-4 — activates the parasympathetic nervous system and physiologically lowers cortisol within 90 seconds.'},{q:'What is the #1 cause of public speaking anxiety?',opts:['Poor posture on stage','Loud and intimidating audiences','Under-preparation for the content','Bad lighting in the room'],ans:2,exp:'80% of public speaking anxiety stems directly from under-preparation. Know your material thoroughly and your nerves will follow suit.'}]},
      {id:2,title:'Structuring Any Speech for Impact',dur:'25 min',videoId:'xnFF9F5_kAU',videoLabel:'Nancy Duarte — "The Secret Structure of Great Talks" (TED)',
       intro:'Great speakers are not born with charisma — they master structure. When your speech is built on a solid framework, you always know where you are and where you are going, and that knowledge creates genuine confidence.',
       prose:['Every effective speech follows the same skeleton: tell them what you\'ll say, say it, then tell them what you said. But within this, the opening is everything. Your first 30 seconds determine whether your audience mentally checks in or checks out for the remainder of your speech. Never open with "Good morning, my name is..." or "I\'m so happy to be here today." These openers waste the audience\'s most receptive moment.','Five proven opening hooks: (1) The Question — "What if everything you believed about career success was built on a lie?" This forces mental engagement instantly. (2) The Statistic — "In the time it takes me to give this speech, 300 people will lose their job." Numbers create context. (3) The Mid-Scene Story — begin in the middle of a dramatic moment, not at the beginning. "It was 11pm, my phone rang, and everything changed." (4) The Bold Claim — "The skill most likely to double your salary in 3 years is not what they teach in any MBA programme." (5) Strategic Silence — walk to centre stage and hold eye contact with the audience for 5 full seconds without speaking. The room\'s attention becomes absolute.','THE BODY: Make exactly 3 main points. Not 2, not 5 — 3. The human brain organises information in triads instinctively. Within each point: one story (emotional connection), one fact (credibility), one example (clarity). THE CLOSE: Summarise in one sentence, deliver a specific call to action, end on an emotional high — a callback to your opening, an inspiring quote, or a vivid vision of a better future. Write your closing line before you write anything else.'],
       keyPoints:[{icon:'🎣',h:'Hook in the first 30 seconds',b:'Question, statistic, mid-scene story, bold claim, or strategic silence. Never introduce yourself first — waste not your audience\'s most receptive moment.'},{icon:'3️⃣',h:'Exactly 3 main points',b:'The brain loves triads. More than 3 points and the audience cannot retain your message. Less than 3 feels thin and unsubstantiated.'},{icon:'📖',h:'Story + Fact + Example per point',b:'Each point needs all three: story creates emotion, fact creates credibility, example creates clarity. Skip any one and the point loses power.'},{icon:'🎯',h:'Close with one clear action',b:'Tell your audience the single, specific thing you want them to think or do next. Vague closings waste the entire speech.'}],
       exercise:'Write a 3-minute speech about your career journey using today\'s structure. Use one opening hook from the list. Make exactly 3 points about what shaped you professionally. Close with what you want your listener to do differently.',
       proTip:'Write your closing line before you write anything else. Knowing your destination — the exact final image or sentence — makes every other creative decision easier. The best speakers work backward from their finish.',
       quiz:[{q:'How many main points should any effective speech contain?',opts:['2','3','5','7'],ans:1,exp:'Three is the rule — it matches how the human brain naturally organises and retains information. More than three and retention drops sharply.'},{q:'Which of these is NOT one of the 5 proven opening hooks?',opts:['The Question','The Statistic','The Self-Introduction','The Bold Claim'],ans:2,exp:'Self-introduction is the weakest possible opening. The 5 hooks are: Question, Statistic, Mid-Scene Story, Bold Claim, and Strategic Silence.'},{q:'Within each main point, what three elements create maximum impact?',opts:['Fact, statistic, and data','Story, fact, and example','Question, answer, and summary','Headline, body, and conclusion'],ans:1,exp:'Each point needs: a story (emotional connection), a fact (credibility), and an example (clarity). All three together makes ideas simultaneously memorable and believable.'},{q:'What should you write first when preparing any speech?',opts:['The opening hook','The three main points','The closing line','The title of the speech'],ans:2,exp:'Write your closing line first. Knowing your destination makes every other creative decision easier — great speakers work backward from their finish.'}]},
      {id:3,title:'Vocal Power — Pitch, Pace & Pause',dur:'20 min',videoId:'eIho2S0ZahI',videoLabel:'Roger Love — "How to Use Your Voice" (TEDx)',
       intro:'Your voice carries 38% of your communication impact. HOW you say something is more influential than WHAT you say. In this lesson you will master the four vocal levers used by TED speakers, executives, and top performers worldwide.',
       prose:['The four vocal levers: PITCH — vary the height of your voice deliberately. Rise in pitch when building excitement or asking questions. Drop to your lowest comfortable pitch when delivering your most important statements — lower pitch is universally associated with authority, trustworthiness, and confidence. The skill is creating contrast: a voice that only stays low is as monotone as one that only stays high. PACE — slow down approximately 30% from your natural conversational speed when speaking to a group. Most nervous speakers rush because they want to escape the spotlight. Rushing signals anxiety. Strategic pauses of 2–4 seconds after your most important point give it weight no word can replicate.','VOLUME — unexpected quietness is more powerful than loudness. When a room is quiet, dropping to near-whisper at a climactic moment makes every listener physically lean forward. This technique — the "velvet hammer" — is used by master storytellers and TED speakers to create moments of intense, intimate focus. RESONANCE — the warm, rich quality of voices like Morgan Freeman or Oprah Winfrey. Find yours: place your hand on your chest and hum at a comfortable pitch. Feel the vibration. That is chest resonance. The more you practise speaking from this place, the more authoritative and trustworthy your voice will sound to others.','PRE-SPEECH 5-MINUTE WARM-UP: (1) Lip trills — blow air through loosely closed lips for 30 seconds. (2) Tongue twisters — "red leather, yellow leather" rapidly for 30 seconds. (3) Sirens — slide from your lowest to highest comfortable pitch 5 times smoothly. (4) Exaggerated yawning — opens the throat and reduces tension. (5) Humming — at a comfortable pitch for 30 seconds. These 5 exercises, done consistently before every speaking engagement, will transform your vocal performance in 30 days.'],
       keyPoints:[{icon:'🎵',h:'Variation is absolutely everything',b:'A monotone voice — even a deep one — loses audiences within 4–5 minutes regardless of content. Range between high and low creates energy and engagement.'},{icon:'⏸️',h:'Silence after a key point IS the emphasis',b:'2–4 seconds of deliberate silence gives your most important sentence more weight than any adjective, volume increase, or exclamation mark could ever provide.'},{icon:'🔉',h:'Whispering creates more impact than shouting',b:'A sudden drop in volume at a climactic moment makes every listener lean in. Counterintuitive — but one of the most powerful speaking techniques in existence.'},{icon:'🎙️',h:'Warm up for 5 minutes every single time',b:'Your vocal cords are muscles. Asking them to perform without a warm-up leads to strain, cracks, reduced range, and a voice that signals stress rather than confidence.'}],
       exercise:'Read a paragraph from any book aloud — first at your normal speaking pace, then at 70% of that speed with deliberate 2-second pauses between sentences. Record both versions. Listen back and notice how dramatically pacing changes the perceived authority of identical words.',
       proTip:'Listen to a voice note of yourself and identify your three most frequent filler words: "um," "uh," "like," "basically," "you know," "right." Awareness of your specific verbal tics is the first and most powerful step to eliminating them.',
       quiz:[{q:'What percentage of your communication impact does your voice carry?',opts:['7%','38%','55%','20%'],ans:1,exp:'Voice — pitch, pace, volume, and tone — carries 38% of impact in emotionally significant communication, more than the actual words themselves.'},{q:'By approximately how much should you slow your pace when speaking to groups?',opts:['10%','50%','30%','70%'],ans:2,exp:'30% slower than conversational pace is the sweet spot — giving the audience enough time to absorb each idea without feeling slow or boring.'},{q:'What technique creates more emphasis than any adjective after a key point?',opts:['Repeating the point twice','Speaking louder','A deliberate 2–4 second pause','Using stronger verbs'],ans:2,exp:'A deliberate 2–4 second pause after your most important sentence gives it dramatic weight that no word, volume increase, or repetition can replicate.'},{q:'Where does vocal resonance come from?',opts:['Speaking from the throat','Speaking from the chest','Using a microphone at the right distance','Increasing your overall volume'],ans:1,exp:'Chest resonance is the warm, authoritative vibration felt when speaking from your chest — the quality you hear in voices like Morgan Freeman and Oprah.'}]},
      {id:4,title:'Body Language That Commands Respect',dur:'23 min',videoId:'Ks-_Mh1QhMc',videoLabel:'Amy Cuddy — "Your Body Language Shapes Who You Are" (TED) · 60M+ views',
       intro:'55% of your communication is non-verbal. Before you speak a single word, your body has already shaped how your audience feels about you. Master the body language codes of confident, credible, and trustworthy communicators.',
       prose:['Dr. Albert Mehrabian\'s research established that in emotionally significant communications, words carry 7% of meaning, voice carries 38%, and body language carries 55%. When your words say one thing but your body says another, people believe your body every single time — because our brains are wired to detect non-verbal signals at speeds far faster than conscious thought. THE POSTURE FOUNDATION: Stand with feet hip-width apart, weight equally distributed. Shoulders back and down — not raised around your ears. Chin parallel to the floor — not tilted down (submissive) or excessively up (arrogant). This single posture adjustment makes you appear 40% more authoritative to observers without any change in your words or content.','EYE CONTACT — the single most powerful non-verbal signal available: In groups, make eye contact with individual people for 3–5 seconds — enough to create genuine connection, short enough not to feel like staring. Move your gaze intentionally around the room so everyone feels seen. When making your most important point, hold eye contact with one person for the entire thought. Avoid scanning the room rapidly (signals nerves), looking above heads (signals disengagement), or focusing on only one side (signals bias). GESTURES — use your hands to illustrate ideas, not just to wave randomly. Open palms upward convey honesty and openness — this is an ancient biological trust signal. The "steeple" (fingertips touching to form an arch) signals deep expertise. Keep gestures above the waist and within the "gesture box" — between your shoulders and waist.','THE POWER POSE — Amy Cuddy\'s research: holding an expansive, open pose for just 2 minutes before a high-stakes interaction changes your hormonal profile measurably. Testosterone (confidence hormone) rises approximately 20%. Cortisol (stress hormone) falls approximately 25%. You literally feel more powerful — and your audience perceives it. Do this in a bathroom or private space before any important presentation, interview, or meeting. WHAT TO AVOID: Crossed arms (defensive and closed), hands in pockets (hiding), touching your face while speaking (deception signal that people unconsciously distrust), swaying or rocking (nervous energy that undermines authority), nodding excessively (approval-seeking).'],
       keyPoints:[{icon:'🧍',h:'Posture is the foundation of everything',b:'Feet hip-width, shoulders back and down, chin level. This single adjustment changes how people perceive your authority — before you say a single word.'},{icon:'👁️',h:'3–5 seconds of genuine eye contact',b:'Long enough to create real connection with each person, short enough not to feel like staring. Move intentionally through the room so everyone feels seen.'},{icon:'🙌',h:'Open palms are a biological trust signal',b:'Hands visible with palms upward or forward is an ancient signal that the human brain still responds to powerfully — it signals openness, honesty, and safety.'},{icon:'💪',h:'2-minute power pose changes your hormones',b:'Science shows this pre-speech ritual measurably shifts testosterone up and cortisol down — changing not just how you appear but genuinely how you feel.'}],
       exercise:'For the next 7 days, set a daily phone reminder labelled "Posture Check." When it goes off: feet hip-width, shoulders back and down, chin level. This builds automatic confident posture so it becomes natural on stage.',
       proTip:'Before your next important meeting or presentation, find a private space and hold a power pose for exactly 2 minutes. Arms wide or hands on hips, eyes level or above. You will walk in feeling and appearing genuinely different. Try it once.',
       quiz:[{q:'What percentage of emotional communication is non-verbal?',opts:['7%','38%','55%','20%'],ans:2,exp:'Body language — posture, gestures, eye contact, facial expression — carries 55% of emotional communication impact in face-to-face settings.'},{q:'How long should eye contact with one person last in a group speech?',opts:['10–15 seconds','3–5 seconds','30 full seconds','Just 1 second'],ans:1,exp:'3–5 seconds creates genuine connection without feeling like staring. After each thought, move your gaze intentionally to another person in the room.'},{q:'How long should you hold a power pose before a high-stakes situation?',opts:['30 seconds','2 minutes','10 minutes','1 hour'],ans:1,exp:'Amy Cuddy\'s research shows exactly 2 minutes of expansive posture measurably changes testosterone and cortisol — changing how you feel and how you appear.'},{q:'Which body language signal conveys honesty and openness to the human brain?',opts:['Crossed arms','Hands firmly in pockets','Open palms facing upward or forward','Pointing a finger directly at the audience'],ans:2,exp:'Open palms is an ancient biological trust signal that the human brain still responds to powerfully — it indicates there are no hidden weapons or intentions.'}]}
    ]
  },
  {
    id:2,icon:'📩',title:'Professional Communication Mastery',desc:'Write emails that get read, speak in meetings that get remembered, and listen in a way that builds deep, lasting professional trust.',color:'#102020',duration:'2h 15m',
    assessment:[
      {q:'In the Pyramid Principle, what always comes first?',opts:['Background context','Evidence and data','Your conclusion or recommendation','Your question to the reader'],ans:2,exp:'The Pyramid Principle always leads with the conclusion. Most people build context and bury the conclusion — this forces readers to read everything before knowing why they should care.'},
      {q:'The "So What?" test helps you identify sentences the reader...',opts:['Will remember forever','Cannot understand','Does not actually care about','Will find offensive'],ans:2,exp:'If you cannot answer "So what?" with something the reader genuinely cares about, that sentence should be cut. Apply this ruthlessly to every sentence you write.'},
      {q:'What does the "S" in the SBI feedback framework stand for?',opts:['Summary','Situation','Skill','Statement'],ans:1,exp:'SBI = Situation, Behaviour, Impact. "S" is Situation — the specific context in which the behaviour occurred, stated factually and without judgment.'},
      {q:'What does the "R" in the RASA listening framework stand for?',opts:['Reply','Receive','Reflect','React'],ans:1,exp:'RASA = Receive, Appreciate, Summarise, Ask. Starting with Receive means giving your full, undivided physical attention — phone away, body turned toward the speaker.'},
      {q:'How long should you wait after someone stops speaking before responding?',opts:['1 second','3 seconds','10 seconds','30 seconds'],ans:1,exp:'Waiting 3 seconds after someone stops speaking consistently surfaces the most important, unguarded information in any conversation.'},
      {q:'Which language approach invites curiosity rather than defensiveness?',opts:['"You always..."','"You never..."','"I noticed..."','"Everyone agrees that..."'],ans:2,exp:'"I noticed" describes an observation without accusation. "You always/never" triggers immediate defensiveness and shuts down the productive conversation you need.'},
      {q:'The "Third Story" technique means describing a conflict from whose perspective?',opts:['Your perspective only','The other person\'s perspective','A neutral observer\'s perspective','Your manager\'s perspective'],ans:2,exp:'The Third Story means describing the conflict as a neutral observer would — outside both perspectives — which signals curiosity and openness over combat.'},
      {q:'Most professionals speak up in what fraction of the meetings they attend?',opts:['All of them','1 in 2','1 in 3','1 in 5'],ans:3,exp:'Research shows most professionals speak in only 1 in 5 meetings they attend — which is exactly why those who speak consistently are perceived as high performers.'},
    ],
    lessons:[
      {id:1,title:'The Pyramid Principle — Write Like McKinsey',dur:'22 min',videoId:'MtHgO6bVFTc',videoLabel:'The Pyramid Principle — Barbara Minto Framework explained',
       intro:'The Pyramid Principle is the communication framework used at McKinsey & Company, Goldman Sachs, and Google. It is the single most powerful structure for any professional writing — emails, reports, memos, and presentations.',
       prose:['Barbara Minto developed The Pyramid Principle at McKinsey in the 1960s and it has since become the foundation of business communication at the world\'s most respected organisations. The core principle is deceptively simple: lead with your conclusion, then support it with evidence. Most people do the exact opposite — they build context, explain their analysis process, and bury the conclusion at the end. This forces the reader to read everything before knowing why they should care. Professional communication completely reverses this structure.','THE PYRAMID STRUCTURE: Level 1 — your single, clear conclusion or recommendation at the very top. Level 2 — three supporting reasons or arguments. Level 3 — evidence, data, or examples that support each reason. This pyramid means your reader can stop reading at any level and still understand your core message. IN EMAIL: First sentence = your conclusion or request. Paragraphs 2, 3, 4 = your three supporting reasons. Subject line = a one-line conclusion, not a topic. Instead of "Meeting about Q3 Strategy," write "Proposing to delay Q3 launch by 2 weeks — seeking your sign-off." The second subject line is answerable before the email is even opened.','THE SO WHAT TEST: After every sentence you write, ask: "So what?" If you cannot answer with something the reader genuinely cares about, cut that sentence. This is the most powerful editing technique in professional writing — and most business writing fails this test in at least 40% of its sentences. THE SCQA FRAMEWORK: Situation (current shared context), Complication (what has changed or is problematic), Question (what the reader is now asking), Answer (your conclusion). This structure mirrors how the human brain naturally processes information and works for any format — email, presentation, or report opening.'],
       keyPoints:[{icon:'🔺',h:'Lead with your conclusion — always',b:'State what you want in the first sentence. Reasoning and context follow. This respects the reader\'s time and signals confident, strategic thinking.'},{icon:'3️⃣',h:'Three supporting reasons maximum',b:'More than three suggests you haven\'t prioritised clearly enough. Less is always more in professional writing. Three is the magic number for retention.'},{icon:'❓',h:'Apply the "So What?" test ruthlessly',b:'After every sentence: "So what?" If the answer is nothing the reader cares about, delete it. No exceptions. Your writing will halve in length and double in impact.'},{icon:'📧',h:'Subject line = conclusion, not topic',b:'"Request: Approval for Q4 budget increase to ₹15L by Friday" beats "Budget Discussion" every single time. Make the email answerable from the subject line.'}],
       exercise:'Take the last important email you sent. Rewrite it using the Pyramid Principle: put your main point in the first sentence, then support it with exactly 3 short paragraphs. Compare the two versions. The rewritten version will feel uncomfortably direct at first. That feeling is exactly right.',
       proTip:'Executives often read only the first and last sentence of each paragraph. Write as if that is literally true. If those two sentences do not carry your full message, your email has already failed before it has been read.',
       quiz:[{q:'In the Pyramid Principle, what always comes first in any communication?',opts:['Background context and history','Evidence and supporting data','Your conclusion or recommendation','Your question to the reader'],ans:2,exp:'Always lead with the conclusion. Burying it at the end forces the reader to work through everything before knowing why they should care — which means many won\'t.'},{q:'What does the "So What?" test help you identify and eliminate?',opts:['The best opening line for your email','Sentences the reader does not actually care about','Grammar errors and typos','Your main argument and recommendation'],ans:1,exp:'If you cannot answer "So what?" with something meaningful to the reader, that sentence should be deleted. This test makes your writing half as long and twice as impactful.'},{q:'How many supporting reasons should follow your conclusion in the Pyramid?',opts:['1 clear reason','2 strong reasons','3 supporting reasons','As many as you have evidence for'],ans:2,exp:'Three reasons is the Pyramid Principle guideline — compelling enough to be convincing, few enough to be remembered and retained by a busy reader.'},{q:'How should a professional email subject line be written?',opts:['As a vague general topic','As a one-line conclusion or specific request','As an open question for discussion','Starting with your name and the date'],ans:1,exp:'Subject lines should be mini-conclusions that make the email answerable before it is even opened: "Proposing delay to Q3 launch — seeking sign-off."'}]},
      {id:2,title:'Active Listening — The Rarest Skill',dur:'20 min',videoId:'R1vskiVDwl4',videoLabel:'Celeste Headlee — "10 Ways to Have a Better Conversation" (TED) · 25M+ views',
       intro:'Most people listen to reply, not to understand. Active listening is the single most underrated skill in any workplace — and research shows almost nobody actually has it, despite most people believing they do.',
       prose:['A landmark study by the Korn Ferry Institute found that listening skills are the top quality separating the most effective leaders from average performers. Yet in another study, people who self-rated as excellent listeners were rated as poor listeners by those around them 94% of the time. The gap between perceived and actual listening ability is enormous. RASA — a framework for genuine active listening: Receive (give your full physical attention — phone face-down, body turned toward the speaker, eyes on them, not on your notes), Appreciate (small acknowledgments — "mmm," "yes," gentle nodding — signals that you are tracking without interrupting), Summarise (periodically reflect back what you heard: "So what I\'m hearing is..."), Ask (ask questions that go deeper into what THEY said, not what you want to discuss next).','THE LISTEN-FIRST PRINCIPLE: Before any important conversation, set a private intention: "My only job for the first 5 minutes is to understand, not to respond." This single mental shift changes your entire conversational stance. You begin noticing information you would otherwise miss because you were mentally preparing your rebuttal. SILENCE IS PART OF LISTENING: Most people fill silence the moment it appears. But silence after a person finishes speaking often means they are not finished — they are still processing. Waiting 3 full seconds after someone stops speaking before responding will consistently surface the most important, unguarded information in any conversation.','AVOID THESE LISTENING KILLERS: Formulating your response while the other person is still talking. Interrupting to share a similar story of your own (this is listening to yourself, not to them). Giving advice before being asked for it. Checking your phone even briefly. Finishing their sentences for them. Changing the subject suddenly. Each of these signals — consciously or not — "I am more interested in myself right now than in what you are saying." EMPATHIC VALIDATION: Before offering your perspective or advice, validate the emotion the other person has just shared: "That sounds genuinely frustrating, especially given everything you\'ve put into this." Validation does not mean agreement. It means acknowledgment. Once people feel truly heard, they become infinitely more open to hearing your perspective in return.'],
       keyPoints:[{icon:'📵',h:'Phone away — not just face-down, away',b:'The mere visible presence of a smartphone on a table reduces conversation quality by 40% according to UCL research — even when neither person checks it.'},{icon:'3️⃣',h:'Wait 3 seconds after they stop speaking',b:'Silence is an invitation for the most important, unguarded information. Filling it immediately is one of the most costly conversational habits in professional life.'},{icon:'🔄',h:'Summarise before responding',b:'"So what I\'m hearing is..." proves you actually listened and prevents 80% of professional misunderstandings before they develop into real problems.'},{icon:'❤️',h:'Validate emotion before offering logic',b:'People need to feel genuinely understood before they can receive new information. Emotional validation unlocks rational openness — every single time.'}],
       exercise:'In your next 3 professional conversations, set a private goal: ask at least 2 follow-up questions specifically about something the other person said before sharing anything about yourself. Notice how differently people respond to you.',
       proTip:'The highest compliment you can pay someone in a professional relationship is to remember what they told you the last time you spoke and reference it specifically. "How did that presentation go last week?" builds more professional goodwill than almost any other single habit.',
       quiz:[{q:'What does the "R" in the RASA active listening framework stand for?',opts:['Reply promptly','Receive with full attention','Reflect on what you heard','React with empathy'],ans:1,exp:'RASA = Receive, Appreciate, Summarise, Ask. Starting with Receive means giving your full, undivided physical attention — phone away, body turned toward the speaker.'},{q:'How long should you wait after someone stops speaking before responding?',opts:['1 second immediately','3 seconds deliberately','10 seconds minimum','30 seconds to show respect'],ans:1,exp:'3 seconds of deliberate silence after someone stops speaking consistently surfaces the most important, unguarded information they were hesitating to share.'},{q:'According to UCL research, what reduces conversation quality by 40%?',opts:['Speaking too quickly','The visible presence of a smartphone on the table','Having the conversation in a noisy room','Making too much eye contact'],ans:1,exp:'The mere visible presence of a smartphone — even when neither person checks it — reduces conversation quality by 40%. Put it completely away.'},{q:'What is empathic validation?',opts:['Agreeing with everything the person says','Giving immediate helpful advice','Acknowledging the person\'s emotion before responding','Summarising all the facts and data they shared'],ans:2,exp:'Empathic validation — "That sounds incredibly frustrating" — acknowledges the emotion without requiring agreement, which unlocks openness to your perspective.'}]},
      {id:3,title:'Difficult Conversations — Say the Hard Thing Well',dur:'25 min',videoId:'S45eWMVnMpU',videoLabel:'Stone, Patton & Heen — "Difficult Conversations" (Harvard Law)',
       intro:'Every career breakthrough requires a difficult conversation: asking for a raise, giving honest feedback, addressing conflict, delivering bad news. Most people avoid these moments — which is precisely why those who master them advance faster than everyone around them.',
       prose:['Harvard\'s Douglas Stone, Bruce Patton, and Sheila Heen identified that every difficult conversation actually contains three simultaneous conversations: the "What happened?" conversation (who did what, why, whose fault), the "Feelings" conversation (both parties\' emotional experience of the situation), and the "Identity" conversation (what this situation means about who I am as a person). Most people only address the first conversation and wonder why the other two keep surfacing as unexpected derailments. Effective difficult conversations require navigating all three intentionally.','THE SBI FEEDBACK FRAMEWORK — the safest, most effective way to deliver difficult feedback: Situation (describe the specific situation factually: "In our Monday team meeting..."), Behaviour (describe the observable behaviour specifically — not character, not intention, not pattern: "when you spoke over my presentation three times..."), Impact (describe the impact on you, the team, or the work: "it made it very difficult for me to complete my thought, and I\'m concerned the client perceived us as disorganised"). No blame, no labels, no character attacks — only observable facts and their specific consequences. Use "I noticed" not "You always." Use "I felt" not "You made me feel." These language shifts take you from accusation to observation — the difference between a fight and a conversation.','RECEIVING DIFFICULT FEEDBACK: When receiving critical feedback, resist the powerful urge to immediately defend, explain, or correct. Instead, use this sequence: (1) Ask for a specific example: "Can you give me a concrete example of when that happened?" (2) Acknowledge what is valid: "I can see how that would have landed that way — I hadn\'t considered that perspective." (3) Take time before responding fully: "I want to think about this properly and respond well — can we revisit this conversation tomorrow?" This sequence prevents the reactive defensiveness that makes feedback conversations completely unproductive. THE THIRD STORY: Enter any conflict from the position of a neutral observer: "We seem to be seeing this situation differently, and I\'d really like to understand your perspective." This signals that you are entering with curiosity, not combat — and that completely changes the other person\'s response.'],
       keyPoints:[{icon:'🔍',h:'Observable behaviour only — no labels',b:'"You interrupted me three times in that meeting" is observable and specific. "You are always disrespectful" is a label that triggers immediate defensive shutdown.'},{icon:'🗣️',h:'"I" statements always over "you" statements',b:'"I felt sidelined in that conversation" invites empathy and curiosity. "You sidelined me" invites defence and counter-attack. Same truth — completely different outcome.'},{icon:'⏸️',h:'Ask for time before responding to feedback',b:'"I want to think about this properly — can we come back to it tomorrow?" is not weakness. It is the most professional response and produces far better outcomes.'},{icon:'🌐',h:'Enter from the Third Story position',b:'Describe the situation as a neutral observer would: "We seem to see this differently — help me understand your perspective." Signals curiosity, not combat.'}],
       exercise:'Think of one difficult conversation you have been avoiding for more than 2 weeks. Write out the complete SBI script for it: the exact Situation (2 sentences), the specific observable Behaviour (1 sentence), and the Impact on you or the team (2 sentences). Writing it removes the emotional charge and makes the conversation feel concrete and manageable rather than vast and frightening.',
       proTip:'The best preparation for a difficult conversation is practising small doses of direct, kind honesty every single day. Tell a colleague their presentation was strong but the data section was confusing. Give your manager a specific suggestion rather than just agreeing. Each small honest moment builds the muscle for the big ones.',
       quiz:[{q:'How many simultaneous conversations does every difficult conversation contain?',opts:['One: what happened','Two: facts and feelings','Three: what happened, feelings, and identity','Four: facts, feelings, identity, and future'],ans:2,exp:'Harvard identifies three simultaneous conversations: "What happened?" (facts), "Feelings" (emotions), and "Identity" (what this means about who I am). Most people address only the first.'},{q:'In the SBI framework, what does "B" stand for and what should it describe?',opts:['Background — the history of the relationship','Behaviour — a specific, observable action','Belief — what you think of the person\'s intentions','Blame — who is responsible for the problem'],ans:1,exp:'Behaviour — the specific, observable action that occurred, not an interpretation or character label. "You interrupted me" not "You are rude" or "You don\'t respect me."'},{q:'Which language approach invites curiosity rather than triggering defensiveness?',opts:['"You always do this in meetings"','"You never listen to what I\'m saying"','"I noticed something I\'d like to talk about"','"Everyone on the team agrees with me"'],ans:2,exp:'"I noticed" is a factual observation that invites open conversation. "You always/never" are accusatory patterns that instantly trigger defensive shutdown.'},{q:'What is the "Third Story" technique in difficult conversations?',opts:['Telling three sequential stories about past conflicts','Describing the situation from a neutral observer\'s perspective','Agreeing with everything the other person says','Involving a third party mediator in the discussion'],ans:1,exp:'The Third Story means describing the conflict as a neutral observer would — outside both your perspectives — which signals curiosity and openness rather than combat.'}]},
      {id:4,title:'Meeting Communication — From Invisible to Indispensable',dur:'18 min',videoId:'wlZPRL1bphs',videoLabel:'Professional meeting facilitation & speaking up — Expert session',
       intro:'Most professionals speak in only 1 in 5 meetings they attend — and their careers reflect exactly that. Meeting visibility is one of the highest-leverage career activities you have access to right now.',
       prose:['Harvard Business School research found that employees who speak up in meetings with relevant, well-timed contributions are promoted faster, paid more, and rated as higher performers by their managers — regardless of the actual quality of their other work. Meeting visibility is not about ego or showing off. It is a documented career accelerator that most professionals completely underuse. THE FIRST 10 MINUTES RULE: Speak within the first 10 minutes of every single meeting you attend. It does not need to be groundbreaking or perfectly formulated — ask a clarifying question, offer a brief observation, or build on someone else\'s point: "I think what Priya just raised is genuinely important — I had a very similar concern when I reviewed the Q3 data last week." This simple habit removes the psychological barrier of speaking "for the first time" that silences people for entire meetings.','PREPARE 1 QUESTION + 1 CONTRIBUTION before every meeting: One specific, thoughtful question that demonstrates you understand the topic and have thought about it. One observation, suggestion, or relevant data point to add. Preparing these 5 minutes before the meeting means you never feel caught off-guard or scrambling for something to say when an opportunity opens. THE CONTRIBUTION LADDER — different contributions carry different professional weight: Level 1: Agreeing with what others said. Level 2: Asking clarifying questions. Level 3: Adding data or examples to support someone\'s point. Level 4: Making a distinct new observation. Level 5: Proposing a specific recommendation or next step. Aim for Levels 4–5 at least once per meeting.','FOLLOW UP IN WRITING: Within 30 minutes of any important meeting, send a brief email to all participants: "Quick recap of what we agreed: [1] [2] [3] — [Name] to complete X by Friday, [Name] to complete Y by Wednesday. Let me know if I missed anything." This single habit will transform your professional reputation for reliability, organisation, and leadership. Almost nobody does it — which is exactly why it works so powerfully for those who do. RUNNING MEETINGS EFFECTIVELY: Send the agenda 24 hours in advance with time allocations. Start precisely on time — this signals you respect those who prepared. Use a "parking lot" for off-topic discussions. End every meeting with a verbal summary of decisions and action items before anyone leaves the room.'],
       keyPoints:[{icon:'⏱️',h:'Speak within the first 10 minutes',b:'Break your silence early in every meeting. Once you speak once, speaking again becomes completely effortless. The first comment is the hardest — it removes every subsequent barrier.'},{icon:'📋',h:'Prepare 1 question + 1 contribution',b:'5 minutes of preparation before every meeting prevents the paralysis of "I had nothing worth saying." Make this a non-negotiable discipline.'},{icon:'🏆',h:'End every meeting with decisions + owners',b:'A meeting without clearly stated next steps and named owners is just a conversation. Always summarise decisions and actions before anyone leaves the room.'},{icon:'📝',h:'Send a written recap within 30 minutes',b:'This single habit builds your professional reputation for reliability and leadership more than almost anything else. Almost nobody does it — which is exactly why it works.'}],
       exercise:'In your next meeting, commit to two contributions: one in the first 10 minutes (a question or brief observation) and one later with a distinct new point or recommendation. Write both down on paper before the meeting. Having them prepared removes the barrier to saying them.',
       proTip:'Consistent, relevant, well-timed meeting contributions shape how decision-makers perceive your potential more than performance reviews, private one-on-ones, or networking events combined. Make it a daily non-negotiable — no silent meetings.',
       quiz:[{q:'What fraction of meetings do most professionals actually speak up in?',opts:['All of them — they feel comfortable','1 in 2 meetings on average','1 in 3 meetings typically','1 in 5 meetings only'],ans:3,exp:'Research shows most professionals speak in only 1 in 5 meetings — making those who speak consistently and relevantly immediately visible to decision-makers.'},{q:'When should you first speak up in any meeting?',opts:['Only when directly asked by the meeting leader','Within the first 10 minutes','At the very end during questions','Only when you have a completely perfect point ready'],ans:1,exp:'Speaking within the first 10 minutes removes the psychological barrier of the "first contribution" — making every subsequent contribution dramatically easier.'},{q:'How quickly should you send a written recap after an important meeting?',opts:['Within 24 hours','At the end of the work day','Within 30 minutes','Only when specifically asked to do so'],ans:2,exp:'Within 30 minutes — while the meeting is still fresh. This transforms your professional reputation for reliability and creates a written record of all commitments made.'},{q:'What is the highest level on the professional Contribution Ladder?',opts:['Agreeing enthusiastically with what others said','Asking thoughtful clarifying questions','Adding data to support another person\'s existing point','Proposing a specific recommendation or next step'],ans:3,exp:'Level 5 — proposing a specific recommendation or next step — carries the most professional weight because it drives decisions and action, not just discussion.'}]},
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// CERTIFICATE HTML
// ═══════════════════════════════════════════════════════════════════════
function makeCertHTML(name, course, date, id) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#f0ebe0;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}.cert{background:#faf8f0;width:100%;max-width:840px;padding:64px 72px;position:relative;text-align:center}.bo{position:absolute;inset:14px;border:2px solid #c9a84c;pointer-events:none}.bi{position:absolute;inset:20px;border:.5px solid rgba(201,168,76,.3);pointer-events:none}.corner{position:absolute;font-size:20px}.tl{top:8px;left:8px}.tr{top:8px;right:8px}.bl{bottom:8px;left:8px}.br{bottom:8px;right:8px}.wm{position:absolute;font-family:'Playfair Display',serif;font-size:90px;color:rgba(201,168,76,.04);font-weight:900;transform:rotate(-30deg);top:50%;left:50%;translate:-50% -50%;white-space:nowrap;pointer-events:none}.logo{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#c9a84c;letter-spacing:1px}.logo span{color:#1a1410}.div1{width:72px;height:2px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:11px auto 13px}.mt{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600;color:#0d1b2a;letter-spacing:1px;margin-bottom:8px;line-height:1.1}.su{font-family:'Cormorant Garamond',serif;font-size:17px;color:#8b7355;font-style:italic;margin-bottom:18px}.rl{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;font-family:'DM Sans',sans-serif;margin-bottom:8px}.rn{font-family:'Playfair Display',serif;font-size:40px;font-weight:700;color:#c9a84c;letter-spacing:.5px;line-height:1.2;margin-bottom:4px}.nl{width:280px;height:1px;background:rgba(201,168,76,.5);margin:0 auto 16px}.bt{font-family:'Cormorant Garamond',serif;font-size:17px;color:#374151;line-height:1.7;margin-bottom:5px}.cn{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0d1b2a;margin-bottom:16px;padding:0 20px}.sc{font-size:13px;color:#6b7280;margin-bottom:16px;font-family:'DM Sans',sans-serif}.div2{width:60px;height:1px;background:rgba(201,168,76,.4);margin:0 auto 18px}.meta{display:flex;justify-content:center;gap:52px;margin-bottom:22px}.mi{text-align:center}.ml{font-size:9px;text-transform:uppercase;letter-spacing:1.8px;color:#9ca3af;margin-bottom:4px;font-family:'DM Sans',sans-serif}.mv{font-size:13px;font-weight:600;color:#374151;font-family:'DM Sans',sans-serif}.sigs{display:flex;justify-content:center;gap:72px;margin-top:18px}.sig{text-align:center}.ss{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#0d1b2a;margin-bottom:4px}.sl{width:110px;height:1px;background:rgba(201,168,76,.4);margin:0 auto 6px}.sn{font-size:11px;font-weight:600;color:#374151;font-family:'DM Sans',sans-serif}.sr{font-size:9px;color:#9ca3af;font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}.seal{position:absolute;bottom:64px;right:64px;width:68px;height:68px;border-radius:50%;border:2px solid #c9a84c;display:flex;align-items:center;justify-content:center;flex-direction:column;opacity:.75}.si2{font-size:22px;line-height:1}.st{font-size:7px;color:#c9a84c;text-transform:uppercase;letter-spacing:.5px;font-family:'DM Sans',sans-serif;margin-top:2px}@media print{body{padding:0;background:#faf8f0}.cert{max-width:none}}</style></head><body><div class="cert"><div class="bo"></div><div class="bi"></div><div class="corner tl">✦</div><div class="corner tr">✦</div><div class="corner bl">✦</div><div class="corner br">✦</div><div class="wm">CareerCraft</div><div class="logo">Career<span>Craft</span></div><div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;font-family:'DM Sans',sans-serif">Professional Development Platform</div><div class="div1"></div><div class="mt">Certificate of Completion</div><div class="su">This is to proudly certify that</div><div class="rl">the following individual</div><div class="rn">${name}</div><div class="nl"></div><div class="bt">has successfully completed the course</div><div class="cn">${course.title}</div><div class="sc">with a passing assessment score · ${course.lessons.length} lessons completed</div><div class="div2"></div><div class="meta"><div class="mi"><div class="ml">Date Issued</div><div class="mv">${date}</div></div><div class="mi"><div class="ml">Certificate ID</div><div class="mv">${id}</div></div><div class="mi"><div class="ml">Duration</div><div class="mv">${course.duration}</div></div></div><div class="sigs"><div class="sig"><div class="ss">Ariana Wells</div><div class="sl"></div><div class="sn">Ariana Wells</div><div class="sr">Head of Learning</div></div><div class="sig"><div class="ss">CareerCraft</div><div class="sl"></div><div class="sn">CareerCraft Platform</div><div class="sr">Authorised Signatory</div></div></div><div class="seal"><div class="si2">🏆</div><div class="st">Verified</div></div></div></body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════
// TEMPLATE THUMBNAILS
// ═══════════════════════════════════════════════════════════════════════
function TThumbnail({ id }) {
  const s = { position:'absolute', inset:0, padding:'6px 8px' };
  if (id==='classic') return <div style={{...s,background:'#fff',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:8}}><div style={{width:38,height:5,background:'#111',borderRadius:1}}/><div style={{width:22,height:2,background:'#888',borderRadius:1,marginTop:2}}/><div style={{width:50,height:.5,background:'#111',marginTop:5}}/>{[80,65,75,60,70].map((w,i)=><div key={i} style={{width:`${w}%`,height:2,background:'#ddd',borderRadius:1,marginTop:i===2?4:2}}/>)}</div>;
  if (id==='modern') return <div style={{...s,background:'#fff',display:'flex'}}><div style={{width:22,background:'#1e3a5f',padding:'5px 3px'}}><div style={{width:14,height:3,background:'rgba(255,255,255,.7)',borderRadius:1}}/>{[...Array(4)].map((_,i)=><div key={i} style={{width:14,height:2,background:'rgba(255,255,255,.3)',borderRadius:1,marginTop:3}}/>)}</div><div style={{flex:1,padding:'5px 3px'}}>{[90,70,80,65,75].map((w,i)=><div key={i} style={{width:`${w}%`,height:2,background:'#e5e7eb',borderRadius:1,marginTop:i>0?3:0}}/>)}</div></div>;
  if (id==='minimal') return <div style={{...s,background:'#fff',paddingTop:8}}><div style={{width:38,height:5,background:'#111',borderRadius:1}}/><div style={{width:22,height:2,background:'#c9a84c',borderRadius:1,marginTop:2}}/><div style={{width:6,height:2,background:'#c9a84c',borderRadius:1,marginTop:4}}/>{[60,72,62,68].map((w,i)=><div key={i} style={{width:`${w}%`,height:2,background:'#e5e7eb',borderRadius:1,marginTop:3}}/>)}</div>;
  if (id==='exec') return <div style={{...s,background:'#fff',display:'flex',flexDirection:'column'}}><div style={{background:'#0d1b2a',padding:'6px 7px'}}><div style={{width:34,height:3,background:'rgba(255,255,255,.9)',borderRadius:1}}/><div style={{width:22,height:2,background:'rgba(147,197,253,.6)',borderRadius:1,marginTop:2}}/></div><div style={{flex:1,padding:'4px 6px'}}><div style={{width:20,height:1.5,background:'#c9a84c',borderRadius:1}}/>{[75,82,68,78].map((w,i)=><div key={i} style={{width:`${w}%`,height:2,background:'#eee',borderRadius:1,marginTop:3}}/>)}</div></div>;
  return <div style={{...s,background:'#fff',display:'flex'}}><div style={{width:6,background:'linear-gradient(180deg,#c9a84c,#e8c97a,#c9a84c)'}}/><div style={{flex:1,padding:'5px 4px'}}><div style={{width:34,height:4,background:'#0a0c10',borderRadius:1}}/><div style={{width:20,height:2,background:'#c9a84c',borderRadius:1,marginTop:2}}/>{[62,74,58,68].map((w,i)=><div key={i} style={{width:`${w}%`,height:2,background:'#e5e7eb',borderRadius:1,marginTop:3}}/>)}</div></div>;
}

// ═══════════════════════════════════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════════════════════════════════
function Quiz({ questions, onPass }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);
  const LT = ['A','B','C','D'];
  const q = questions[idx];

  function pick(i) {
    if (answered) return;
    setSel(i); setAnswered(true);
    setScores(s => [...s, i === q.ans]);
  }
  function next() {
    if (idx < questions.length - 1) { setIdx(i=>i+1); setSel(null); setAnswered(false); }
    else setDone(true);
  }
  if (done) {
    const passed = scores.filter(Boolean).length;
    const pass = passed >= Math.ceil(questions.length * .75);
    return (
      <div className="quiz-box" style={{textAlign:'center'}}>
        <div className={`score-ring ${pass?'pass':'fail'}`}><div className="score-num">{passed}/{questions.length}</div><div style={{fontSize:11,color:pass?'var(--green)':'var(--red)',fontWeight:700}}>{pass?'PASS':'RETRY'}</div></div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,marginBottom:8}}>{pass?'🎉 Quiz Passed!':'Almost — keep going!'}</h3>
        <p style={{fontSize:13,color:'var(--muted)',marginBottom:18}}>{pass?`${passed}/${questions.length} correct. Excellent work!`:`${passed}/${questions.length} — you need ${Math.ceil(questions.length*.75)} to pass. Review the lesson and retry.`}</p>
        {pass ? <button className="btn-primary btn-sm" onClick={onPass}>Continue →</button>
              : <button className="btn-primary btn-sm" onClick={()=>{setIdx(0);setSel(null);setAnswered(false);setScores([]);setDone(false);}}>Retry Quiz</button>}
      </div>
    );
  }
  return (
    <div className="quiz-box">
      <div className="quiz-hd"><h3>📝 Lesson Quiz</h3><span className="quiz-prog-badge">{idx+1}/{questions.length}</span></div>
      <div className="quiz-qnum">Question {idx+1}</div>
      <div className="quiz-q">{q.q}</div>
      <div className="quiz-opts">
        {q.opts.map((opt,i)=>{
          let cls='qopt';
          if(answered){cls+=' qans';if(sel===i)cls+=i===q.ans?' qcorr':' qwrong';else if(i===q.ans)cls+=' qshow';}
          else if(sel===i)cls+=' qsel';
          return <button key={i} className={cls} onClick={()=>pick(i)}><span className="opt-ltr">{LT[i]}</span>{opt}</button>;
        })}
      </div>
      {answered && <div className={`quiz-fb ${sel===q.ans?'corr':'wrong'}`}><strong>{sel===q.ans?'✓ Correct! ':'✗ Not quite — '}</strong>{q.exp}</div>}
      {answered && <div style={{display:'flex',justifyContent:'flex-end',marginTop:14}}><button className="btn-primary btn-sm" onClick={next}>{idx<questions.length-1?'Next →':'See Results'}</button></div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════
function Assessment({ course, onPass, onBack }) {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);
  const qs = course.assessment;
  const LT = ['A','B','C','D'];

  if (!started) return (
    <div className="assess-box">
      <div className="assess-badge">🏆 Final Assessment</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:8}}>Ready to Earn Your Certificate?</h2>
      <p style={{color:'var(--muted)',fontSize:14,marginBottom:24,maxWidth:400,marginLeft:'auto',marginRight:'auto'}}>You've completed all {course.lessons.length} lessons of <strong style={{color:'var(--text)'}}>{course.title}</strong>. Pass this final assessment to download your official e-certificate.</p>
      <div className="info-pills">
        {[{icon:'📊',txt:`${qs.length} Questions`},{icon:'⏱️',txt:'~10 minutes'},{icon:'🎯',txt:`${Math.ceil(qs.length*.75)}/${qs.length} to Pass`},{icon:'📜',txt:'E-Certificate'}].map(m=>(
          <div className="info-pill" key={m.txt}><div className="ip-icon">{m.icon}</div><div className="ip-txt">{m.txt}</div></div>
        ))}
      </div>
      <div style={{display:'flex',gap:10,justifyContent:'center'}}>
        <button className="btn-outline" onClick={onBack}>← Back to Lessons</button>
        <button className="btn-primary" onClick={()=>setStarted(true)}>Start Assessment →</button>
      </div>
    </div>
  );

  if (done) {
    const passed = scores.filter(Boolean).length;
    const pass = passed >= Math.ceil(qs.length * .75);
    return (
      <div className="assess-box">
        <div style={{fontSize:52,marginBottom:12}}>{pass?'🏆':'📖'}</div>
        <div className={`score-ring ${pass?'pass':'fail'}`} style={{margin:'0 auto 20px'}}><div className="score-num">{passed}/{qs.length}</div><div style={{fontSize:11,color:pass?'var(--green)':'var(--red)',fontWeight:700}}>{pass?'PASSED':'RETRY'}</div></div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:8}}>{pass?'Assessment Passed! 🎉':'Almost There!'}</h2>
        <p style={{color:'var(--muted)',fontSize:14,marginBottom:24,maxWidth:380,marginLeft:'auto',marginRight:'auto'}}>{pass?`You scored ${passed}/${qs.length} and have officially completed "${course.title}". Your e-certificate is ready to download.`:`You scored ${passed}/${qs.length}. You need ${Math.ceil(qs.length*.75)} to pass. Review the lessons and try again.`}</p>
        {pass ? <button className="btn-primary" onClick={()=>onPass(passed,qs.length)}>🎓 Get My E-Certificate →</button>
              : <button className="btn-primary" onClick={()=>{setIdx(0);setSel(null);setAnswered(false);setScores([]);setDone(false);}}>Retry Assessment</button>}
      </div>
    );
  }

  const q = qs[idx];
  return (
    <div className="quiz-box" style={{borderColor:'var(--gold-lt)'}}>
      <div className="quiz-hd"><h3>🏆 Final Assessment — {course.title}</h3><span className="quiz-prog-badge">{idx+1}/{qs.length}</span></div>
      <div style={{height:3,background:'var(--border)',borderRadius:3,marginBottom:18,overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,var(--gold),var(--gold-lt))',width:`${((idx+1)/qs.length)*100}%`,transition:'width .3s'}}/></div>
      <div className="quiz-qnum">Question {idx+1} of {qs.length}</div>
      <div className="quiz-q">{q.q}</div>
      <div className="quiz-opts">
        {q.opts.map((opt,i)=>{
          let cls='qopt';
          if(answered){cls+=' qans';if(sel===i)cls+=i===q.ans?' qcorr':' qwrong';else if(i===q.ans)cls+=' qshow';}
          else if(sel===i)cls+=' qsel';
          return <button key={i} className={cls} onClick={()=>{if(!answered){setSel(i);setAnswered(true);setScores(s=>[...s,i===q.ans]);}}}><span className="opt-ltr">{LT[i]}</span>{opt}</button>;
        })}
      </div>
      {answered && <div className={`quiz-fb ${sel===q.ans?'corr':'wrong'}`}><strong>{sel===q.ans?'✓ Correct! ':'✗ Not quite — '}</strong>{q.exp}</div>}
      {answered && <div style={{display:'flex',justifyContent:'flex-end',marginTop:14}}><button className="btn-primary btn-sm" onClick={()=>{if(idx<qs.length-1){setIdx(i=>i+1);setSel(null);setAnswered(false);}else setDone(true);}}>{idx<qs.length-1?'Next Question →':'See Final Results'}</button></div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CERTIFICATE VIEW
// ═══════════════════════════════════════════════════════════════════════
function CertView({ course, score, total, onClose }) {
  const [name, setName] = useState('');
  const [showing, setShowing] = useState(false);
  const certId = useRef(`CC-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).substr(2,4).toUpperCase()}`).current;
  const date = new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'});

  function download() {
    const html = makeCertHTML(name||'Your Name', course, date, certId);
    const w = window.open('','_blank');
    w.document.write(html); w.document.close();
    setTimeout(()=>w.print(), 700);
  }

  if (!showing) return (
    <div className="cert-overlay" style={{justifyContent:'center'}}>
      <div style={{fontSize:52,marginBottom:12,textAlign:'center'}}>🏆</div>
      <div className="name-prompt">
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:8}}>You Passed!</h2>
        <p>You scored <strong style={{color:'var(--green)'}}>{score}/{total}</strong> on the Final Assessment for <strong style={{color:'var(--text)'}}>{course.title}</strong>.</p>
        <p style={{marginTop:8}}>Enter your full name as it should appear on the certificate:</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Priya Sharma" style={{marginTop:12}}/>
        <p style={{fontSize:11,color:'var(--muted)',marginTop:10}}>Certificate ID: {certId}</p>
      </div>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
        <button className="btn-outline" onClick={onClose}>← Close</button>
        <button className="btn-primary" disabled={!name.trim()} onClick={()=>setShowing(true)}>🎓 Preview My Certificate</button>
      </div>
    </div>
  );

  return (
    <div className="cert-overlay">
      <div className="cert-toolbar">
        <button className="btn-outline" onClick={()=>setShowing(false)}>← Edit Name</button>
        <button className="btn-outline" onClick={onClose}>✕ Close</button>
        <button className="btn-primary" onClick={download}>⬇ Download / Print as PDF</button>
      </div>
      <p style={{fontSize:13,color:'var(--muted)',marginBottom:16,textAlign:'center'}}>In the print dialog → Destination: "Save as PDF" → Save</p>
      <div className="cert-frame">
        <div className="cert-inner">
          <div className="c-border-out"/><div className="c-border-in"/>
          {['tl','tr','bl','br'].map(p=><div key={p} className={`c-corner ${p}`}>✦</div>)}
          <div className="c-wm">CareerCraft</div>
          <div className="c-logo">Career<span>Craft</span></div>
          <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'2px',color:'#9ca3af',fontFamily:"'DM Sans',sans-serif",marginTop:3}}>Professional Development Platform</div>
          <div className="c-div"/>
          <div className="c-main-title">Certificate of Completion</div>
          <div className="c-subtitle">This is to proudly certify that</div>
          <div className="c-name">{name}</div>
          <div className="c-name-line"/>
          <div className="c-body">has successfully completed the course</div>
          <div className="c-course">{course.title}</div>
          <div style={{fontSize:13,color:'#9ca3af',marginBottom:14,fontFamily:"'DM Sans',sans-serif"}}>with a passing assessment score · {course.lessons.length} lessons completed</div>
          <div style={{width:60,height:1,background:'rgba(201,168,76,.4)',margin:'0 auto 18px'}}/>
          <div className="c-meta">
            {[['Date Issued',date],['Certificate ID',certId],['Duration',course.duration]].map(([l,v])=>(
              <div className="c-meta-item" key={l}><div className="c-meta-label">{l}</div><div className="c-meta-value">{v}</div></div>
            ))}
          </div>
          <div className="c-sigs">
            {[['Ariana Wells','Ariana Wells','Head of Learning'],['CareerCraft','CareerCraft Platform','Authorised Signatory']].map(([script,name2,role])=>(
              <div className="c-sig" key={name2}>
                <div className="c-sig-script">{script}</div>
                <div className="c-sig-line"/><div className="c-sig-name">{name2}</div><div className="c-sig-role">{role}</div>
              </div>
            ))}
          </div>
          <div className="c-seal"><div style={{fontSize:22}}>🏆</div><div style={{fontSize:7,color:'#c9a84c',textTransform:'uppercase',letterSpacing:'.5px',fontFamily:"'DM Sans',sans-serif",marginTop:2}}>Verified</div></div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LESSON VIEWER
// ═══════════════════════════════════════════════════════════════════════
function LessonViewer({ course, onBack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [passed, setPassed] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssess, setShowAssess] = useState(false);
  const [certData, setCertData] = useState(null);
  const lesson = course.lessons[activeIdx];
  const allPassed = course.lessons.every((_,i)=>passed.includes(i));
  const pct = Math.round((passed.length/course.lessons.length)*100);

  if (certData) return <CertView course={course} score={certData.score} total={certData.total} onClose={()=>setCertData(null)}/>;

  if (showAssess) return (
    <div>
      <button className="back-btn" onClick={()=>setShowAssess(false)}>← Back to Lessons</button>
      <Assessment course={course} onPass={(s,t)=>{setShowAssess(false);setCertData({score:s,total:t});}} onBack={()=>setShowAssess(false)}/>
    </div>
  );

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back to Courses</button>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6,flexWrap:'wrap',gap:8}}>
        <div style={{fontSize:12,color:'var(--muted)'}}>{course.title} · {passed.length}/{course.lessons.length} quizzes passed</div>
        {allPassed && <button className="btn-primary btn-sm" onClick={()=>setShowAssess(true)}>🏆 Take Final Assessment & Get Certificate</button>}
      </div>
      <div className="prog-bar" style={{margin:'0 0 18px'}}><div className="prog-fill" style={{width:`${pct}%`}}/></div>
      <div className="lesson-layout">
        <div className="lsidebar">
          <div className="lside-head">Course Lessons</div>
          {course.lessons.map((l,i)=>(
            <div key={l.id} className={`litem${activeIdx===i?' la':''}${passed.includes(i)?' ldone':''}`} onClick={()=>{setActiveIdx(i);setShowQuiz(false);}}>
              <div className="lnum-b">{passed.includes(i)?'✓':i+1}</div>
              <div className="ltitle-b">{l.title}</div>
              <div className="ldur-b">{l.dur}</div>
            </div>
          ))}
          {allPassed && (
            <div style={{padding:'12px 14px',borderTop:'1px solid var(--border)',background:'var(--gold-dim)'}}>
              <button className="btn-primary" style={{width:'100%',fontSize:12,padding:'8px'}} onClick={()=>setShowAssess(true)}>🏆 Final Assessment</button>
            </div>
          )}
        </div>
        <div className="lbox">
          <div className="lbox-head">
            <p style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>Lesson {activeIdx+1} of {course.lessons.length}{passed.includes(activeIdx)?' · ✓ Quiz Passed':''}</p>
            <h2>{lesson.title}</h2>
            <p>{lesson.dur} · {course.title}</p>
          </div>
          {!showQuiz ? (
            <>
              <div className="lbox-body">
                <div className="vid-wrap"><iframe src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1`} title={lesson.videoLabel} frameBorder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen/></div>
                <div className="vid-label">🎬 {lesson.videoLabel}</div>
                <div className="intro-box"><p>{lesson.intro}</p></div>
                <div className="prose">{lesson.prose.map((p,i)=><p key={i}>{p}</p>)}</div>
                <div className="kps"><h4>Key Takeaways</h4>{lesson.keyPoints.map((kp,i)=><div className="kp" key={i}><div className="kp-icon">{kp.icon}</div><div><h5>{kp.h}</h5><p>{kp.b}</p></div></div>)}</div>
                <div className="exercise-box"><h4>🏋️ Practice Exercise</h4><p>{lesson.exercise}</p></div>
                <div className="protip-box"><strong>Pro Tip</strong><p>{lesson.proTip}</p></div>
              </div>
              <div className="lnav">
                <button className="btn-outline" onClick={()=>setActiveIdx(i=>Math.max(0,i-1))} disabled={activeIdx===0}>← Previous</button>
                <button className="btn-primary btn-sm" onClick={()=>setShowQuiz(true)}>{passed.includes(activeIdx)?'Retake Quiz 📝':'Take Lesson Quiz 📝'}</button>
                <button className="btn-outline" onClick={()=>setActiveIdx(i=>Math.min(course.lessons.length-1,i+1))} disabled={activeIdx>=course.lessons.length-1}>Next →</button>
              </div>
            </>
          ) : (
            <div className="lbox-body">
              <Quiz questions={lesson.quiz} onPass={()=>{if(!passed.includes(activeIdx))setPassed(p=>[...p,activeIdx]);setShowQuiz(false);if(activeIdx<course.lessons.length-1)setActiveIdx(i=>i+1);}}/>
              <div style={{marginTop:14,textAlign:'center'}}><button className="btn-outline btn-sm" onClick={()=>setShowQuiz(false)}>← Back to Lesson</button></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// RESUME BUILDER
// ═══════════════════════════════════════════════════════════════════════
function ResumeBuilder() {
  const [tmpl, setTmpl] = useState('classic');
  const [form, setForm] = useState({name:'',title:'',email:'',phone:'',location:'',summary:'',experience:'',skills:'',education:''});
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  async function generate() {
    if (!form.name || !form.title) return;
    setLoading(true); setResume(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are an expert ATS resume writer. Return ONLY valid JSON with: summary (2-3 powerful sentences starting with strong action word, no first-person pronouns), experience_bullets (array of 4 bullets starting with past-tense action verbs, each quantified), skills_list (array of 8 skills), education_line (single clean string). Name:${form.name} Title:${form.title} Summary:${form.summary||'N/A'} Experience:${form.experience||'N/A'} Skills:${form.skills||'N/A'} Education:${form.education||'N/A'}`}]})});
      const data = await res.json();
      const raw = data.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim();
      setResume({...form,...JSON.parse(raw)});
    } catch {
      setResume({...form,summary:form.summary||"Results-driven professional with a proven track record of delivering measurable impact across dynamic, high-growth environments.",experience_bullets:["Led cross-functional team of 12, delivering projects 35% under budget and 2 weeks ahead of schedule","Increased annual revenue by ₹1.8Cr through strategic client acquisition and retention programmes","Built and deployed automated reporting system reducing manual work by 18 hours per week","Negotiated vendor contracts resulting in ₹45L in cost savings across three consecutive quarters"],skills_list:(form.skills||"Leadership,Communication,Project Management,Data Analysis,Strategy,Excel,Problem Solving,Stakeholder Management").split(",").map(s=>s.trim()).slice(0,8),education_line:form.education||"Bachelor's Degree · University Name · Year"});
    }
    setLoading(false);
  }

  useEffect(()=>{
    if (!resume || !iframeRef.current) return;
    const fn = tmplFns[tmpl]; if (!fn) return;
    const doc = iframeRef.current.contentDocument;
    doc.open(); doc.write(fn(resume)); doc.close();
  },[resume,tmpl]);

  function dlCurrent(){if(!resume)return;const fn=tmplFns[tmpl];if(!fn)return;const w=window.open('','_blank');w.document.write(fn(resume));w.document.close();setTimeout(()=>w.print(),600);}
  function dlAll(){if(!resume)return;TEMPLATES.forEach((t,i)=>setTimeout(()=>{const fn=tmplFns[t.id];if(!fn)return;const w=window.open('','_blank');w.document.write(fn(resume));w.document.close();setTimeout(()=>w.print(),600);},i*1400));}

  return (
    <div className="builder-grid">
      <div className="form-panel">
        <div className="panel-head">Your Information</div>
        {[['Full Name *','name','e.g. Priya Sharma'],['Professional Title *','title','e.g. Marketing Manager | Product Designer']].map(([l,k,p])=>(
          <div key={k} className="fg"><span className="fl">{l}</span><input className="fi" placeholder={p} value={form[k]} onChange={e=>set(k,e.target.value)}/></div>
        ))}
        <div className="frow"><div className="fg"><span className="fl">Email</span><input className="fi" placeholder="you@email.com" value={form.email} onChange={e=>set('email',e.target.value)}/></div><div className="fg"><span className="fl">Phone</span><input className="fi" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set('phone',e.target.value)}/></div></div>
        <div className="fg"><span className="fl">City / Location</span><input className="fi" placeholder="Mumbai, India" value={form.location} onChange={e=>set('location',e.target.value)}/></div>
        <div className="fg"><span className="fl">Career Summary (your own words)</span><textarea className="fi" rows={2} placeholder="I'm a marketing professional with 5 years in B2B SaaS..." value={form.summary} onChange={e=>set('summary',e.target.value)}/></div>
        <div className="fg"><span className="fl">Experience & Key Achievements</span><textarea className="fi" rows={3} placeholder="Led a team of 8, increased sales by 25%, launched new product..." value={form.experience} onChange={e=>set('experience',e.target.value)}/></div>
        <div className="fg"><span className="fl">Skills (comma-separated)</span><input className="fi" placeholder="Leadership, Python, Figma, SEO, Project Management" value={form.skills} onChange={e=>set('skills',e.target.value)}/></div>
        <div className="fg"><span className="fl">Education</span><input className="fi" placeholder="B.Com, Mumbai University, 2019" value={form.education} onChange={e=>set('education',e.target.value)}/></div>
        <button className="gen-btn" onClick={generate} disabled={loading||!form.name||!form.title}>{loading?'✨ AI is crafting your resume…':'✨ Generate AI Resume'}</button>
      </div>
      <div className="preview-box">
        <div className="tpicker">
          {TEMPLATES.map(t=><div key={t.id} className={`tcard${tmpl===t.id?' sel':''}`} onClick={()=>setTmpl(t.id)}><div className="tthumb"><TThumbnail id={t.id}/></div><div className="tname">{t.name}</div></div>)}
        </div>
        {loading && <div className="ph-box"><div className="ail"><div className="dot"/><div className="dot"/><div className="dot"/><span>AI is crafting your resume…</span></div></div>}
        {!loading && !resume && <div className="ph-box"><span style={{fontSize:40}}>📄</span><p>Fill in your details and click Generate</p><p style={{fontSize:12,color:'var(--faint)'}}>Pick any template above to preview</p></div>}
        {!loading && resume && (
          <>
            <div className="preview-frame"><iframe ref={iframeRef} title="Resume Preview" style={{width:'100%',height:'520px',border:'none',display:'block'}}/></div>
            <div className="dl-row">
              <button className="dl-btn dl-main" onClick={dlCurrent}>⬇ Download This Template as PDF</button>
              <button className="dl-btn" onClick={dlAll}>⬇ Download All 5 Templates</button>
            </div>
            <p style={{fontSize:12,color:'var(--muted)'}}>💡 In print dialog → set Destination to "Save as PDF" → A4 size → Save</p>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CAREER TIPS
// ═══════════════════════════════════════════════════════════════════════
function CareerTips() {
  const [selected, setSelected] = useState(null);
  const [aiPoints, setAiPoints] = useState(null);
  const [loading, setLoading] = useState(false);

  async function open(tip) {
    setSelected(tip); setAiPoints(null); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,messages:[{role:"user",content:`You are an expert career coach. Give exactly 5 powerful, specific, actionable tips about "${tip.title}" for working professionals in India. Return ONLY valid JSON array of 5 objects with keys "h" (headline, 5-7 words) and "b" (body, 2 impactful sentences with specific tactics). No markdown, no preamble.`}]})});
      const data = await res.json();
      const raw = data.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim();
      setAiPoints(JSON.parse(raw));
    } catch { setAiPoints(tip.points); }
    setLoading(false);
  }

  if (selected) return (
    <div>
      <button className="back-btn" onClick={()=>{setSelected(null);setAiPoints(null);}}>← Back to All Tips</button>
      <div className="tip-detail">
        <div style={{fontSize:40,marginBottom:12}}>{selected.icon}</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:6}}>{selected.title}</h2>
        <p style={{color:'var(--muted)',fontSize:14,marginBottom:22,paddingBottom:22,borderBottom:'1px solid var(--border)'}}>{selected.desc}</p>
        {loading ? <div className="ai-loading"><div className="dot"/><div className="dot"/><div className="dot"/><span>AI is generating personalised tips…</span></div>
        : (aiPoints||selected.points).map((p,i)=>(
          <div className="tip-point" key={i}>
            <div className="tip-num">{i+1}</div>
            <div><h4>{p.h}</h4><p>{p.b}</p></div>
          </div>
        ))}
        {!loading && <div style={{marginTop:20,padding:'14px 16px',background:'var(--gold-dim)',border:'1px solid var(--gold-border)',borderRadius:10,fontSize:13,color:'#e8c97a'}}><strong style={{display:'block',marginBottom:4,fontSize:11,textTransform:'uppercase',letterSpacing:'.8px'}}>AI Tip</strong>Click the back button and choose a different topic to get AI-generated tips on any area of your career development.</div>}
      </div>
    </div>
  );

  return (
    <>
      <div style={{background:'var(--gold-dim)',border:'1px solid var(--gold-border)',borderRadius:12,padding:'14px 18px',marginBottom:28,fontSize:14,color:'#e8c97a'}}>
        💡 Click any card below to get <strong>AI-generated, personalised tips</strong> on that topic — refreshed every time you open it.
      </div>
      <div className="tips-grid">
        {TIPS_DATA.map(tip=>(
          <div key={tip.id} className="tip-card" style={{background:tip.color}} onClick={()=>open(tip)}>
            <span className="tip-icon">{tip.icon}</span>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
            <div style={{marginTop:12,fontSize:11,fontWeight:700,color:'var(--green)'}}>✓ Free AI-Powered Guide →</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PAYWALL MODAL
// ═══════════════════════════════════════════════════════════════════════
function PaywallModal({ item, onClose }) {
  const [plan, setPlan] = useState('yearly');
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div style={{fontSize:44,marginBottom:12}}>🔓</div>
        <h2>Unlock Pro Courses</h2>
        <p>Get instant access to <strong style={{color:'var(--text)'}}>{item?.title||'all premium courses'}</strong> and everything else in the Pro plan.</p>
        <div className="plan-row">
          {[{id:'monthly',label:'Monthly',price:'₹299',per:'/month'},{id:'yearly',label:'Yearly',price:'₹1,999',per:'/year',save:'Save 44%'}].map(p=>(
            <div key={p.id} className={`plan-opt${plan===p.id?' pon':''}`} onClick={()=>setPlan(p.id)}>
              <h4>{p.label}</h4><div className="plan-price">{p.price}</div>
              <div className="plan-per">{p.per}</div>
              {p.save&&<div className="plan-save">{p.save}</div>}
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{width:'100%',marginBottom:10}}>
          Start Pro · {plan==='monthly'?'₹299/month':'₹1,999/year'}
        </button>
        <p style={{fontSize:12,color:'var(--muted)'}}>Cancel anytime · 7-day money-back guarantee · Instant access</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FAQ COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {FAQS.map((f,i)=>(
        <div key={i} className={`faq-item${open===i?' open':''}`}>
          <div className="faq-q" onClick={()=>setOpen(open===i?null:i)}>
            <span>{f.q}</span>
            <span className="faq-chevron">▾</span>
          </div>
          {open===i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// NEWSLETTER
// ═══════════════════════════════════════════════════════════════════════
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="nl-box">
      <div style={{fontSize:32,marginBottom:12}}>📬</div>
      <h2>Get Weekly Career Tips — Free</h2>
      <p>Join 12,000+ professionals who get our best career advice, new course alerts, and exclusive tips every Tuesday. Unsubscribe anytime.</p>
      {sent ? <div style={{background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.2)',borderRadius:10,padding:'12px 20px',color:'var(--green)',fontSize:14}}>✓ You're subscribed! Check your inbox for a welcome gift.</div>
      : <div className="nl-form">
          <input className="nl-input" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} type="email"/>
          <button className="btn-primary" onClick={()=>{if(email.includes('@'))setSent(true);}}>Subscribe Free →</button>
        </div>}
      <p style={{fontSize:12,color:'var(--muted)',marginTop:10}}>No spam, ever. Unsubscribe with one click.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════
function Footer({ setTab }) {
  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:'var(--gold)',marginBottom:8}}>Career<span style={{color:'var(--text)'}}>Craft</span></div>
            <p>India's most complete career development platform. Build resumes, learn soft skills, and get certified — all in one place.</p>
            <div style={{display:'flex',gap:8,marginTop:14}}>
              <div className="footer-social">🐦</div>
              <div className="footer-social">💼</div>
              <div className="footer-social">📸</div>
              <div className="footer-social">▶</div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <a onClick={()=>setTab('resume')}>Resume Builder</a>
            <a onClick={()=>setTab('tips')}>Career Tips</a>
            <a onClick={()=>setTab('courses')}>Free Courses</a>
            <a onClick={()=>setTab('courses')}>Premium Courses</a>
            <a onClick={()=>setTab('pricing')}>Pricing</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a>Interview Prep Guide</a>
            <a>LinkedIn Checklist</a>
            <a>Resume Templates</a>
            <a>Salary Negotiation</a>
            <a>Career Blog</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a onClick={()=>setTab('about')}>About Us</a>
            <a>Contact Us</a>
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
            <a>Refund Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CareerCraft. Made with ❤️ in India. All rights reserved.</p>
          <p style={{color:'var(--gold)'}}>Helping professionals build careers they deserve.</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState('home');
  const [viewingCourse, setViewingCourse] = useState(null);
  const [paywall, setPaywall] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 3200); };

  const TABS = [
    {id:'home',l:'Home'},{id:'resume',l:'Resume Builder'},{id:'tips',l:'Career Tips'},
    {id:'courses',l:'Courses'},{id:'pricing',l:'Pricing'},{id:'about',l:'About'},
  ];

  function goTab(t) { setTab(t); setViewingCourse(null); window.scrollTo({top:0,behavior:'smooth'}); }

  return (
    <>
      <style>{CSS}</style>
      <nav>
        <div className="nav-logo" style={{cursor:'pointer'}} onClick={()=>goTab('home')}>Career<span>Craft</span></div>
        <div className="nav-tabs">{TABS.map(t=><button key={t.id} className={`nt${tab===t.id?' on':''}`} onClick={()=>goTab(t.id)}>{t.l}</button>)}</div>
        <div className="nav-right">
          <button className="nav-signin">Sign In</button>
          <button className="nav-pro" onClick={()=>setPaywall({title:'All Premium Courses'})}>Go Pro ✦</button>
        </div>
      </nav>

      {/* ── HOME ── */}
      {tab==='home' && <>
        <div className="hero">
          <div className="hero-bg"/><div className="hero-grid"/>
          <div className="hero-pill"><span className="hero-dot"/> AI-Powered · India's #1 Career Platform</div>
          <h1>Build the Career<br/>You <em>Actually Deserve</em></h1>
          <p className="hero-sub">Professional AI resume builder, video soft skill courses with quizzes, official e-certificates, and expert career guides — everything in one place. Most of it free.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>goTab('resume')}>✨ Build My Resume — Free</button>
            <button className="btn-secondary" onClick={()=>goTab('courses')}>Browse Free Courses</button>
          </div>
          <div className="hero-stats">
            {[['12,000+','Students'],['4.9/5','Average Rating'],['2 Free','Full Courses'],['5','Resume Templates']].map(([n,l])=>(
              <div className="hstat" key={l}><div className="hstat-num">{n}</div><div className="hstat-label">{l}</div></div>
            ))}
          </div>
        </div>

        <div className="trust-strip">
          {[['🔒','Secure & Private'],['✓','No Credit Card for Free Features'],['📜','Official E-Certificates'],['⭐','4.9 Star Rating'],['🇮🇳','Built for Indian Professionals'],['💰','Cancel Anytime']].map(t=>(
            <div className="trust-item" key={t[1]}><span className="trust-icon">{t[0]}</span>{t[1]}</div>
          ))}
        </div>

        <div className="page" style={{paddingTop:60}}>
          {/* WHAT YOU GET */}
          <div className="sec-header">
            <div className="eyebrow">Everything You Need</div>
            <h2 className="sec-title">One Platform. Every Career Tool.</h2>
            <p className="sec-sub">Everything a career coach, resume writer, and skills trainer would charge you ₹50,000+ for — available here for free or at a fraction of the cost.</p>
          </div>
          <div className="feat-grid" style={{marginBottom:56}}>
            {[
              {icon:'📄',t:'AI Resume Builder',d:'Type your raw info — our AI rewrites it into polished, ATS-optimised professional language. Choose from 5 beautiful templates and download as PDF.',free:true,goto:'resume'},
              {icon:'🎓',t:'Free Video Courses',d:'2 complete courses with real TED Talk videos, expert lesson notes, lesson quizzes, final assessments, and official downloadable certificates.',free:true,goto:'courses'},
              {icon:'📝',t:'Lesson Quizzes',d:'4 MCQ questions after every lesson test your understanding. Pass 75% to unlock the next lesson. Instant feedback explains every answer.',free:true,goto:'courses'},
              {icon:'📜',t:'Official E-Certificates',d:'Pass the final assessment and download a professionally designed certificate with your name, course, unique ID, date, and signatures.',free:true,goto:'courses'},
              {icon:'💡',t:'AI Career Tips',d:'6 deep guides on networking, personal branding, LinkedIn, personality, interviews, and productivity — each powered by live AI generation.',free:true,goto:'tips'},
              {icon:'🧠',t:'Premium Skill Courses',d:'Advanced courses on Emotional Intelligence, Negotiation, Creative Problem Solving, and Personal Branding with expert frameworks and workbooks.',free:false,goto:'courses'},
            ].map(c=>(
              <div key={c.t} className="feat-card" onClick={()=>goTab(c.goto)}>
                <span className="feat-icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <span className={`feat-tag ${c.free?'ftfree':'ftpro'}`}>{c.free?'✓ Free':'Pro'}</span>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <div className="divider"/>
          <div className="sec-header">
            <div className="eyebrow">How It Works</div>
            <h2 className="sec-title">From Sign-Up to Certificate in 4 Steps</h2>
          </div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:56}}>
            <div className="steps-row">
              {[{n:'1',t:'Build Your Resume',d:'Enter your details → AI generates professional content → pick a template → download PDF. Takes 5 minutes.'},
                {n:'2',t:'Watch & Learn',d:'Start a free course. Watch curated TED talks + expert lessons. Read detailed notes and pro tips.'},
                {n:'3',t:'Quiz & Assess',d:'Pass lesson quizzes (75%) to advance. Complete all lessons to unlock the Final Assessment.'},
                {n:'4',t:'Download Certificate',d:'Score 75%+ on the Final Assessment → enter your name → download your official e-certificate instantly.'},
              ].map(s=>(
                <div key={s.n} className="step">
                  <div className="step-num">{s.n}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="divider"/>
          <div className="sec-header">
            <div className="eyebrow">Student Stories</div>
            <h2 className="sec-title">Real People. Real Results.</h2>
            <p className="sec-sub">From freshers landing their first job to senior professionals getting promoted — here's what our community says.</p>
          </div>
          <div className="testi-grid" style={{marginBottom:20}}>
            {TESTIMONIALS.map(t=>(
              <div key={t.name} className="testi-card">
                <div className="testi-stars">{'★'.repeat(t.stars)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{background:t.color,color:'rgba(255,255,255,.9)'}}>{t.avatar}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA BANNER */}
          <div style={{background:'linear-gradient(135deg,var(--card),rgba(201,168,76,.08))',border:'1px solid var(--gold-border)',borderRadius:20,padding:'44px 32px',textAlign:'center',margin:'56px 0'}}>
            <div style={{fontSize:40,marginBottom:12}}>🚀</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,marginBottom:8}}>Start Building Your Career Today</h2>
            <p style={{color:'var(--muted)',fontSize:15,marginBottom:28,maxWidth:480,margin:'0 auto 28px'}}>The resume builder is free. The first two courses are free. Your first certificate is free. There is no reason to wait.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={()=>goTab('resume')}>✨ Build My Resume Free</button>
              <button className="btn-secondary" onClick={()=>goTab('courses')}>🎓 Start Learning Free</button>
            </div>
          </div>

          {/* NEWSLETTER */}
          <Newsletter/>
        </div>
      </>}

      {/* ── RESUME ── */}
      {tab==='resume' && <div className="page" style={{paddingTop:40}}>
        <div className="sec-header">
          <div className="eyebrow">AI-Powered · Free · Unlimited</div>
          <h2 className="sec-title">Professional Resume Builder <span className="badge-free">FREE</span></h2>
          <p className="sec-sub">Type your raw information in your own words — however messy. Our AI rewrites it into polished, ATS-optimised resume content. Choose from 5 professional templates and download as PDF instantly.</p>
        </div>
        <ResumeBuilder/>
        <div style={{marginTop:40}}><Newsletter/></div>
      </div>}

      {/* ── TIPS ── */}
      {tab==='tips' && <div className="page" style={{paddingTop:40}}>
        <div className="sec-header">
          <div className="eyebrow">Career Development · AI-Powered · Free</div>
          <h2 className="sec-title">Career Tips & Guides <span className="badge-free">FREE</span></h2>
          <p className="sec-sub">6 deep-dive guides covering every dimension of professional success — each powered by live AI to give you personalised, specific, actionable tips.</p>
        </div>
        <CareerTips/>
      </div>}

      {/* ── COURSES ── */}
      {tab==='courses' && <div className="page" style={{paddingTop:40}}>
        {viewingCourse ? <LessonViewer course={viewingCourse} onBack={()=>setViewingCourse(null)}/> : <>
          <div className="sec-header">
            <div className="eyebrow">Free Courses</div>
            <h2 className="sec-title">Learn, Quiz & Get Certified <span className="badge-free">FREE</span></h2>
            <p className="sec-sub">Complete lessons → pass quizzes after each lesson → take the final assessment → download your official e-certificate. All free.</p>
          </div>
          <div style={{background:'rgba(201,168,76,.06)',border:'1px solid rgba(201,168,76,.15)',borderRadius:12,padding:'14px 18px',marginBottom:28,display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
            {['📚 Watch video lessons','📝 Pass lesson quizzes','🏆 Take final assessment','📜 Download e-certificate'].map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#d1d5db'}}>{i>0&&<span style={{color:'rgba(201,168,76,.4)'}}>→</span>}{s}</div>
            ))}
          </div>
          <div className="courses-grid" style={{marginBottom:48}}>
            {FREE_COURSES_DATA.map(c=>(
              <div key={c.id} className="course-card" onClick={()=>setViewingCourse(c)}>
                <div className="course-banner" style={{background:`linear-gradient(135deg,${c.color},#111318)`}}>{c.icon}</div>
                <div className="course-body">
                  <h3>{c.title}</h3><p>{c.desc}</p>
                  <div className="course-includes">
                    {['TED Talk videos + expert lesson notes','Lesson quizzes after every lesson','Final assessment (8 questions)','Official e-certificate on passing'].map(f=><div key={f} className="ci-row"><span className="ci-check">✓</span>{f}</div>)}
                  </div>
                  <div className="course-meta"><span className="course-dur">📚 {c.lessons.length} lessons · {c.duration}</span><span className="ctag ctag-f">▶ Free + Certificate</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="sec-header">
            <div className="eyebrow">Premium Courses</div>
            <h2 className="sec-title">Go Deeper with Pro <span className="badge-pro">PRO</span></h2>
            <p className="sec-sub">Advanced frameworks, more video lessons, exercises, workbooks, and certificates. From ₹299/month for everything.</p>
          </div>
          <div className="courses-grid">
            {PAID_COURSES_DATA.map(c=>(
              <div key={c.id} className="course-card" onClick={()=>setPaywall(c)}>
                <div className="course-banner" style={{background:`linear-gradient(135deg,${c.color},#111318)`}}>{c.icon}</div>
                <div className="course-body">
                  <h3>{c.title}</h3><p>{c.desc}</p>
                  <div className="course-meta"><span className="course-dur">📚 {c.lessons} lessons · {c.duration}</span><span className="ctag ctag-p">🔒 {c.price}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:48}}><Newsletter/></div>
        </>}
      </div>}

      {/* ── PRICING ── */}
      {tab==='pricing' && <div className="page" style={{paddingTop:40}}>
        <div className="sec-header" style={{textAlign:'center'}}>
          <div className="eyebrow">Transparent Pricing</div>
          <h2 className="sec-title">Simple, Honest Plans</h2>
          <p className="sec-sub" style={{maxWidth:480,marginLeft:'auto',marginRight:'auto'}}>No dark patterns. No surprise charges. No credit card required for the free plan. Built to be genuinely accessible to every professional in India.</p>
        </div>
        <div className="pricing-grid" style={{marginBottom:56}}>
          {[
            {name:'Free',price:'₹0',per:'forever',desc:'Everything you need to get started.',feat:false,features:['AI Resume Builder (unlimited)','All 5 professional resume templates','PDF download in all 5 formats','Public Speaking & Presence course (full)','Professional Communication course (full)','Lesson quizzes after every lesson','Final assessments for both courses','Official e-certificates on passing','All 6 AI-powered career tip guides']},
            {name:'Pro Monthly',price:'₹299',per:'/month',desc:'For professionals serious about growth.',feat:true,features:['Everything in Free','Emotional Intelligence at Work course','Negotiation & Influence course','Creative Problem Solving course','Personal Branding & LinkedIn course','New courses added every month','Downloadable workbooks & resources','Advanced assessment questions','Certificate of completion for all courses']},
            {name:'Pro Yearly',price:'₹1,999',per:'/year',desc:'Best value — 2 months free.',feat:false,features:['Everything in Pro Monthly','Save 44% vs monthly billing','2 months completely free','Early access to all new features','Priority customer support','Lifetime certificate access']},
          ].map(p=>(
            <div key={p.name} className={`price-card${p.feat?' pc-feat':''}`}>
              {p.feat && <div className="feat-badge-top">⭐ Most Popular</div>}
              <h3>{p.name}</h3>
              <div className="big-price">{p.price}<span className="price-per"> {p.per}</span></div>
              <p className="price-desc">{p.desc}</p>
              <div className="price-feats">{p.features.map(f=><div key={f} className="price-feat"><span className="feat-check">✓</span><span>{f}</span></div>)}</div>
              <button className="btn-primary" style={{width:'100%',marginTop:16}} onClick={()=>p.price==='₹0'?showToast('You\'re already on the free plan — no action needed!'):setPaywall({title:'All Premium Courses'})}>
                {p.price==='₹0'?'Start Free — No Card Needed':'Get Pro Access'}
              </button>
            </div>
          ))}
        </div>
        <div className="divider"/>
        <div className="sec-header">
          <div className="eyebrow">Frequently Asked Questions</div>
          <h2 className="sec-title">Everything You Need to Know</h2>
        </div>
        <FAQ/>
        <div style={{marginTop:48}}><Newsletter/></div>
      </div>}

      {/* ── ABOUT ── */}
      {tab==='about' && <div className="page" style={{paddingTop:40}}>
        <div className="about-hero">
          <div style={{fontSize:48,marginBottom:16}}>🎯</div>
          <h1>We Built This Because We Needed It</h1>
          <p>CareerCraft exists because career development shouldn't cost a fortune. We're on a mission to give every professional in India — whether you're just starting out or 10 years in — the tools, knowledge, and credentials to build the career they actually deserve.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-primary" onClick={()=>goTab('resume')}>Start for Free</button>
            <button className="btn-secondary" onClick={()=>goTab('courses')}>Browse Courses</button>
          </div>
        </div>
        <div className="story-box">
          <h2>Our Story</h2>
          <p>In 2023, we realised that most career advice was either too generic to be useful or too expensive to be accessible. A single session with a career coach in India costs ₹3,000–₹10,000. A professional resume writer charges ₹5,000–₹20,000. A single online course on platforms like LinkedIn Learning or Coursera costs ₹2,000–₹5,000.</p>
          <p>Meanwhile, millions of talented professionals in India were applying to jobs with poorly formatted resumes, showing up to interviews underprepared, and struggling to communicate their value because they simply couldn't afford the guidance that would make the difference.</p>
          <p>We built CareerCraft to fix that. With AI, we can give you a resume that would cost ₹10,000 to have written — for free. With curated learning and our own expert frameworks, we can give you courses that would cost ₹5,000 each — for ₹299/month for all of them. And with a thoughtful assessment and certificate system, we can give you credentials that actually mean something on your CV and LinkedIn.</p>
          <p>This platform is our answer to the question: what if career development was built for the person who needs it most, not the person who can afford to pay the most?</p>
        </div>
        <div className="values-grid">
          {[{icon:'🎯',t:'Accessibility',d:'The best career tools should be available to everyone, regardless of their budget.'},
            {icon:'💡',t:'Genuine Quality',d:'Every lesson, tip, and template is built to be genuinely useful — not just to look good.'},
            {icon:'🌱',t:'Real Growth',d:'We care about your actual career progress, not just your engagement with our platform.'},
            {icon:'🤝',t:'Honest Value',d:'We charge only for what creates real, tangible value — and we\'re transparent about exactly what you get.'},
          ].map(v=>(
            <div key={v.t} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h4>{v.t}</h4>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:28}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,marginBottom:16}}>Contact Us</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14}}>
            {[{icon:'📧',t:'Email',v:'hello@careercraft.in'},{icon:'💬',t:'WhatsApp Support',v:'+91 98765 43210'},{icon:'📍',t:'Based in',v:'India 🇮🇳'},{icon:'⏰',t:'Response Time',v:'Within 24 hours'}].map(c=>(
              <div key={c.t} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px'}}>
                <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
                <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.8px',color:'var(--muted)',marginBottom:4}}>{c.t}</div>
                <div style={{fontSize:14,fontWeight:500}}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:32}}><Newsletter/></div>
      </div>}

      <Footer setTab={goTab}/>

      {paywall && <PaywallModal item={paywall} onClose={()=>setPaywall(null)}/>}
      {toast && <div className="toast"><span className="toast-icon">✓</span><span>{toast}</span></div>}
    </>
  );
}
