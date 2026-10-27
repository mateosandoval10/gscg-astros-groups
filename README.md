# Astros Group Tickets · GSCG concept

A concept group-sales site for the Houston Astros, built by the Gonzaga Sport Consulting Group (Fall 2026).
The layout follows the Cleveland Cavaliers' group tickets page, retold for the Astros, inside an MLB-style
Astros shell. It is a student prototype: not an official Astros or MLB page, hidden from search engines,
and the forms don't send or store anything.

Live: https://mateosandoval10.github.io/gscg-astros-groups/

## Pages
- `#/` Group Tickets & Experiences: hero, group benefits, group tiers (Single / Double / Triple / Home Run),
  fan experiences, specialty group nights (filter by community), performances, corporate & hospitality,
  Community Advantage, interactive group seating map, premium clubs, special offers, team, request form, FAQ
- `#/hub` Group Leader Hub: how it works, sample group page with tier progress, copy-ready messages, timeline
- `#/seating-map` Full interactive seating map (illustrative geometry, not to scale)
- `#/tickets` and `#/tickets/<slug>` Every "Inside Astros Tickets" item, each with a group angle and a link to astros.com
- `#/credits` Photo credits
- `v1/` The earlier tab-per-community demo

## Editing
All copy lives in `content.js`. Add an experience or a night by adding an object to the matching list;
images go in `img/`. The seating map is generated in `map.js`.

Photos: Wikimedia Commons (see `img/credits.json` and the Photo Credits page).
