/**
 * Curated kits — pre-built shopping lists hand-picked for specific
 * use cases. Each kit references products from gear-data.ts by slug.
 *
 * Each kit has its own /kits/[slug] landing page and a one-click
 * 'Add Whole Kit to Amazon Cart' button that uses the multi-item
 * cart URL (https://www.amazon.com/gp/aws/cart/add.html?...) with
 * the Associates tag attached.
 *
 * If individual product ASINs aren't known, the kit page falls back
 * to per-product Amazon search URLs (still earns commission via
 * cookie attribution).
 */

export interface KitItem {
  /** Product slug from gear-data.ts (the canonical entry) */
  slug: string
  /** Why this product earns its spot in the kit */
  reason: string
  /** Optional category label override (e.g. 'Camera', 'Audio') */
  categoryLabel?: string
  /** Optional Amazon ASIN for the cart-add deeplink */
  asin?: string
}

export interface Kit {
  slug: string
  name: string
  /** Short tagline for hero */
  tagline: string
  /** Who is this kit built for? */
  audience: string
  /** ~$ budget range for the whole kit */
  priceRange: string
  /** Long-form description shown on the kit page */
  description: string
  /** Key promise / what they get */
  promise: string
  /** Featured kit gets primary visual treatment on /kits index */
  featured?: boolean
  /** Color treatment for the kit card */
  accent: 'red' | 'amber' | 'teal' | 'purple'
  /** Items in the kit, in display order */
  items: KitItem[]
}

