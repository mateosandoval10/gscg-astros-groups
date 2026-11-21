// All page copy lives here. Edit text, add ideas, nights or experiences, and the page rebuilds itself.
// `ast` is an Astros photo id on img.mlbstatic.com (from astros.com pages) or a full Unsplash URL.
// It loads over the local `img` file, which stays as the fallback.
const U = id => `https://images.unsplash.com/photo-${id}?w=1200&q=75&fm=jpg&fit=crop`;
window.SITE = {
  // Bump this every night after adding the team's changes.
  draft: { n: 1, date: 'November 21, 2026' },

  hero: {
    kicker: 'Group tickets at Daikin Park',
    title: ['Bring Your Group', 'to Daikin Park'],
    text: 'Schools, churches, teams, nonprofits, companies and families. From a youth team of 20 to a whole school district, plan a day at the ballpark your group will remember.',
    img: 'img/hero.jpg', ast: 'j0rvq1nf0d3dkhoo1pnp',
  },

  // Sections on the page, in order. These are the parts we agreed the site must have.
  sections: [
    { id: 'day', nav: 'A Day at the Park' },
    { id: 'tiers', nav: 'Tiers & Pricing' },
    { id: 'seating', nav: 'Seating' },
    { id: 'nights', nav: 'Theme Nights' },
    { id: 'start', nav: 'Get Started' },
    { id: 'contact', nav: 'Contact' },
  ],

  day: [
    ['Arrive together', 'Meet your group at historic Union Station, the ballpark’s front door.', 'img/c-union.jpg'],
    ['Get welcomed', 'Your group’s name on the videoboard. To confirm.', 'img/x-videoboard.jpg'],
    ['Play ball', 'Your whole group seated together for first pitch.', 'img/x-lineup.jpg'],
    ['Make it yours', 'Add a moment on the field, from a team photo to a first pitch.', 'img/x-firstpitch.jpg'],
    ['Take it home', 'Photos and memories from a day at the ballpark.', 'img/skyline.jpg'],
  ],

  pricing: 'Ticket prices follow the Astros’ six game tiers, so groups can pick a date that fits their budget. Game tiers and prices: To confirm with the Astros.',

  seating: [
    { id: 'fieldbox', good: 'Groups who want to be close to the action' },
    { id: 'mezzanine', good: 'Mid-size groups' },
    { id: 'viewdeck', good: 'Large school and church groups on a budget' },
    { id: 'crawfordboxes', good: 'Groups who want to catch home runs in left field' },
    { id: 'outfielddecki', good: 'Casual groups and teams' },
    { id: 'outfielddeckii', good: 'Very large groups' },
    { id: 'bullpen', good: 'Groups who want to watch pitchers warm up' },
    { id: 'unionstation', good: 'Meeting your group before the game' },
  ],

  formFields: ['Your name', 'Organization', 'Group type', 'Group size', 'Preferred date or theme night', 'Email', 'Phone', 'Preferred language'],

  contact: [
    ['Astros Group Sales', 'Questions about group tickets. Email and phone: To add from the Astros.'],
    ['Grupos en Español', 'Group planning in Spanish, including WhatsApp. To confirm.'],
  ],

  communities: { faith: 'Church Groups', hispanic: 'Hispanic Community', youth: 'Youth Sports', schools: 'Schools', nonprofits: 'Nonprofits' },


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
