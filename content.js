// All page copy lives here. Edit text, add experiences or nights, and the page rebuilds itself.
// `ast` is an Astros photo id on img.mlbstatic.com (from astros.com pages) or a full Unsplash URL.
// It loads over the local `img` file, which stays as the fallback.
const U = id => `https://images.unsplash.com/photo-${id}?w=1200&q=75&fm=jpg&fit=crop`;
window.SITE = {
  phone: '(713) 259-8030',

  hero: {
    title: ['Group Tickets', '& Experiences'],
    text: 'Astros games are better together. Bring your church, school, team or organization to Daikin Park, sit together, get recognized on the big screen, and add a once-in-a-lifetime experience to your outing. Book a group and save!',
    img: 'img/hero.jpg', ast: 'j0rvq1nf0d3dkhoo1pnp',
  },

  benefits: [
    ['seat', 'Reserved Seating', 'Secure a block of seats together so your whole group can cheer on the Astros side by side.'],
    ['tag', 'Preferred Group Pricing', 'Unlock exclusive group pricing that gets better as your group gets bigger.'],
    ['rep', 'Dedicated Astros Representative', 'A specialist for your type of group (faith, schools, youth sports, nonprofits or bilingual) who helps from start to finish.'],
    ['star', 'Unique Fan Experiences', 'Add group-only moments like a ceremonial first pitch, running the bases or watching batting practice from the field.'],
    ['board', 'Group Recognition', 'See your group’s name on the videoboard with an in-game welcome.'],
    ['link', 'One Link for Everyone', 'Share a single group link. Members buy their own seats and everyone still sits together.'],
  ],

  tiers: [
    { key: 'single', name: 'Single', min: 15, blurb: 'Perfect for small teams, classrooms and ministries.',
      perks: ['Group pricing and seats together', 'Personal group link for easy sharing', 'Videoboard welcome'] },
    { key: 'double', name: 'Double', min: 50, blurb: 'Youth leagues, youth groups and school grades.',
      perks: ['Everything in Single', 'Group leader gift bag', 'Fundraising return to your organization'] },
    { key: 'triple', name: 'Triple', min: 150, blurb: 'Congregations, schools and community partners.',
      perks: ['Everything in Double', 'Pregame on-field experience', 'On-field recognition moment'] },
    { key: 'hr', name: 'Home Run', min: 300, blurb: 'Your own night at Daikin Park.',
      perks: ['Everything in Triple', 'Ceremonial first pitch', 'Autographed item for your organization', 'Custom group T-shirt or jersey bundle'] },
  ],
  tierMatrix: [
    ['Group pricing and seats together', 1, 1, 1, 1],
    ['Dedicated Astros representative', 1, 1, 1, 1],
    ['Personal group link (members pay on their own)', 1, 1, 1, 1],
    ['Videoboard welcome', 1, 1, 1, 1],
    ['Group leader gift bag', 0, 1, 1, 1],
    ['Fundraising return to your organization', 0, 1, 1, 1],
    ['Pregame on-field experience', 0, 0, 1, 1],
    ['On-field recognition moment', 0, 0, 1, 1],
    ['Ceremonial first pitch', 0, 0, 0, 1],
    ['Autographed item for your organization', 0, 0, 0, 1],
    ['Custom group T-shirt or jersey bundle', 0, 0, 0, 1],
  ],

  experiences: [
    { t: 'Ceremonial First Pitch', img: 'img/x-firstpitch.jpg', ast: 'hp4syzrjmuapd6rqnooi', d: 'Send one member of your group to the mound to throw out a ceremonial first pitch in front of the crowd.', min: 300, max: 1 },
    { t: 'Kids Run the Bases', img: 'img/x-runbases.jpg', ast: U('1508802493048-bf55245a557b'), d: 'After select games, the kids in your group run the bases at Daikin Park.', min: 50, max: 40 },
    { t: 'Starting Lineup', img: 'img/x-lineup.jpg', d: 'Young players stand with the Astros on the baseline during the national anthem.', min: 150, max: 9 },
    { t: 'Batting Practice View', img: 'img/x-bp.jpg', d: 'Watch the Astros take batting practice from the warning track before gates open.', min: 100, max: 30 },
    { t: 'Dugout Team Photo', img: 'img/x-teamphoto.jpg', ast: U('1686256894418-3ff8fc2b34b3'), d: 'Take a team photo on the field in front of the Astros dugout before the game.', min: 50, max: 25 },
    { t: 'Play Ball Kid', img: 'img/x-playball.jpg', ast: 'dfmdpoemaosah6onyyne', d: 'One lucky kid shouts “Play Ball!” over the ballpark speakers to start the game.', min: 150, max: 1 },
    { t: 'Orbit Visit', img: 'img/x-orbit.jpg', d: 'Orbit stops by your section for photos, high-fives and plenty of spirit.', min: 75, max: null },
    { t: 'Videoboard Welcome', img: 'img/x-videoboard.jpg', d: 'Your group’s name on the big screen, with a welcome read by the in-game host.', min: 15, max: null },
    { t: 'On-Field Recognition', img: 'img/x-recognition.jpg', ast: 'afci5akriafr2yow7xys', d: 'Honor a state champion, a graduating class, volunteers or a leader on the field before first pitch.', min: 150, max: 20 },
    { t: 'Big Flag', img: 'img/x-flag.jpg', ast: 'l5bfrqvbg7o3a45f1jve', d: 'Help unfurl the giant American flag across the outfield during the national anthem.', min: 200, max: 60 },
    { t: 'Color Guard', img: 'img/x-colorguard.jpg', ast: 'psesnjobuoosyxndpkem', d: 'Scouts, JROTC and service groups present the colors before the game.', min: 100, max: 6 },
    { t: 'Awareness Table', img: 'img/x-table.jpg', ast: 'agimscmlc4gl9ij9vkhs', d: 'Host a concourse table to share your cause with thousands of fans.', min: 200, max: 4 },
  ],

  communities: { faith: 'Faith', hispanic: 'Hispanic Community', youth: 'Youth Sports', schools: 'Schools', nonprofits: 'Nonprofits' },
  nights: [
    { t: 'Faith & Family Feast Night', c: 'faith', img: 'img/n-faith.jpg', ast: U('1732850714203-d40cd333968e'), d: 'A pregame fellowship meal in a reserved space, your congregation seated together, early field access and a videoboard welcome.', min: 150 },
    { t: 'Youth Group Night', c: 'faith', img: 'img/x-crawford.jpg', ast: U('1593896385987-16bcbf9451e5'), d: 'A youth-group outing planned with youth pastors: group seats, a postgame Run the Bases and a T-shirt bundle.', min: 50 },
    { t: 'Noche de Fiesta', c: 'hispanic', img: 'img/n-fiesta.jpg', d: 'A pregame plaza fiesta with mariachi, Spanish-language broadcast moments, a heritage jersey giveaway and family-priced concessions.', min: 50 },
    { t: 'Heritage Partner Night', c: 'hispanic', img: 'img/p-mariachi.jpg', ast: U('1600466891878-dd4001252ffd'), d: 'Group packages sold through Hispanic-serving organizations, with on-field recognition for student leaders.', min: 150 },
    { t: 'Youth Sports Night', c: 'youth', img: 'img/n-youth.jpg', ast: 'c4s7zq4ivrgzzfjc9zsj', d: 'Teams come in uniform, parade on the warning track and see their names on the videoboard. A share of every ticket goes back to the club.', min: 50 },
    { t: 'Tournament Weekend', c: 'youth', img: 'img/g-classic.jpg', ast: 'qcv9xljknczys2ftdqvq', d: 'Group pricing for teams playing Houston tournaments, timed around their schedule.', min: 25 },
    { t: 'STEM Education Day', c: 'schools', img: 'img/n-stem.jpg', ast: 'rwavfry1jjxkcm8pqf7c', d: 'A ballpark tour and a STEM presentation on the science of baseball, followed by a day game.', min: 100 },
    { t: 'Scholarship Night', c: 'schools', img: 'img/n-scholar.jpg', ast: 'qynhdcmcjw9at4kilwjf', d: 'Reserved blocks for STEAM scholarship schools, with winners recognized on the field.', min: 150 },
    { t: 'Class of 2027 Night', c: 'schools', img: 'img/n-grad.jpg', ast: U('1785052335692-ee4d5aff9903'), d: 'Graduates at every level celebrated together, with reserved sections for districts and colleges.', min: 100 },
    { t: 'Reading Rewards', c: 'schools', img: 'img/x-porch.jpg', ast: U('1599689868384-59cb2b01bb21'), d: 'Students earn tickets by hitting reading goals, and families come with them.', min: 50 },
    { t: 'Nonprofit of the Night', c: 'nonprofits', img: 'img/n-nonprofit.jpg', ast: 'f5upaao4j3lykdjbxyzf', d: 'An awareness table, an on-field moment and a fundraising return on every ticket your supporters buy.', min: 150 },
    { t: 'Healthcare Heroes Night', c: 'nonprofits', img: 'img/n-health.jpg', ast: U('1770663734902-0f2440bc665c'), d: 'A night honoring Houston’s medical community, built with hospitals and the Texas Medical Center.', min: 150 },
  ],

  performances: [
    { t: 'National Anthem', img: 'img/p-anthem.jpg', ast: 'cfljz7vlizwhosno7ruc', d: 'Perfect for a choir, school ensemble or soloist ready to lead 40,000 fans in the national anthem.', min: 100, max: 30 },
    { t: 'God Bless America', img: 'img/p-choir.jpg', d: 'Lead the ballpark in “God Bless America” during the seventh-inning stretch.', min: 100, max: 40 },
    { t: 'Plaza Performance', img: 'img/p-mariachi.jpg', ast: U('1600466892203-d84aae0aa4c1'), d: 'Mariachi, folklórico, dance teams and bands perform for fans on the plaza as gates open.', min: 75, max: 50 },
    { t: 'Drumline Pregame', img: 'img/p-band.jpg', ast: U('1616382519098-57806dfc551a'), d: 'School bands and drumlines bring the energy at the gates before first pitch.', min: 100, max: 60 },
  ],

  hospitality: [
    { t: 'Suite Rentals', img: 'img/c-suite.jpg', ast: 'y3fljtxnp9jc1nk4bf5o', d: 'A private suite with catering for your team, clients or leadership group.', min: null, max: null, note: 'Suites hold 20–60 guests' },
    { t: 'Union Station Events', img: 'img/c-union.jpg', ast: 'sfmky8skps94rzn10azi', d: 'Host a pregame reception or banquet in the historic Union Station lobby.', min: null, max: null, note: 'Private event space' },
    { t: 'Center Field Group Areas', img: 'img/c-cf.jpg', ast: 'msv8qpqqsemnnezf9nxu', d: 'Open-air group spaces in center field with food and drink packages built in.', min: 40, max: null, note: 'Reserved by group' },
  ],

  clubs: [
    { t: 'Gallagher Club', img: 'img/k-gallagher.jpg', ast: 'utk2givpmh8ift4yn2es' },
    { t: 'Six J Marketing Field Club', img: 'img/k-sixj.jpg', ast: 'gc5jrxu17dcbayqbbsgz' },
    { t: 'Diamond Club', img: 'img/k-diamond.jpg', ast: 'yqxdzhg4esrikdbj14a4' },
    { t: 'Insperity Club', img: 'img/k-insperity.jpg', ast: 'mx674fxcu1ocfmmizxsw' },
    { t: 'Honda Club Level', img: 'img/k-honda.jpg' },
  ],

  offers: [
    { t: 'Educators & First Responders', d: 'To thank Houston’s teachers, nurses, firefighters, police and military, verified heroes save on select games.', cta: 'View Offer' },
    { t: 'Faith Leader Preview Night', d: 'Pastors and ministry leaders are invited to a game on us to experience the group program before bringing their congregation.', cta: 'Reserve a Spot' },
    { t: 'Ticket Fundraiser', d: 'Sell Astros tickets for your cause through a custom link and keep a share of every sale.', cta: 'Start a Fundraiser' },
  ],

  team: [
    { role: 'Faith & Family Groups', who: 'Churches, ministries, youth groups', i: 'faith' },
    { role: 'Hispanic Community Groups', who: 'Bilingual · Hablamos español', i: 'hispanic' },
    { role: 'Youth Sports & Tournaments', who: 'Clubs, leagues, traveling teams', i: 'youth' },
    { role: 'Schools & Education', who: 'Districts, PTOs, teachers, colleges', i: 'schools' },
    { role: 'Nonprofits & Community', who: 'Charities, foundations, volunteers', i: 'nonprofits' },
    { role: 'Corporate & Premium Groups', who: 'Suites, clubs, employee outings', i: 'corporate' },
  ],

  faq: [
    ['How many people do I need for group tickets?', 'Group pricing starts at 15 tickets. The bigger your group, the more experiences you unlock. See the group tiers above.'],
    ['Does everyone have to pay me up front?', 'No. Your representative sets up a personal group link. Each member buys their own seats, and everyone still sits together.'],
    ['Can my group sit together if people buy at different times?', 'Yes. Your seats are held as a block, and every purchase through your group link lands in that block.'],
    ['How does the fundraising return work?', 'A share of every ticket bought through your organization’s link goes back to your organization after the game.'],
    ['Which experiences are available for my group?', 'It depends on your group size and the game you choose. Your representative will confirm what’s open for your date.'],
    ['Do you have a representative who speaks Spanish?', 'Yes. Our Hispanic Community Groups specialist works with groups in English and Spanish.'],
    ['How far in advance should I book?', 'Six to eight weeks is ideal, especially for weekends, fireworks nights and specialty nights, which sell out first.'],
    ['What if the game is rained out?', 'Daikin Park has a retractable roof, so games are played rain or shine.'],
  ],

  // Inside Astros Tickets: every item from the official ticket menu.
  // internal pages render in the MLB-style layout; external ones link out.
  tickets: [
    { slug: 'season-tickets', t: 'Season Tickets', url: 'https://www.mlb.com/astros/tickets/season', img: 'img/stadium.jpg', ast: 'bde3yis3xhggjjydt2qu',
      d: 'Full-season memberships for all 81 home games, with the best seat locations and member benefits.',
      group: 'Church and school leaders who bring groups every year can be invited to a member-style plan that renews their group night automatically.' },
    { slug: 'spring-training', t: 'Spring Training', url: 'https://www.mlb.com/astros/spring-training', img: 'img/x-bp.jpg', ast: 'pchpgb8cq3jxkhxueahk',
      d: 'Catch the Astros in Florida each spring as they get ready for the season.',
      group: 'A natural fit for traveling youth teams and college groups already heading to Florida in March.' },
    { slug: 'postseason', t: 'Postseason', url: 'https://www.mlb.com/astros/tickets/postseason', img: 'img/x-lineup.jpg', ast: 'usci4rks0cxvxwxkjgcm',
      d: 'Information on postseason tickets and presale opportunities.',
      group: 'Group buyers get presale access to postseason tickets, which gives every group a reason to come back.' },
    { slug: 'group-tickets', t: 'Group Tickets', internal: '#/' },
    { slug: 'premium-seats', t: 'Premium Seats', url: 'https://www.mlb.com/astros/tickets/premium/suites', img: 'img/k-diamond.jpg', ast: 'i3yp290soa9f36igicgq',
      d: 'Daikin Park’s premium spaces include the Gallagher Club, Six J Marketing Field Club, Diamond Club, Insperity Club, season suites and nightly suites.',
      group: 'Premium groups of six or more can pair club access with a group experience.' },
    { slug: 'split-season', t: 'Split Season Tickets', url: 'https://www.mlb.com/astros/tickets/season-tickets/split', img: 'img/x-crawford.jpg', ast: 'wkdehbn2g1toaoyszzvj',
      d: 'Share a season-ticket plan and split the games.',
      group: 'Organizations can split a plan across ministries, classes or teams, so each one gets its own night.' },
    { slug: 'concerts', t: 'Concerts', url: 'https://www.mlb.com/astros/tickets/concerts', img: 'img/roof.jpg', ast: 'uu3oaujgm05godgcn54w',
      d: 'Concerts and shows at Daikin Park.',
      group: 'Group pricing and seats together for youth groups, choirs and school music programs.' },
    { slug: 'events', t: 'Events', url: 'https://www.mlb.com/astros/tickets/events', img: 'img/c-union.jpg', ast: 'jhfnhcpruprmze70xnjb',
      d: 'Host a private event at Daikin Park, from banquets in Union Station to receptions on the field.',
      group: 'Pair a banquet or awards night with a group game ticket.' },
    { slug: 'light-up-the-park', t: 'Light Up The Park', url: 'https://www.mlb.com/astros/tickets/light-up-the-park', img: 'img/skyline.jpg', ast: 'kmm6wmyxsxowumkg6wjx',
      d: 'See the official page for event details.',
      group: 'Special events like this are easy wins for church and school groups looking for a family night.' },
    { slug: 'ballpark-tours', t: 'Ballpark Tours', url: 'https://www.mlb.com/astros/ballpark/tours', img: 'img/g-train.jpg', ast: 'z5lzrwl0w55wkp1jflmt',
      d: 'Go behind the scenes at Daikin Park, with educational tours for school groups.',
      group: 'Bundle a tour with a game, a STEM presentation and group seats for a full Education Day.' },
    { slug: 'honda-club-level', t: 'Honda Club Level', url: 'https://www.mlb.com/astros/ballpark/honda-club-level', img: 'img/k-honda.jpg',
      d: 'Club-level seats with climate-controlled concourses and upgraded concessions.',
      group: 'An upgrade path for corporate and nonprofit donor groups.' },
    { slug: 'ballpark-app', t: 'MLB Ballpark App', url: 'https://www.mlb.com/astros/apps/ballpark', img: 'img/x-videoboard.jpg', ast: 'hpbo0t9p7jvwaldlqy8h',
      d: 'Your mobile tickets, ballpark maps and offers in one app.',
      group: 'Group tickets bought through a group link go straight into each member’s app.' },
    { slug: 'mobile-ticketing', t: 'Mobile Ticketing', url: 'https://www.mlb.com/astros/tickets/mobile', img: 'img/x-crawford.jpg', ast: 'fakqtkyhl0l82sm8efnp',
      d: 'How to use, transfer and manage mobile tickets.',
      group: 'Group leaders can forward tickets to members in a few taps.' },
    { slug: 'my-astros-tickets', t: 'My Astros Tickets', url: 'https://mlb.tickets.com/ticketmanagement/?orgid=27007&agency=ASTM_MYTIXX#/', external: true },
    { slug: 'seating-map', t: 'Seating Map', internal: '#/seating-map' },
    { slug: '3d-seating-map', t: '3D Seating Map', url: 'https://venues.3ddigitalvenue.com/houston-astros', external: true },
    { slug: 'buy-seatgeek', t: 'Buy on SeatGeek', url: 'https://seatgeek.com/houston-astros-tickets', external: true },
    { slug: 'sell-seatgeek', t: 'Sell on SeatGeek', url: 'https://seatgeek.com/sell/houston-astros', external: true },
  ],

  topNav: [
    ['Tickets', null],
    ['Schedule', 'https://www.mlb.com/astros/schedule'],
    ['Roster', 'https://www.mlb.com/astros/roster'],
    ['Daikin Park', 'https://www.mlb.com/astros/ballpark'],
    ['Community', 'https://www.mlb.com/astros/community'],
    ['Fans', 'https://www.mlb.com/astros/fans'],
  ],

  // Unsplash photos (Unsplash License), shown on the Photo Credits page.
  unsplash: [
    ['Boy running for the next base', 'boy-hit-the-ball-running-for-the-next-base-XoAUPASBOdc'],
    ['Three young baseball players', 'three-young-baseball-players-standing-on-a-baseball-field-bhFvRV_1uR8'],
    ['Buffet line', 'a-group-of-people-standing-around-a-buffet-line-Mp4ktOqYte0'],
    ['People gathering at an event', 'people-gathering-in-a-event-CjMwAu4-OqY'],
    ['Folklórico dancers', 'man-in-black-shirt-and-black-pants-holding-woman-in-yellow-and-pink-dress-LVARJlcdoZI'],
    ['Folklórico dancer', 'woman-in-red-and-yellow-dress-wearing-black-hat-4BX3VmAXvFE'],
    ['Graduates throwing caps', 'students-celebrate-graduation-by-throwing-caps-into-the-air-138SbPvRzaQ'],
    ['Child reading at a table', 'child-reading-book-at-wooden-table-BPXSTl_HBhk'],
    ['Healthcare workers forming a heart', 'group-of-people-forming-a-heart-shape-with-hands-iLNFyRK3Q3A'],
    ['Drumline', 'people-playing-drum-on-orange-concrete-floor-during-daytime-YPnu0_V5Ttk'],
  ],
};
