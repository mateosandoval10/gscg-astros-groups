// All page copy lives here. Edit text, add ideas, nights or experiences, and the page rebuilds itself.
// `ast` is an Astros photo id on img.mlbstatic.com (from astros.com pages) or a full Unsplash URL.
// It loads over the local `img` file, which stays as the fallback.
const U = id => `https://images.unsplash.com/photo-${id}?w=1200&q=75&fm=jpg&fit=crop`;
window.SITE = {
  hero: {
    kicker: 'GSCG mock-up · Midpoint recap',
    title: ['Group Tickets,', 'Reimagined'],
    text: 'A mock-up of what our final deliverable could look like. Each section below is one of the ideas from today, shown the way a Houston church, school, team or nonprofit would actually experience it.',
    img: 'img/hero.jpg', ast: 'j0rvq1nf0d3dkhoo1pnp',
  },

  communities: { faith: 'Church Groups', hispanic: 'Hispanic Community', youth: 'Youth Sports', schools: 'Schools', nonprofits: 'Nonprofits' },

  // The ideas, in the order the page shows them. `c` colors the audience tag; 'all' means every group.
  ideas: [
    { id: 'tiers', c: 'all', nav: 'Tiers', t: 'Group Tiers',
      what: 'Four levels, from Single to Home Run. Every level adds a bigger moment at the ballpark.',
      why: 'Gives every group a reason to recruit a few more people, and a reason to come back bigger next year.' },
    { id: 'nights', c: 'all', nav: 'Nights', t: 'Specialty Group Nights',
      what: 'A night built for each of the five communities, from a partner church night to Youth Sports Night.',
      why: 'Turns one-off theme nights into a calendar that every community can plan around.' },
    { id: 'fundraising', c: 'schools', nav: 'Fundraising', t: 'Group Fundraising',
      what: 'Schools raise $5 for every $15 in tickets sold through their own custom link.',
      why: 'Schools are far more likely to buy when the outing also raises money for them.' },
    { id: 'field-trips', c: 'schools', nav: 'Field Trips', t: 'Field Trip + Game Packages',
      what: 'Bundle the ballpark tours schools already book with a game ticket on the same day.',
      why: 'Schools already coming for tours become group ticket buyers, with no new outreach needed.' },
    { id: 'espanol', c: 'hispanic', nav: 'En Español', t: 'Astros en Español',
      what: 'A year-round Spanish-language channel and bilingual group invites.',
      why: 'Builds a connection with Hispanic fans that lasts beyond one heritage weekend.' },
    { id: 'charity', c: 'nonprofits', nav: 'Charity Drive', t: 'Charity Drive Night',
      what: 'Fans donate food or clothes at the gate and get $1 off a hot dog. The nonprofit gets the spotlight.',
      why: 'An easy incentive for fans, and a real platform for the nonprofit and its volunteers.' },
    { id: 'experiences', c: 'all', nav: 'Experiences', t: 'Experiences & Recognition',
      what: 'Group-only moments, from teams in uniform on the warning track to a choir singing the anthem.',
      why: 'Recognition is what groups remember and share, and it costs the Astros very little.' },
    { id: 'outreach', c: 'all', nav: 'Outreach', t: 'One Link, Personal Outreach',
      what: 'Every organization gets its own page and link, plus ready-to-send messages for its members.',
      why: 'The leader shares one link and members pay on their own. This is where the second half begins.' },
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

  nights: [
    { t: 'Partner Church Night', c: 'faith', img: 'img/stadium.jpg', ast: 'bwg0f6tw48rldumx7gbg', d: 'Built with one of Houston’s megachurches: a pregame prayer, church leaders read the starting lineup and the congregation fills its own sections.', min: 300 },
    { t: 'Faith & Family Feast Night', c: 'faith', img: 'img/n-faith.jpg', ast: U('1732850714203-d40cd333968e'), d: 'A pregame fellowship meal in a reserved space, the congregation seated together and a videoboard welcome.', min: 150 },
    { t: 'Youth Group Night', c: 'faith', img: 'img/x-crawford.jpg', ast: U('1593896385987-16bcbf9451e5'), d: 'Promoted through youth pastors: group seats, a postgame Run the Bases and a T-shirt bundle.', min: 50 },
    { t: 'Noche de Fiesta', c: 'hispanic', img: 'img/n-fiesta.jpg', d: 'A pregame plaza fiesta with mariachi, Spanish-language broadcast moments and a limited-edition heritage jersey.', min: 50 },
    { t: 'Heritage Scholarship Night', c: 'hispanic', img: 'img/p-mariachi.jpg', ast: U('1600466891878-dd4001252ffd'), d: 'Group packages sold through Hispanic-serving organizations, with scholarship winners recognized on the field.', min: 150 },
    { t: 'Youth Sports Night', c: 'youth', img: 'img/n-youth.jpg', ast: 'c4s7zq4ivrgzzfjc9zsj', d: 'Club and high school teams come in their jerseys, parade on the warning track and see their names on the videoboard.', min: 50 },
    { t: 'Tournament Weekend', c: 'youth', img: 'img/g-classic.jpg', ast: 'qcv9xljknczys2ftdqvq', d: 'Group pricing for traveling teams playing Houston tournaments, timed around their schedule.', min: 25 },
    { t: 'Scholarship Night', c: 'schools', img: 'img/n-scholar.jpg', ast: 'qynhdcmcjw9at4kilwjf', d: 'Reserved sections for STEAM scholarship schools, with winners recognized on the field.', min: 150 },
    { t: 'Class of 2027 Night', c: 'schools', img: 'img/n-grad.jpg', ast: U('1785052335692-ee4d5aff9903'), d: 'Graduates at every level celebrated together, with reserved sections for districts and colleges.', min: 100 },
    { t: 'Nonprofit of the Night', c: 'nonprofits', img: 'img/n-nonprofit.jpg', ast: 'f5upaao4j3lykdjbxyzf', d: 'A concourse awareness table, an on-field moment and a fundraising return on every ticket supporters buy.', min: 150 },
    { t: 'Charity Drive Night', c: 'nonprofits', img: 'img/n-health.jpg', ast: U('1770663734902-0f2440bc665c'), d: 'Fans bring food or clothes for a partner nonprofit and get $1 off a hot dog.', min: 150 },
    { t: 'Reading Rewards', c: 'nonprofits', img: 'img/x-porch.jpg', ast: U('1599689868384-59cb2b01bb21'), d: 'Kids in nonprofit programs log reading hours to earn tickets, and their families come with them.', min: 50 },
  ],

  fundraising: { price: 15, back: 5, min: 15, max: 600, start: 180 },

  fieldTrip: {
    day: [
      ['9:30 AM', 'Ballpark tour', 'The educational and STEM tour schools already book today.'],
      ['10:45 AM', 'Science of baseball', 'A short classroom-style session on the physics of pitching and hitting.'],
      ['11:45 AM', 'Lunch together', 'Students eat as a group in a reserved area.'],
      ['1:10 PM', 'Day game', 'The whole school sits together, with a videoboard welcome.'],
    ],
    proof: ['20,000+', 'students a year at the Kansas City Royals’ School Day, which has run for more than 25 years', 'https://www.mlb.com/royals/tickets/specials/school-day'],
  },

  espanol: [
    { k: 'Group invite', en: 'Bring your group to Noche de Fiesta! Seats together, mariachi on the plaza and a limited-edition heritage jersey.', es: '¡Trae a tu grupo a la Noche de Fiesta! Asientos juntos, mariachi en la plaza y un jersey de herencia de edición limitada.' },
    { k: 'Scholarship spotlight', en: 'Congratulations to this year’s scholarship winners, recognized on the field tonight.', es: 'Felicidades a los ganadores de las becas de este año, reconocidos hoy en el campo.' },
    { k: 'Meet your rep', en: 'Planning a group outing? Talk to our bilingual group specialist.', es: '¿Planeas una salida en grupo? Habla con nuestro especialista bilingüe.' },
  ],

  charity: [
    ['Bring a donation', 'Fans bring canned food or gently used clothes for the night’s partner nonprofit.'],
    ['Get a coupon', 'Every donation at the gate earns $1 off a hot dog inside.'],
    ['Spotlight the cause', 'The nonprofit gets a concourse table, a videoboard feature and an on-field thank-you for its volunteers.'],
  ],

  experiences: [
    { t: 'Ceremonial First Pitch', img: 'img/x-firstpitch.jpg', ast: 'hp4syzrjmuapd6rqnooi', d: 'Send one member of your group to the mound to throw out a ceremonial first pitch.', min: 300 },
    { t: 'Kids Run the Bases', img: 'img/x-runbases.jpg', ast: U('1508802493048-bf55245a557b'), d: 'After select games, the kids in your group run the bases at Daikin Park.', min: 50 },
    { t: 'Batting Practice View', img: 'img/x-bp.jpg', d: 'Watch the Astros take batting practice from the warning track before gates open.', min: 100 },
    { t: 'Dugout Team Photo', img: 'img/x-teamphoto.jpg', ast: U('1686256894418-3ff8fc2b34b3'), d: 'A team photo on the field in front of the Astros dugout before the game.', min: 50 },
    { t: 'Play Ball Kid', img: 'img/x-playball.jpg', ast: 'dfmdpoemaosah6onyyne', d: 'One lucky kid shouts “Play Ball!” over the ballpark speakers to start the game.', min: 150 },
    { t: 'On-Field Recognition', img: 'img/x-recognition.jpg', ast: 'afci5akriafr2yow7xys', d: 'Honor a state champion, a graduating class or your volunteers on the field before first pitch.', min: 150 },
    { t: 'National Anthem', img: 'img/p-anthem.jpg', ast: 'cfljz7vlizwhosno7ruc', d: 'A choir, school ensemble or soloist leads the ballpark in the national anthem.', min: 100 },
    { t: 'Plaza Performance', img: 'img/p-mariachi.jpg', ast: U('1600466892203-d84aae0aa4c1'), d: 'Mariachi, folklórico, dance teams and bands perform on the plaza as gates open.', min: 75 },
    { t: 'Drumline Pregame', img: 'img/p-band.jpg', ast: U('1616382519098-57806dfc551a'), d: 'School bands and drumlines bring the energy at the gates before first pitch.', min: 100 },
  ],

  next: ['Automated, personal outreach', 'A tailored pitch for each community', 'Designs and templates', 'The final group website'],

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
    ['People forming a heart with their hands', 'group-of-people-forming-a-heart-shape-with-hands-iLNFyRK3Q3A'],
    ['Drumline', 'people-playing-drum-on-orange-concrete-floor-during-daytime-YPnu0_V5Ttk'],
  ],
};
