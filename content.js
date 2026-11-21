// All page copy lives here. Edit text and the page rebuilds itself.
// `ast` is an Astros photo id on img.mlbstatic.com or a full Unsplash URL; it loads over the local `img` file, which stays as the fallback.
const U = id => `https://images.unsplash.com/photo-${id}?w=1200&q=75&fm=jpg&fit=crop`;
window.SITE = {
  // Bump this every night after adding the team's changes.
  draft: { n: 2, date: 'November 21, 2026' },

  hero: {
    kicker: 'Group tickets at Daikin Park',
    title: ['Bring Your Group', 'to Daikin Park'],
    text: 'Any group, any size. From 20 friends to 7,000 people, plan a day at the ballpark your group will remember.',
    img: 'img/hero.jpg', ast: 'j0rvq1nf0d3dkhoo1pnp',
  },

  // Sections on the page, in order. These are the parts we agreed the site must have.
  sections: [
    { id: 'day', nav: 'A Day at the Park' },
    { id: 'every', nav: 'For Every Group' },
    { id: 'tiers', nav: 'Tiers & Pricing' },
    { id: 'seating', nav: 'Seating' },
    { id: 'schedule', nav: 'Schedule' },
    { id: 'contact', nav: 'Contact' },
  ],

  day: [
    ['Arrive together', 'Meet your group at historic Union Station, the ballpark’s front door.', 'img/c-union.jpg'],
    ['Get welcomed', 'Your group’s name on the videoboard. To confirm.', 'img/x-videoboard.jpg'],
    ['Play ball', 'Your whole group seated together for first pitch.', 'img/x-lineup.jpg'],
    ['Make it yours', 'Add a moment on the field, from a team photo to a first pitch.', 'img/x-firstpitch.jpg'],
    ['Take it home', 'Photos and memories from a day at the ballpark.', 'img/skyline.jpg'],
  ],

  // Options any group can use. Placeholders for the team to build out.
  every: [
    { t: 'Celebrate', d: 'Birthdays, graduations, milestones and wins, recognized at the ballpark. Details coming soon.', img: 'img/x-recognition.jpg' },
    { t: 'Fundraise', d: 'Raise money for your group with every ticket sold through your own link. Details coming soon.', img: 'img/k-diamond.jpg' },
    { t: 'Learn', d: 'Theme days that turn a game into a field trip. Details coming soon.', img: 'img/n-stem.jpg' },
    { t: 'Give back', d: 'Bring your group together around a cause. Details coming soon.', img: 'img/x-flag.jpg' },
  ],

  pricing: 'Ticket prices follow the Astros’ six game tiers, so groups can pick a date that fits their budget. Game tiers and prices: To confirm with the Astros.',

  tiers: [
    { key: 'single', name: 'Single', min: 20, blurb: 'Small groups and teams.',
      perks: ['Group pricing and seats together', 'Your own group link for easy sharing', 'Videoboard welcome'] },
    { key: 'double', name: 'Double', min: 50, blurb: 'Mid-size groups.',
      perks: ['Everything in Single', 'Group leader gift', 'Fundraising return to your group'] },
    { key: 'triple', name: 'Triple', min: 150, blurb: 'Large groups.',
      perks: ['Everything in Double', 'Pregame on-field experience', 'On-field recognition moment'] },
    { key: 'hr', name: 'Home Run', min: 300, blurb: 'Your own night at Daikin Park.',
      perks: ['Everything in Triple', 'Ceremonial first pitch', 'Autographed item for your group'] },
  ],

  seating: [
    { id: 'fieldbox', good: 'Groups who want to be close to the action' },
    { id: 'mezzanine', good: 'Mid-size groups' },
    { id: 'viewdeck', good: 'Large groups on a budget' },
    { id: 'crawfordboxes', good: 'Groups who want to catch home runs in left field' },
    { id: 'outfielddecki', good: 'Casual groups' },
    { id: 'outfielddeckii', good: 'Very large groups' },
    { id: 'bullpen', good: 'Groups who want to watch pitchers warm up' },
    { id: 'unionstation', good: 'Meeting your group before the game' },
  ],

  // 2027 season months. Theme nights get added here as the team builds them.
  schedule: ['April', 'May', 'June', 'July', 'August', 'September'],
  themeNights: [
    { t: 'History Day', d: 'A ballpark scavenger hunt and a different Astros era celebrated every inning. Date: To confirm.', img: 'img/g-train.jpg' },
    { t: 'Language Day', d: 'English and Spanish learning stations around the ballpark. Date: To confirm.', img: 'img/c-union.jpg' },
    { t: 'Science Day', d: 'The science of pitching and hitting. Date: To confirm.', img: 'img/n-stem.jpg' },
    { t: 'Kids Run Daikin', d: 'Kids shadow the announcer, broadcast booth and grounds crew. Date: To confirm.', img: 'img/x-playball.jpg' },
    { t: 'Charity Drive Night', d: 'Fans bring donations for a local cause. Date: To confirm.', img: 'img/x-table.jpg' },
    { t: 'More theme nights', d: 'Coming soon.', img: 'img/k-insperity.jpg' },
  ],

  formFields: ['Your name', 'Organization', 'Type of group', 'Group size', 'Preferred date or theme night', 'Email', 'Phone'],

  contact: [
    ['Astros Group Sales', 'Questions about group tickets. Email and phone: To add from the Astros.'],
  ],

  experiences: [
    { t: 'Ceremonial First Pitch', img: 'img/x-firstpitch.jpg', ast: 'hp4syzrjmuapd6rqnooi', d: 'Send one member of your group to the mound to throw out a ceremonial first pitch.', min: 300 },
    { t: 'Kids Run the Bases', img: 'img/x-runbases.jpg', ast: U('1508802493048-bf55245a557b'), d: 'After select games, the kids in your group run the bases at Daikin Park.', min: 50 },
    { t: 'Dugout Team Photo', img: 'img/x-teamphoto.jpg', ast: U('1686256894418-3ff8fc2b34b3'), d: 'A team photo on the field in front of the Astros dugout before the game.', min: 50 },
    { t: 'Play Ball Kid', img: 'img/x-playball.jpg', ast: 'dfmdpoemaosah6onyyne', d: 'One lucky kid shouts “Play Ball!” over the ballpark speakers to start the game.', min: 150 },
    { t: 'On-Field Recognition', img: 'img/x-recognition.jpg', ast: 'afci5akriafr2yow7xys', d: 'Honor a champion team, a graduating class or your volunteers on the field before first pitch.', min: 150 },
    { t: 'National Anthem', img: 'img/p-anthem.jpg', ast: 'cfljz7vlizwhosno7ruc', d: 'A singer or ensemble from your group leads the ballpark in the national anthem.', min: 100 },
  ],

  // Unsplash photos (Unsplash License), shown on the Photo Credits page.
  unsplash: [
    ['Boy running for the next base', 'boy-hit-the-ball-running-for-the-next-base-XoAUPASBOdc'],
    ['Three young baseball players', 'three-young-baseball-players-standing-on-a-baseball-field-bhFvRV_1uR8'],
  ],
};
