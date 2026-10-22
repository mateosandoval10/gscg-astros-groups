/*
 * All page content lives here. One entry per community tab.
 * Fields marked draft: true show a small "Draft" tag in Strategy notes mode.
 * Feature media types: { img: 'img/x.jpg' } | { chart: [...] } | { jersey: true }
 */
window.SITE = {
  contact: { phone: '(713) 259-8030', email: 'groupsales@astros.com', address: 'Daikin Park · 501 Crawford St, Houston, TX' },

  home: {
    eyebrow: 'Group Outings at Daikin Park',
    title: 'Find your group’s night at <span>Daikin Park.</span>',
    sub: 'Every community is different. Pick yours to see an outing designed around the people you bring.',
  },

  benefits: [
    ['users', 'Sit together', 'Reserved sections for groups of 20+'],
    ['tag', 'Group pricing', 'Discounted rate, no service fees'],
    ['screen', 'Be recognized', 'Your group’s name on the videoboard'],
    ['chat', 'A rep who knows you', 'One contact who plans everything with you'],
  ],

  demos: [
    {
      id: 'church', tab: 'Church Groups', short: 'Fellowship beyond Sunday',
      hero: 'img/hero-church.jpg',
      eyebrow: 'Faith & Family Night · Group Outings',
      title: 'Bring your congregation <span>together at Daikin Park.</span>',
      sub: 'Fellowship, family and a shared meal before first pitch, for youth groups, ministries and entire congregations.',
      tagline: '',
      pkg: { name: 'Church Family Feast Night', items: ['Reserved congregation section', 'Pre-game fellowship meal', 'Early access to the ballpark', 'Welcome on the videoboard'] },
      intro: { h: 'More than a game. A night of fellowship.', p: 'Ideas built for how churches gather: around food, family and giving back.' },
      features: [
        { tag: 'Fellowship', title: 'A pre-game Family Feast', lead: 'A shared meal for your congregation before the game, so the night starts together, not at the turnstile.', bullets: ['Private pre-game meal space for your group', 'Early ballpark access before gates open', 'Seating together in a reserved section'], media: { img: 'img/f-crowd.jpg' } },
        { tag: 'Youth ministry', title: 'Youth Group Night', lead: 'An outing youth pastors can plan in minutes, a new alternative to the usual theme park or ice-skating trip.', bullets: ['Turnkey flyer and sign-up link for youth pastors', 'Discounted youth tickets with chaperone seats', 'On-field group photo'], media: { img: 'img/f-field.jpg' } },
      ],
      vp: { draft: true, statement: 'For Houston churches looking for fellowship beyond Sunday, an Astros game offers what a church barbecue can’t: a shared meal, the whole congregation seated together, and a big-league night their members will remember.', audience: 'Congregations, youth pastors and ministry leaders across Houston', problem: 'Churches want fellowship and family outings but have to organize them on their own', offer: 'Family Feast Night, youth nights and a ready-made package', value: 'Members get a memorable shared night; the Astros reach thousands of fans through one relationship' },
      message: { to: 'Youth & Family Ministry', subject: 'A Faith & Family Night built for [Church Name]', body: 'Hi [First Name], we’d love to host [Church Name] at Daikin Park this season. Our Faith & Family Night includes a pre-game fellowship meal, a reserved section for your congregation and a welcome on the videoboard. Can we save a section for you?' },
      channels: ['Youth pastors & ministry leaders', 'Diocese and denominational networks', 'Megachurch event calendars'],
    },
    {
      id: 'hispanic', tab: 'Hispanic Community', short: 'Tu comunidad. Tu equipo.',
      hero: 'img/hero-hispanic.jpg',
      eyebrow: 'Hispanic Heritage Night · Group Outings',
      title: 'Celebrate your community at <span>Daikin Park.</span>',
      sub: 'Bring your church, school, nonprofit or family to a night built around Houston’s Hispanic community, with Spanish-language game coverage, an exclusive heritage jersey and flavors from home.',
      tagline: 'Celebra con tu comunidad. ¡Te esperamos!',
      pkg: { name: 'Hispanic Heritage Night', items: ['Reserved group seating', 'Exclusive heritage jersey', 'Ballpark food voucher', 'Welcome on the videoboard'] },
      intro: { h: 'A night that feels like home, from first pitch to final out.', p: 'Three things that make Heritage Night different from any other outing in Houston.' },
      features: [
        { tag: 'En español', title: 'The game, called in Spanish', lead: 'Spanish-language announcers in the ballpark and on the videoboard all night, so every generation can follow the game in the language they love.', bullets: ['Player introductions and key moments in Spanish', 'Personalized group welcomes on the videoboard', 'Bilingual social content before and after the game'], media: { img: 'img/f-crowd.jpg', chart: { title: 'Media reach by game type', note: 'Illustrative · indexed to a standard game', rows: [['Standard game', 28, '1.0×'], ['Theme night', 42, '1.5×'], ['Heritage night', 64, '2.3×'], ['+ Spanish broadcast', 92, '3.3×', true]] } } },
        { tag: 'Orgullo', title: 'An exclusive heritage jersey', lead: 'Every Heritage Night group ticket includes a limited-edition “Los Astros” jersey, available only to those in the stands.', bullets: ['Included with every group package ticket', 'New design each season, so groups come back', 'On-field group photo in your jerseys'], media: { jersey: true }, proof: '<b>Proven model:</b> the San Diego Padres’ Mexican Heritage Celebration packages included a limited-edition themed jersey. They drew strong demand, and the jerseys became collectibles that still resell online.' },
      ],
      foods: { tag: 'Sabores de Houston', h: 'Flavors from home, at a group price.', items: [['img/food-churros.jpg', 'Churros', 'Fresh, with cinnamon sugar', '$3'], ['img/food-elote.jpg', 'Elote', 'Street-style, chile and lime', '$4'], ['img/food-tacos.jpg', 'Street Tacos', 'Al pastor or chicken', '$6'], ['img/food-agua.jpg', 'Aguas Frescas', 'Horchata, jamaica, tamarindo', '$3']] },
      vp: { draft: true, statement: 'Houston’s Hispanic community brings a deeper sense of inclusivity and pride to Daikin Park. By celebrating culture and investing in the next generation, the Astros build a lasting relationship with Houston’s Latino families, and give them a night that feels like home.', audience: 'Latino families and Hispanic-serving schools, churches and nonprofits', problem: 'Heritage is celebrated one weekend a year; families want affordable, family-centered outings', offer: 'Spanish broadcast, heritage jersey, food bundle, bilingual rep', value: 'Families feel seen and celebrated; the Astros gain group sales and lifelong fans' },
      message: { to: 'Community Partner', subject: 'Hispanic Heritage Night: una noche para [Organization]', body: 'Hola [First Name], we’d love to welcome [Organization] to Hispanic Heritage Night at Daikin Park. Your group package includes reserved seats, an exclusive “Los Astros” jersey and a food voucher, plus the game called in Spanish. ¿Te apartamos una sección?' },
      channels: ['Hispanic-serving nonprofits & schools', 'Bilingual Houston creators', 'Spanish-language social & radio'],
    },
    {
      id: 'youth', tab: 'Youth Sports', short: 'Celebrated like the pros',
      hero: 'img/hero-youth.jpg',
      eyebrow: 'Youth Sports Night · Group Outings',
      title: 'Your team, <span>celebrated like the pros.</span>',
      sub: 'Bring your club, league or school team in uniform for a night where young athletes are recognized on a big-league stage.',
      tagline: '',
      pkg: { name: 'Youth Sports Night', items: ['Teams seated together in uniform', 'Recognition on the videoboard', 'Batting practice viewing', 'Team merchandise offer'] },
      intro: { h: 'Built for teams, families and coaches.', p: 'Moments young athletes will remember long after the season ends.' },
      features: [
        { tag: 'Recognition', title: 'Every team on the big screen', lead: 'Teams wear their game-day uniforms and get a shout-out on the videoboard, the way the pros do.', bullets: ['Videoboard recognition for every team', 'On-field parade or photo for champions', 'Certificates for players'], media: { img: 'img/f-field.jpg' } },
        { tag: 'Behind the scenes', title: 'Closer to the game', lead: 'Pre-game access that turns a ballgame into a once-in-a-season memory.', bullets: ['Watch batting practice from the field level', 'Meet a coach or alumnus', 'Tournament-weekend group pricing for traveling teams'], media: { img: 'img/f-night.jpg' } },
      ],
      vp: { draft: true, statement: 'Youth sports are the future of baseball in Houston. When the Astros celebrate young athletes, kids feel supported by the players they look up to, and their families keep coming back to support a team that supports them.', audience: 'Club, league and school teams, plus their families and coaches', problem: 'Young athletes want to be recognized; traveling teams need an outing between games', offer: 'Youth Sports Night, recognition, behind-the-scenes access, tournament pricing', value: 'Kids get a big-league moment; the Astros build fans for life' },
      message: { to: 'Coach / League Director', subject: 'Youth Sports Night: celebrate [Team Name] at Daikin Park', body: 'Hi Coach [Last Name], we’d love to celebrate [Team Name] at Youth Sports Night. Your players sit together in uniform, get recognized on the videoboard and watch batting practice from field level. Want us to hold seats for your team and families?' },
      channels: ['League & club directors', 'Tournament organizers', 'Coaches’ associations'],
    },
    {
      id: 'schools', tab: 'Schools', short: 'A field trip they’ll never forget',
      hero: 'img/hero-schools.jpg',
      eyebrow: 'Education Day · Group Outings',
      title: 'A field trip they’ll <span>talk about all year.</span>',
      sub: 'Weekday day games, learning built in and student recognition, for classes, grades and whole campuses.',
      tagline: '',
      pkg: { name: 'Education Day', items: ['Weekday day game', 'Pre-game STEM presentation', 'Student recognition on the videoboard', 'Teacher & chaperone seats'] },
      intro: { h: 'Learning, recognition and a day at the ballpark.', p: 'Ideas that make it easy for principals and teachers to say yes.' },
      features: [
        { tag: 'Learning', title: 'STEM before first pitch', lead: 'A short, curriculum-friendly presentation on the science and math of baseball before the game.', bullets: ['Lesson materials for teachers', 'Ballpark tour add-on', 'Designed around school calendars'], media: { img: 'img/f-exterior.jpg' } },
        { tag: 'Celebration', title: 'Graduation & Scholarship Nights', lead: 'Celebrate graduating classes and scholarship winners with reserved school sections and on-field recognition.', bullets: ['Class of [Year] Night each spring', 'Reserved sections by school', 'Recognition for scholarship recipients'], media: { img: 'img/f-opening.jpg' } },
      ],
      vp: { draft: true, statement: 'For Houston-area schools looking for meaningful outings, an Astros game delivers learning, student recognition and a world-class ballpark experience in one easy, affordable day.', audience: 'Principals, teachers, coaches and PTO/PTA leaders', problem: 'Schools need outings with educational value that are simple to approve', offer: 'Education Day, STEM presentation, graduation nights, recognition', value: 'Students get a memorable, educational day; the Astros reach whole school communities' },
      message: { to: 'Principal / PTA', subject: 'Education Day at Daikin Park for [School Name]', body: 'Hi [First Name], Education Day brings [School Name] to a weekday Astros game with a pre-game STEM presentation, student recognition on the videoboard and seats for teachers and chaperones. Would a spring date work for your campus?' },
      channels: ['Principals & district offices', 'PTO/PTA councils', 'Teacher newsletters'],
    },
    {
      id: 'nonprofits', tab: 'Nonprofits', short: 'Give back, together',
      hero: 'img/hero-nonprofits.jpg',
      eyebrow: 'Nonprofit Night · Group Outings',
      title: 'Thank your volunteers. <span>Share your mission.</span>',
      sub: 'A night at Daikin Park that celebrates your people, raises awareness for your cause and can raise funds too.',
      tagline: '',
      pkg: { name: 'Nonprofit Night', items: ['Group seating for volunteers & families', 'Fundraising ticket link', 'Concourse table to share your mission', 'Recognition on the videoboard'] },
      intro: { h: 'Built for mission-driven organizations.', p: 'Ways to thank your community and grow it at the same time.' },
      features: [
        { tag: 'Fundraising', title: 'Every ticket gives back', lead: 'Share a custom ticket link, and a portion of every ticket sold returns to your organization.', bullets: ['Custom link for your supporters', 'Share of each ticket to your cause', 'No upfront cost'], media: { img: 'img/f-skyline.jpg' } },
        { tag: 'Visibility', title: 'Nonprofit of the Night', lead: 'Put your mission in front of the ballpark with a concourse table and an on-screen feature.', bullets: ['Concourse table for your team', 'Feature on the videoboard', 'Volunteer appreciation seating'], media: { img: 'img/f-crowd.jpg' } },
      ],
      vp: { draft: true, statement: 'The Astros give Houston nonprofits a major platform to spread awareness, raise funds and celebrate the people behind their mission, with an affordable night at the ballpark for every member.', audience: 'Executive and development directors, volunteer leaders', problem: 'Tight budgets and a constant fight for visibility and donor dollars', offer: 'Fundraising tickets, Nonprofit of the Night, concourse table, recognition', value: 'Nonprofits gain funds and awareness; the Astros deepen community impact and group sales' },
      message: { to: 'Executive Director', subject: 'Nonprofit Night: raise funds for [Organization] at Daikin Park', body: 'Hi [First Name], Nonprofit Night lets [Organization] bring volunteers and families to an Astros game while raising money: a portion of every ticket sold through your link goes back to your mission. Can we set up your custom link?' },
      channels: ['United Way partner network', 'Nonprofit executive directors', 'Volunteer coordinators'],
    },
  ],
};