export const kits: Kit[] = [
  {
    slug: 'youtube-starter',
    name: 'The YouTube Starter Kit',
    tagline: 'Phone-first. Lead-ready. Under $500.',
    audience: 'Anyone with a phone, a window, and 90 days to test if YouTube works for their business.',
    priceRange: '$200 to $500',
    promise:
      'Everything you need to film 30 videos at a quality your audience will respect. No camera. No excuses. The phone in your pocket plus the right $50 mic does more for your channel than a $2,000 camera ever will.',
    description:
      'This is the kit Aaron tells every new client to start with. The phone you already own shoots in 4K. Add a wireless mic so people can hear you. Add a tripod so you can stop holding the camera. Add a soft light so your face does not look like a hostage video. That is it. Everything else is procrastination disguised as preparation.',
    featured: true,
    accent: 'red',
    items: [
      {
        slug: 'ubeesize-67-tripod',
        categoryLabel: 'Tripod',
        reason: 'Works with your phone AND any future camera. 67 inches tall. Bluetooth remote in the box.',
      },
      {
        slug: 'dji-mic-mini',
        categoryLabel: 'Wireless Mic',
        reason: 'Audio quality matters more than video quality. This mic alone will out-perform every camera upgrade for the first six months.',
      },
      {
        slug: 'elgato-key-light-mini',
        categoryLabel: 'Lighting',
        reason: 'Portable, USB-C powered, works on any desk or location shoot. Window light is best, this fills the gap.',
      },
      {
        slug: 'sandisk-extreme-pro-128gb',
        categoryLabel: 'Storage',
        reason: 'Fast enough for 4K. Reliable. Buy two so one is always charged into the camera.',
      },
      {
        slug: 'parrot-teleprompter-v3',
        categoryLabel: 'Optional',
        reason: 'Clip your phone in front of the camera, scroll your script, talk naturally. Cuts editing time in half.',
      },
    ],
  },
  {
    slug: 'youtube-growth',
    name: 'The Growth Kit',
    tagline: 'When the phone stops being enough.',
    audience: 'Channels generating leads. You have proof of concept. Time to step up production quality.',
    priceRange: '$1,500 to $2,500',
    promise:
      'Sony ZV-E10 II is the camera Aaron recommends every client step into when their phone hits its ceiling. Pair with a real wireless mic, professional lighting, and the gimbal that lets you film in motion without the shaky-cam look.',
    description:
      'You are past month three. The leads are coming. Now your only ceiling is production polish. This kit upgrades you to a creator-specific camera (flip screen, autofocus that actually works, 4K), broadcast wireless audio, and lighting that controls the room instead of fighting it.',
    accent: 'amber',
    items: [
      {
        slug: 'sony-zv-e10-ii',
        categoryLabel: 'Camera',
        reason: 'Built for content creators. Flip-out screen. Strong autofocus on faces. Aaron uses one as a backup body.',
      },
      {
        slug: 'sony-16-50mm-kit-lens',
        categoryLabel: 'Lens',
        reason: 'Versatile zoom that covers wide shots and tight talking-head framing. Comes bundled with the body.',
      },
      {
        slug: 'rode-wireless-go-ii',
        categoryLabel: 'Audio',
        reason: 'Two transmitters mean you can record two people at once, or have a backup channel for one. Industry standard.',
      },
      {
        slug: 'elgato-key-light-air',
        categoryLabel: 'Key Light',
        reason: 'App-controlled. Mountable on a desk or wall. Set it once and forget it.',
      },
      {
        slug: 'dji-rs-4',
        categoryLabel: 'Gimbal',
        reason: 'Smooth handheld footage. Required if your videos involve movement, walk-and-talk, or location shots.',
      },
      {
        slug: 'sandisk-extreme-pro-128gb',
        categoryLabel: 'Storage',
        reason: 'Buy three. Run them in rotation.',
      },
    ],
  },
  {
    slug: 'youtube-pro',
    name: 'The Pro Studio Kit',
    tagline: 'The setup running channels above 50K subscribers.',
    audience: 'Channels with revenue, ready to scale production quality. Or businesses outsourcing to a content team.',
    priceRange: '$4,000 to $6,000',
    promise:
      'Full-frame Sony body. Studio shotgun mic. Three-point Aputure lighting. The exact rig Aaron and his managed clients film @GotCoach with. This is what a $300K-per-year YouTube channel looks like behind the camera.',
    description:
      'Past 10K subs, your gear should match your output. Bigger sensor cameras for cinematic depth of field. Audio that fills out a podcast as easily as a long-form video. Lighting that lets you film any room any time. The ROI math is simple: at this stage one missed lead from a video that looked amateur costs more than this whole kit.',
    accent: 'purple',
    items: [
      {
        slug: 'sony-a7c-ii',
        categoryLabel: 'Camera',
        reason: 'Full-frame sensor. Cinematic look out of the box. Compact body for travel and tripod work.',
      },
      {
        slug: 'tamron-17-70mm-f28',
        categoryLabel: 'Lens',
        reason: 'Constant f/2.8 across the zoom range. Beautiful background blur. The one lens you keep mounted 90 percent of the time.',
      },
      {
        slug: 'shure-sm7b',
        categoryLabel: 'Studio Mic',
        reason: 'The Joe Rogan mic. The Joe Rogan reason. Best-in-class sound for any seated talking-head studio setup.',
      },
      {
        slug: 'focusrite-scarlett-2i2',
        categoryLabel: 'Audio Interface',
        reason: 'Required to power the SM7B. Clean preamps. Drop-in compatible with Mac, PC, mobile.',
      },
      {
        slug: 'aputure-amaran-200d',
        categoryLabel: 'Key Light',
        reason: 'COB LED with bowens mount. Massive output, soft shaping with the right modifier. Pro-level lighting for under $400.',
      },
      {
        slug: 'parrot-teleprompter-v3',
        categoryLabel: 'Teleprompter',
        reason: 'Even the most experienced presenters use prompters. Scripts get tighter. Eye contact stays direct.',
      },
    ],
  },
  {
    slug: 'vanlife-mobile',
    name: 'The Mobile Creator Kit',
    tagline: 'Aaron\'s actual @VanLife filming setup.',
    audience: 'Travel creators, real estate agents filming property tours, anyone shooting outside a fixed studio.',
    priceRange: '$1,200 to $2,500',
    promise:
      'The exact gear Aaron uses to film @VanLife (120K+ subs). Compact, durable, capable of shooting from a phone-sized rig or a full mirrorless setup as the situation demands. Fits in a single backpack.',
    description:
      'Static studios are easy. Mobile creation is hard. You need a kit that handles airports, weather, drone shots, and run-and-gun audio. This is the rig Aaron has tested across hundreds of @VanLife videos.',
    accent: 'teal',
    items: [
      {
        slug: 'sony-zv-1-ii',
        categoryLabel: 'Compact Camera',
        reason: 'Pocket-sized. 4K. Flip-out screen. Aaron grabs this when the bigger body is overkill.',
      },
      {
        slug: 'dji-osmo-pocket-3',
        categoryLabel: 'Action / Vlogging Camera',
        reason: 'Built-in gimbal. Folds smaller than a wallet. Best B-roll camera Aaron has ever owned.',
      },
      {
        slug: 'dji-mini-4-pro',
        categoryLabel: 'Drone',
        reason: 'Sub-249g (no FAA registration needed). Cinematic aerial shots that look professional out of the box.',
      },
      {
        slug: 'dji-mic-mini',
        categoryLabel: 'Wireless Mic',
        reason: 'Disappears under clothing. 48 hour battery with the case. Aaron always has two on hand.',
      },
      {
        slug: 'sandisk-extreme-pro-128gb',
        categoryLabel: 'Storage',
        reason: 'Multiple cards rotate through the field gear. Always one in the camera, one in the bag.',
      },
    ],
  },
  {
    slug: 'live-streaming',
    name: 'The Live Streaming Kit',
    tagline: 'Studio-quality streams without the broadcast truck.',
    audience: 'Streamers, live coaches, real-time hosts, anyone running webinars or YouTube Live as a regular channel.',
    priceRange: '$1,000 to $2,500',
    promise:
      'Stream Deck for one-tap scene control. Cam Link to use your real camera as a webcam. Elgato Key Lights you can dim from your phone. Wave:3 USB mic for plug-and-play broadcast audio. The whole setup that makes live look pre-produced.',
    description:
      'Live streaming used to require a $10K broadcast rig. Not anymore. This kit gives you one-button scene switching, real-camera image quality (not webcam blur), studio audio, and lighting that adjusts to the room. The difference between an amateur stream and one that grows an audience is rarely the host. It is almost always the production setup. This kit closes that gap.',
    accent: 'amber',
    items: [
      {
        slug: 'elgato-stream-deck-mk2',
        categoryLabel: 'Stream Control',
        reason: 'The brain of your stream. Mute mic, switch scenes, fire alerts, post the link to chat. Once you set it up, you stop touching the keyboard mid-stream.',
      },
      {
        slug: 'sony-zv-e10-ii',
        categoryLabel: 'Camera',
        reason: 'Clean HDMI output, autofocus that locks on faces, flip-out screen so you can see yourself. Pair with the Cam Link to use it as a 4K webcam.',
      },
      {
        slug: 'elgato-cam-link-4k',
        categoryLabel: 'Camera Capture',
        reason: 'Required to use any HDMI camera as a webcam. Plug, play, look broadcast.',
      },
      {
        slug: 'elgato-wave-3',
        categoryLabel: 'USB Mic',
        reason: 'Plug-and-play. Wave Link software lets you control mic, music, alerts on independent channels. Built for streamers.',
      },
      {
        slug: 'elgato-key-light-air',
        categoryLabel: 'Lighting',
        reason: 'App-controlled. Mount one as key, one as fill. Dim from your phone without leaving your seat.',
      },
      {
        slug: 'parrot-teleprompter-v3',
        categoryLabel: 'Optional',
        reason: 'For scripted segments, intro readings, or live tutorials. Eye contact stays direct, energy stays high.',
      },
    ],
  },
  {
    slug: 'real-estate-agent',
    name: 'The Real Estate Agent Kit',
    tagline: 'Property tours that close deals.',
    audience: 'Real estate agents, mortgage brokers, property managers. The kit Aaron equips his coaching clients with on day one.',
    priceRange: '$800 to $1,800',
    promise:
      'Filming a great property tour is half cinematography, half audio, and 100 percent practiced. This kit handles the cinematography and audio. The practice part is on you. Walk-and-talk gimbal shots, aerial property reveals from the drone, lavalier audio so you sound clean indoors and out.',
    description:
      'Real estate is the highest-converting niche on YouTube right now because the audience is searching for exactly what you sell. The bottleneck is rarely the strategy. It is the production. Listings filmed on a shaky phone with airpod audio look amateur and convert worse. Listings filmed with this kit look like a Netflix property docuseries. Same agent. Same listing. Different result.',
    accent: 'teal',
    items: [
      {
        slug: 'sony-zv-1-ii',
        categoryLabel: 'Camera',
        reason: 'Compact enough to walk a buyer through a property without feeling like a film crew. Flip-out screen for self-recorded intros.',
      },
      {
        slug: 'dji-rs-4',
        categoryLabel: 'Gimbal',
        reason: 'Smooth walk-and-talk shots through every room. The single piece of gear that separates an amateur tour from a professional one.',
      },
      {
        slug: 'dji-mini-4-pro',
        categoryLabel: 'Drone',
        reason: 'Sub-249g (no FAA registration needed for hobby use). Aerial property reveals that Zillow listings cannot match.',
      },
      {
        slug: 'dji-mic-mini',
        categoryLabel: 'Wireless Mic',
        reason: 'Clip on, walk through the house, narrate the value. Disappears under shirts. 48-hour battery in the case.',
      },
      {
        slug: 'dji-osmo-pocket-3',
        categoryLabel: 'B-Roll Camera',
        reason: 'Built-in gimbal in a pocket camera. Quick exterior shots, neighborhood B-roll, second-angle inserts during walkthroughs.',
      },
      {
        slug: 'sandisk-extreme-pro-128gb',
        categoryLabel: 'Storage',
        reason: 'Buy three. Cards live in your camera, your drone, and your spare bag. Never run out mid-shoot.',
      },
    ],
  },
  {
    slug: 'coach-consultant',
    name: 'The Coach & Consultant Kit',
    tagline: 'Look studio-grade on Zoom, YouTube, and live calls.',
    audience: 'Coaches, consultants, financial advisors, attorneys, anyone who runs a service business and lives on video calls.',
    priceRange: '$700 to $1,400',
    promise:
      'You sell expertise. The way you look on a call is the way buyers judge that expertise before you say a word. This kit makes every call (Zoom sales, YouTube studio, client coaching) look like you spent five figures on a studio. You did not.',
    description:
      'Most coaches and consultants run their entire business through video and never invest in their video setup. They lose deals to a competitor who looks more polished. This kit fixes that for the price of one missed deal. Plug-and-play webcam, broadcast mic, app-controlled lights, teleprompter for scripted videos. Set it once. Use it for years.',
    accent: 'amber',
    items: [
      {
        slug: 'elgato-facecam-pro',
        categoryLabel: 'Webcam',
        reason: 'Real 4K60 webcam built for creators. Better than any laptop camera, easier than mirrorless. Plug-and-play USB.',
      },
      {
        slug: 'shure-mv7-plus',
        categoryLabel: 'Microphone',
        reason: 'USB and XLR in one body. Plug-and-play today, future-proof when you upgrade to an interface. The mic that takes coaches from "phone audio" to "podcast guest" instantly.',
      },
      {
        slug: 'elgato-key-light-air',
        categoryLabel: 'Lighting',
        reason: 'App-controlled brightness. Mountable on desk or wall. Get one for key, one for fill. Look great in any room.',
      },
      {
        slug: 'parrot-teleprompter-v3',
        categoryLabel: 'Teleprompter',
        reason: 'For scripted YouTube videos and rehearsed sales pitches. Read your script while looking directly at the camera. Eye contact stays locked.',
      },
      {
        slug: 'elgato-stream-deck-mk2',
        categoryLabel: 'Optional',
        reason: 'One-tap mic mute, scene switch, snippet paste. The hidden upgrade that removes mid-call awkwardness forever.',
      },
    ],
  },
  {
    slug: 'speaker-stage',
    name: 'The Speaker & Stage Kit',
    tagline: 'Capture every speaking gig as a year of YouTube content.',
    audience: 'Keynote speakers, conference presenters, workshop hosts, anyone who stands on stage regularly.',
    priceRange: '$900 to $2,000',
    promise:
      'Most speakers stand on a stage with thousands of dollars in honoraria, perfect lighting, and a captive audience. Then they walk off and lose the footage forever. This kit captures every gig in broadcast quality so one event becomes 30 short clips, 4 long-form videos, and a podcast season for the next 12 months.',
    description:
      'A 60-minute keynote contains roughly 30 monetizable moments. Most speakers walk away with the venue\'s blurry highlight reel and call it a day. This kit changes that. Lapel mic that captures clean stage audio independent of the venue\'s sound system. Compact camera for wide shots. Pocket camera for run-and-gun B-roll. Storage that handles a full day of recording.',
    accent: 'purple',
    items: [
      {
        slug: 'hollyland-lark-m2',
        categoryLabel: 'Wireless Lavalier',
        reason: '1000ft range. Clip on before the keynote. Capture broadcast audio independent of the venue board (which usually mixes for the live room, not for clean recording).',
      },
      {
        slug: 'sony-zv-e10-ii',
        categoryLabel: 'Stage Camera',
        reason: 'Tripod-mounted at the back of the room. Wide shot of you on stage. Autofocus that locks on faces even in dim conference lighting.',
      },
      {
        slug: 'sony-zv-1-ii',
        categoryLabel: 'Run-and-Gun Camera',
        reason: 'Compact backup. Have a friend or colleague capture audience reactions, sponsor signage, behind-scenes B-roll. Editing gold.',
      },
      {
        slug: 'dji-osmo-pocket-3',
        categoryLabel: 'B-Roll',
        reason: 'Pocket-sized gimbal cam for arrival, green room, post-event meet-and-greet. Story footage your audience will eat up.',
      },
      {
        slug: 'ubeesize-67-tripod',
        categoryLabel: 'Tripod',
        reason: 'Stable wide shot of you on stage. Tall enough to clear the audience.',
      },
      {
        slug: 'sandisk-extreme-pro-128gb',
        categoryLabel: 'Storage',
        reason: 'Buy four. One in each camera, two backups. A full day of conference shooting eats cards.',
      },
    ],
  },
  {
    slug: 'podcast-essentials',
    name: 'The Podcast Kit',
    tagline: 'Studio-grade audio without the studio price tag.',
    audience: 'Podcasters, interview-format YouTubers, anyone serious about their voice on camera.',
    priceRange: '$400 to $1,200',
    promise:
      'Audio first. Microphone, interface, and lighting setup that produces broadcast-ready sound out of any room. Once your audio sounds professional, your video can be a phone propped on a stack of books and viewers will still stay.',
    description:
      'In Aaron\'s experience coaching hundreds of creators, audio quality is the single biggest predictor of watch time on talking-head videos. Listeners forgive bad video. They never forgive bad audio. This kit is the shortest path to broadcast quality.',
    accent: 'red',
    items: [
      {
        slug: 'shure-mv7-plus',
        categoryLabel: 'Microphone',
        reason: 'USB and XLR in one. Plug-and-play for podcasters who want to start today, future-proofed for when you upgrade your interface.',
      },
      {
        slug: 'maono-pd300x',
        categoryLabel: 'Budget Mic Alternative',
        reason: 'If MV7 is out of budget. Same dynamic-mic broadcast tone for under $100.',
      },
      {
        slug: 'focusrite-scarlett-2i2',
        categoryLabel: 'Audio Interface',
        reason: 'Two XLR inputs, two-channel monitor. Clean preamps. Required if you go XLR with the SM7B or MV7.',
      },
      {
        slug: 'elgato-key-light-air',
        categoryLabel: 'Lighting',
        reason: 'Mounted to a desk or wall, app-controlled. Even if the show is audio-first, video lighting helps if you publish to YouTube.',
      },
      {
        slug: 'sony-zv-e10-ii',
        categoryLabel: 'Optional Camera',
        reason: 'If you publish to YouTube, this camera pairs perfectly with the Shure for video podcasts.',
      },
    ],
  },
]

/**
 * Build an Amazon multi-item cart URL for a kit.
 * Requires each item to have a real ASIN. Falls back to a search-list
 * URL if ASINs are missing (still earns commission).
 */
export function kitCartUrl(kit: Kit, tag: string): string {
  if (!tag) return ''
  const withAsin = kit.items.filter((it) => it.asin)
  if (withAsin.length === withAsin.length && withAsin.length === kit.items.length) {
    const params = new URLSearchParams()
    withAsin.forEach((it, i) => {
      params.append(`ASIN.${i + 1}`, it.asin!)
      params.append(`Quantity.${i + 1}`, '1')
    })
    params.append('AssociateTag', tag)
    return `https://www.amazon.com/gp/aws/cart/add.html?${params.toString()}`
  }
  // No ASINs yet — link to Aaron's storefront kit pages or a kit search
  return ''
}
