# Einstiegsprojekt - Feedback System (Frontend)
Einfache Webseite zur Darstellung der Bewertungsergebnisse. Die Daten werden von einer 
[API](https://vm.elearning.physik.uni-frankfurt.de/po-fp-rating/rating.json)
abgerufen und verarbeitet.
Dargestellt wird die Anazahl der aktuellen Bewertungen, die durschnitlliche Bewertung sowie die Liste aller Bewertungen
und ein Graph zur Darstellungen der Anzahl der Bewertungen pro Tag.

## Benutzte Frameworks/Software
- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/javascript/)
- [NodeJs http-server](https://www.npmjs.com/package/http-server)
- [jquery](https://jquery.com/)
- [jquery datatables](https://datatables.net/)
- [Chart.js](https://www.chartjs.org/)

## Installation/Initialisierung
- git clone dieses repository
- npm init
- Server starten mit 'http-server' (localhost:8080)

## Acknowledgments
Um eine Ajax CORS Anfrage zu verarbeiten wird die Anfrage über ein ein Proxy geleitet. (https://github.com/HackerYou/json-proxy)

