# Inhaltsverzeichnis

1. [**Einleitung**](#einleitung)
1.1. [**Problemstellung**](#problemstelung)
1.2 .[**Idee**](#idee)
1.3 [.**Start des Projekts**](#start)
1.4 [.**Use Cases**](#use cases)
2. [**Dienstgeber**](#dienstgeber)
2.1 [.**Ressourcen**](#ressourcen)
2.2 [.**Verwendete Methoden**](#verwendete methoden)
2.3 [.**Anwendungslogik Dienstgeber**](#anwendungslogik dienstgeber)
3. [.**Dienstnutzer**](#dienstnutzer)
3.1 [.**Ressourcen**](#ressourcen)
3.2 [.**Datenverarbeitung**](#datenverarbeitung)
3.3 [.**Anwendungslogik Dienstnutzer**](#anwendungslogik dienstnutzer)
3.4 [.**Präsentationslogik Dienstnutzer**](#präsentationslogik dienstnutzer)
4. [.**Probleme**](#probleme)
5. [.**Statuscodes**](#statuscodes)
6. [.**Zeitbedingte Aussparungen**](#zeitbedingte aussparungen)
7. [.**Fazit**](#fazit)
8. [.**Arbeitsmatrix**](#areitsmatrix)


# Einleitung
### Problemstellung

Fabian ist 19 Jahre alt und liebt es Serien zu schauen. Vorallem mag er Animes! Die in Japan produzierten "Zeichentrickserien" schaut er sich vorallem gerne in Originalsprache an und nutzt dabei die vielen Angebote von Anime-Fans in Deutschland die diese nach Release in Japan mit deutschem oder englischem Untertitel versehen. Allerdings hat Fabian das Problem das es so viele Seiten im Internet gibt auf denen auch nicht immer das gleiche Angebot herrscht. So muss er auf verschiedenen Seiten immer erst schauen, ob der neue Anime von dem er gehört hat, dort auch angeboten wird. Außerdem kommt er bei der Vielzahl an Serien die er schon gesehen hat oft durcheinander, und er weis nicht mehr bei welcher Folge er bei seinen aktuell laufenden Animes gerade ist.

### Idee

Um Fabians Probleme zu lösen wäre es perfekt wenn es eine Möglichkeit geben würde seinen aktuellen Serienstatus abzufragen und Informationen zu bekommen, wo welche Serie verfügbar ist.

### Start des Projekts

Um das Problem zu lösen haben wir uns verschiedene Anforderungen überlegt um ein besseres Gefühl dafür zu bekommen, was im fertigen Produkt an Funktionen benötigt wird:
Das System..
* ..muss die Möglichkeit haben, Informationen über Serien zu präsentieren.
* ..muss die Möglichkeit haben, Informationen über bereits gesehene Serien und Folgen einer Serie zu präsentieren.
* ..muss die Möglichkeit haben, Informationen bereit zustellen, auf welcher Website eine Serie zum ansehen angeboten wird.
* ..sollte die Möglichkeit haben neue User hinzuzufügen.
* ..sollte die Möglichkeit haben User zu aktualisieren.
* ..sollte die Möglichkeit haben User zu löschen.
* ..sollte die Möglichkeit haben neue Serien hinzuzufügen.
* ..sollte die Möglichkeit haben bestehende Serien zu aktualisieren.
* ..sollte die Möglichkeit haben bestehende Serien zu löschen.


Die spezifizierten Anforderungen haben wir 1:1 als Funktionen für unser System übernommen und weitergehend in den Ressourcen übernommen.


### Use Cases

##### Use Case 1:

###### Ein neues Profil anlegen um seine Statistik zu speichern.

Fabian ist 19 Jahre alt und liebt es Serien zu schauen. Vor allem mag er Animes! Doch leider verliert er meist den Überblick bei welche Episode er gerade ist, weil er so viele Animes gleichzeitig schaut. Deswegen empfiehlt Ihm ein Freund AnStat. Dort meldet Fabian sich mit seinen Profildaten an und es werden automatisch von der Website seine persönliche Statistik erstellt. Diese kann er nun individuell verändern, so dass er seinen aktuellen Episoden-Status zu jedem angesehenen Anime abfragen kann.

##### Use Case 2:

###### Alle Animes auf einen Blick.

Fabian möchte sich nach einiger Zeit aber auch für neue Animes anzeigen lassen. Dafür kann er ganz einfach auf der Website sich alle Animes die in der Datenbank sind ausgeben lassen. In dem er auf einen Anime draufklickt bekommt er weitere Informationen zu diesem Anime und kann somit entscheiden ob dieser seinem Geschmack trifft.

##### Use Case 3:

###### Animes nach Gerne sortiert.

Eines Tages hat Fabian lust auf einen Anime mit viel Action. Doch er hat keine Lust sich durch alle Animes zu wühlen und dort nach dem Genre Action zu suchen. Da fragt er seinen Freund wie er das macht. Dieser sagt ihm, dass wenn er auf Gerne klickt, er dort auswählen kann, was er gerne schauen möchte und schon werden alle Animes des bestimmten Gerne angezeigt.



# Dienstgeber
### Ressourcen
 Unsere Überlegungen ergaben das es 3 wesentliche Hauptentitäten gibt die wiederum in "Unterentitäten" unterteilt werden können:

**Anime:**


Ein Anime gibt Informationen über eine Animeserie aus und wird durch folgende Attribute beschrieben:
* Name: Der allgemeine Name der Serie.
* Name_En: Der Name der Serie im englischen.
* Name_De: Der Name der Serie in Deutschland.
* Episoden: Anzahl der bisher erschienen Episoden.
* Release_Jp: Der Release der ersten Folge in Japan.
* Release_En: Der Release der ersten Folge in Amerika für lizensierte Serien).
* Release_De: Der Release der ersten Folge in Deutschland (für lizensierte Serien).
* Lizenz: Ist die Serie in Deutschland Lizensiert worden? (yes/no).
* Status: Ist die Serie abgeschlossen? (finished/running/canceled).
* Dub: In welcher Audiosprache ist der Anime verfügbar.
* Sub: In welcher Untertitelsprache ist der Anime verfügbar.
* License: Für welches Land ist der Anime lizensiert.
* Ref: Auf welcher Seite ist der Anime verfügbar.
* Checked: Wurde der Anime von einem Mod/Admin auf seine Validität überprüft (checked/unchecked).

**User:**
Ein User enthält Informationen über einen registrierten Benutzer des Webservices und wird durch folgende Attribute beschrieben:
* ID: Jeder registrierte User bekommt eine eindeutige ID zugewiesen durch die er identifiziert werden kann.
* Name: Der Vorname des registrierten Benutzers.
* Lastname: Der Nachname des registrierten Benutzers.
* Username: Der Aliasname (Benutzername) unter dem der User sich bewegt.
* Authority: Um welchen Benutzertyp es sich handelt (Admin: 1 | Mod: 2 | User: 3).
* E-Mail: Die bei der Registrierung benutzten E-Mail Adresse.
* Gender: Das bei der Registrierung angegebene Geschlecht (optional).
* Birthdate: Das Gebrutsdatum des registrierten Benutzers.
* Active: Ob dieser Benutzer noch aktiv ist (weitere Informaionen unter Probleme "Benutzer ID nach DELETE nicht mehr kontinuierlich").

**Statistik:**
Eine Statistik wird für jeden registrierten User automatisch angelegt und mit der Zeit aktuallisiert.
Initialstatistik (wird beim anlegen eines neuen Users erzeugt):
* ID: Die ID des Users wird als eindeutiger Identifier genutzt
* Gesehene Animes: Als Information wird hier die Anzahl der bisher seit der Registrierung gesehenen Serien angezeigt
* Gesehene Folgen: Die Summe aller gesehenen Folgen von allen gesehenen Serien seit der Registrierung

Weiterführende Statistik:
Beim beginn eines neuen Anime wird ein neuer Eintrag vorgenommen und im Verlauf des "schauens" aktuallisiert.
* Anime_Name: Die Serie die vom User angeschaut wird
* Anime_Folgen: Bisher erschienene Folgen der Serie
* Gesehene_Folgen: Bisher gesehene Folgen der Serie
* Status: Fortschritt des Users bei der Serie (finished/running)

Unterentitäten:



Beim Anlegen der Ressourcen sind wir der Frage nachgegangen was für den Benutzer wichtig und relevant ist. Die Ressourcennamen sollten einfach sein und möglichst sprechende Namen haben. Numerische Bezeichnungen als Ressourcennamen sollten vermieden werden um bessere Übersichtlichkeit zu garantieren. Dabei sind wir auf folgende Ergebnisse gestoßen:


| Ressource              | Methode | Semantik                                                                            | content-type (req) | content-type (res) |
| ---------------------- | ------- | ----------------------------------------------------------------------------------- | ------------------ | ------------------ |
| /                      | GET     | Gibt eine Nachricht in Textform aus.                                                | -                  | -                  |
| /anime                 | GET     | Gibt eine Liste sämtlicher Animes der Datenbank (Redis) aus.                        | -                  | application/json   |
|                        | PUT     | Erstellt einen neuen Anime.                                                         | application/json   | application/json   |
| /anime/{name}          | GET     | Gibt einen bestehenden Anime mit all seinen Informationen aus.                      | -                  | application/json   |
|                        | DELETE  | Löscht einen bestehenden Anime.                                                     | -                  | -                  |
|                        | PUT     | Erstellt einen neuen Anime.                                                         | application/json   | application/json   |
|                        | PUT     | Aktuallisiert einen bestehenden Anime.                                              | application/json   | application/json   |
| /user                  | GET     | Gibt sämmtliche bestehenden Nutzernamen (Alias) als Liste aus.                      | -                  | application/json   |
|                        | PUT     | Erstellt einen neuen Nutzer.                                                        | application/json   | application/json   |
| /user/{uID}            | GET     | Zeigt das Profil eines bestehenden Nutzers an.                                      | -                  | application/json   |
|                        | DELETE  | Löscht einen bestehenden Nutzer.                                                    | -                  | -                  |
|                        | PUT     | Ändert die Daten eines bestehenden Nutzers.                                         | application/json   | application/json   |
| /user/{uID}/stats      | GET     | Zeigt eine Liste aller angesehenen Folgen.                                          | -                  | application/json   |
|                        | PUT     | Aktuallisiert die Statistik eines Benutzers.                                        | application/json   | application/json   |
| /user/{uID}/stats      | GET     | Zeigt eine Liste aller angesehenen Folgen.                                          | -                  | application/json   |
| /user/{uID}/stats/{name} | GET     | Zeigt eine Liste aller angesehenen Folgen.                                        | -                  | application/json   |
| /genre                 | GET     | Gibt eine Liste aller Genres aus (weiterleitung auf Liste mit zutreffenden Animes). | -                  | application/json   |
| /ref                   | GET     | Gibt eine Liste aller referenzierenden Websites aus.                                | -                  | application/json   |
| /ref/{name}            | GET     | Gibt Informationen einer referenzierenden Website aus.                              | -                  | application/json   |
| /registration/{name}   | GET     | Gibt einen Statuscode zurück, wenn ein Username vergeben bzw. frei ist.             | -                  | -                  |
| /signup                | PUT     | Regestriert einen neuen Benutzernamen.                                              | application/json   | application/json   |
| /login                 | PUT     | Loggt einen Benutzer ein.                                                           | application/json   | application/json   |


### Verwendete Methoden


**GET:** - Liefert eine Repräsentation einer Ressource. Diese ist sicher und idempotent.

**PUT:** - Erzeugt eine neue Ressource auf dem Server. Diese ist aber m Gegensatz zur POST-Methode nicht angewiesen die übertragene Datei an ein Script zu übergeben, sondern vielmehr die Datei die übergeben wird, an der benannten Stelle zu plazieren.

**DELETE:** - Entfernt eine Ressource auf dem Server. Dise Methode ist ebenfalls idempotent. Wird ein DELETE erfolgreich durchgeführt ist die Ressource nicht mehr abrufbar.

Dabei haben wir die HTTP-Methode "GET", als Möglichkeit zur Datenabfrage, "PUT" zum anlegen neuer Datensätze oder zum verändern dieser, und "DELETE" zum entfernen von alten, nicht mehr gebrauchten oder unerwünschten Datensätzen verwendet. "POST" als weitere Möglichkeit zum anlegen von Datensätzen haben wir vernachlässigt, da wir die Kontrolle behalten wollen, welche URI der neuen Ressource zugewiesen wird. Der Gedanke dahinter war der, dass z.B. eine wirre Zahlenfolge als Serienname in der URL für den Nutzer verwirrend sein könnte. Wir stellen somit also sicher, das der Benutzer auch anhand der URL kontrollieren kann in welchem Teil des verteilten Systems er sich gerade befindet. Auf Server-Seite hat es außerdem den Vorteil das wir anhand von Querry-Parametern in der URL die Datensätze filtern, und so gezielte Responses liefern können.

Viele Websites auf die wir referenzieren wollen nutzen ein ähnliches System, womit wir auch einfacher prüfen können ob eine Serie auf einer Website verfügbar ist.

### Anwendungslogik Dienstgeber

* **Hinzufügen von einem neuen Benutzern** - Der Redis-Datenbank wird ein neuer Benutzer mit den oben aufgeführten Attributen hinzugefügt. Sobald ein neuer Benutzer der Datenbank hinzugefügt wird, erstellt das Sytem zusätzlich einen neuen Eintrag in der Datenbank mit der dazugehörigen Statistik. Die allerdings am Anfang noch leer ist, da der Benutzer gerade erst erstellt wurde und somit noch nichts in seiner Statistik (Watchlist) eingetragen sein kann.

* **Ändern der Informationen eines bestehenden Benutzern** - Falls sich die Informationen eines bestehenden Benutzers geändert haben, kann man dies auch für die jeweiligen Attribute in der Datenbank anpassen, damit diese wieder auf dem korrekt Stand sind.

* **Löschen eines bestehenden Benutzers** - Wenn ein Nutzer das System nicht mehr verwenden möchte kann dieser aus der Datenbank geöscht werden, damit wir aber keine Lücken in der UserID der Datenbank haben (nähere Informationen unter Probleme) haben wir uns dazu entschieden den Benutzer nicht komplett zu löschen sonder diesen "nur" auf inaktiv zu setzen. Somit ist zu einem späteren Zeitpunkt eine Reaktivierung des Benutzers möglich.

* **Hinzufügen von einem neuen Anime** - Der Redis-Datenbank wird ein neuer Anime mit den oben aufgeführten Attributen hinzugefügt.

* **Ändern der Informationen eines bestehenden Animes** - Falls sich die Informationen eines bestehenden Animes geändert haben, kann man dies auch für die jeweiligen Attribute in der Datenbank anpassen, damit diese wieder auf dem korrekt Stand sind.

* **Löschen eines bestehenden Animes** - Wenn ein Anime nicht mehr im Internet zur Verfügung gestellt wird, oder wir diesen aus unserem System entfernen wollen, wird dies mit der DELETE-Methode erledigt. Der Anime wird im Gegensatz zum Benutzer aus der Datenbank entfernt und nicht auf inaktiv gesetzt. Somit ist eine Reaktivierung des Animes nicht mehr möglich, sondern der Anime muss (falls dieser wieder im Internet zur Verfügung steht) wieder neu in die Datenbank eingetragen werden.



# Dienstnutzer

## Ressourcen

Der Dienstnutzer verfügt über fast alle Ressourcen, die auch der Dienstgeber kennt. Diese werden jedoch noch um die Filterfunktion erweitert.

**Ressourcen:**

* Animes
* User
* Gerne
* Ref
* Signup
* Login
* Logout
* Addamime
* Editanime
* Edituser


**Funktionen:**

Benutzer-Related:

* Benutzerprofil anlegen
* Benutzerprofil verändern
* Benutzerprofil löschen
* Benutzerprofil von sich oder von anderen ansehen

Anime-Related:

* Animes hinzufügen
* Animes verändern
* Animes löschen
* Alle Animes ansehen
* Bestimmten Anime ansehen
* Nach Animes filtern

Gernre-Related:

* Gerne ansehen

Referenz-Related

* Refernezen ansehen


| Ressource              | Methode | Semantik                                                                            | content-type (req) | content-type (res) |
| ---------------------- | ------- | ----------------------------------------------------------------------------------- | ------------------ | ------------------ |
| /                      | GET     | Gibt die Startseite des Servers aus.                                                | -                  | application/json   |
| /anime                 | GET     | Gibt eine Liste sämtlicher Animes der DB aus.                                       | -                  | application/json   |
|                        | PUT     | Erstellt einen neuen Anime.                                                         | application/json   | application/json   |
| /anime/{name}          | GET     | Gibt einen bestehenden Anime mit all seinen Informationen aus.                      | -                  | application/json   |
|                        | PUT     | Bearbeitet einen bestehenden Anime.                                                 | application/json   | application/json   |
|                        | DELETE  | Löscht einen bestehenden Anime.                                                     | -                  | -                  |
| /anime/filter/{querry-param} | GET     | Gibt eine Filterung der DB anhand des Querry-Parameters aus.                  | -                  | -                  |
| /user                  | GET     | Gibt sämmtliche bestehenden Nutzernamen (Alias) als Liste aus.                      | -                  | application/json   |
|                        | PUT     | Erstellt einen neuen Nutzer.                                                        | application/json   | application/json   |
| /user/{uID}            | GET     | Zeigt das Profil eines bestehenden Nutzers an.                                      | -                  | application/json   |
|                        | PUT     | Ändert die Daten eines bestehenden Nutzers.                                         | application/json   | application/json   |
|                        | DELETE  | Löscht einen bestehenden Nutzer.                                                    | -                  | -                  |
| /user/{uID}/stats      | GET     | Zeigt eine Liste aller angesehenen Folgen.                                          | -                  | application/json   |
|                        | PUT     | Aktuallisiert die Statistik eines Benutzers.                                        | application/json   | application/json   |
| /genre                 | GET     | Gibt eine Liste aller Genres aus (weiterleitung auf Liste mit zutreffenden Animes). | -                  | application/json   |
| /ref                   | GET     | Gibt eine Liste aller referenzierenden Websites aus.                                | -                  | application/json   |
| /signup                | GET     | Gibt ein Regestrierungsformular für einen neuen Benutzer aus.                       | -                  | application/json   |
|                        | PUT     | Fügt einen neuen Benutzer über das Regestrierungsformular hinzu.                    | application/json   | application/json   |
| /signup/{username}     | GET     | Schaut ob der Benutzername schon vorhanden bzw. frei ist.                           | -                  | application/json   |
| /login                 | GET     | Gibt eine Anmeldemakse für den Benutzer aus.                                        | -                  | application/json   |
|                        | PUT     | Loggt einen Benutzer im System ein (Cookies zuweisung).                             | application/json   | application/json   |
| /logout                | GET     | Meldet den User vom System ab.                                                      | -                  | application/json   |
| /addanime              | GET     | Gibt das Formular zum hinzufügen von neuen Animes aus.                              | -                  | application/json   |
| /editanime/{name}      | GET     | Gibt das Formular zum editieren von bestehenden Animes aus.                         | -                  | application/json   |
| /edituser/{id}         | GET     | Gibt das Formular zum editieren von bestehenden Benutzer aus.                       | -                  | application/json   |



### Datenverarbeitung

Da wir uns gedacht haben das XML in vielen Fällen (wie bei uns) nicht immer der ideale Weg ist um Daten zu struktieren haben wir uns auf JSON geeinigt. Ein wichtiger Grund war, dass durch das Tag-System von XML oft kleine Datenbestände aufgebläht und sehr unübersichtlich dargestellt werden. Zusäztlich dazu ist das Ansprechen der einzelnen Konten (XML-Nodes) meist mit sehr großen Komplikationen verbunden. Daher haben wir uns für die Alternative JSON (JavaScript Object Notation) fokusiert. JSON ist bekannt dafür um Daten auf eine einfache und strukturierte Weise Daten übersichtlich darzustellen. Auch hat JSON sich mittlerweile in viele weiteren Programmiersprachen durchgsetzt.

Der große Vorteil von JSON im Vergleich zu XML liegt aber in der einfachen Handhabung. Denn JSON stellt selbst ein gültiges JavaScript dar und kann direkt ausgeführt werden. Somit besteht die Möglichkeit dies direkt in ein JavaScript-Objekt zu überführen. Der Zugriff auf die einzelnen Eigenschaften kann dann über normalen Attributzugriff geschehen.


Für Redis haben wir uns letztendlich entschieden, da dies eine In-Memory-Datenbank ist die man über einfach Schlüssel-Werte-Datenstruktur ansprechen kann. Da wir keine komplexen Datenstrukturen in unserem System abbilden wollen reicht Redis für unsere Verwendung vollkommen aus. Des Weiteren ist hier der Vorteil, dass Redis wesentlich schneller ist als eine realationale Datenbank. Hier sind sis zu ca. 100.000 Schreibvorgänge und ca. 80.000 Lesevorgänge pro Sekunde auf herkömmlicher Hardware möglich.



### Anwendungslogik Dienstnutzer

* **Anwenden von Filteroptionen** - Wenn der Benutzer nach bestimmten Kriterien filtern möchte, hat er die Möglichkeit dies mit der Hilfe von verschiedenen Filteroptionen zu machen. Falls dieser sich nicht die Liste aller Animes anzeigen lassen möchte, sondern nach bestimmten Kriterien sucht, kann er dies mit Hilfe der Inputfelder erledigen. Hierzu kann der Benutzer nach Episode, Genre und Name filter. Wobei die Episodenfilterung nochmals aufgeteilt in "Exact Episodes" und "Min/Max Episodes". Wenn der Benutzer die Option "Exact Episodes" auswählt, werden nur Animes ausgegeben die die selbe Anzahl an Episoden hat wie im Filter eingegeben. Bei der Option "Min/Max Episoden" kann man einen Bereich angeben. Hierbei werden dann die Animes ausgegeben, deren Episodenanzahl innerhalb des zuvor im Filter festgelegten Bereich liegt.

* **Login eines Benutzers** - Wenn der Benutzer sich seine Statistik anzeigen lassen möchte, kann er dies machen, in dem er sich in das System einloggt. Vorher muss er sich allerdings über das Regestrierungsformular am System regestrieren. Danach hat er die Möglichkeit sich seine persöhnliche Statistik (Watchlist) anzeigen zu lassen.

* **Logout eines Benutzers** - Wenn der Benutzer sich zur Zeit seine persönliche Statistik nicht mehr ausgeben möchte, oder sich möglicherweise ein anderer Benutzer über den selben Browser anmelden möchte, muss der Benutzer sich zuvor von System abmelden. Dies kann der über die Logout-Funktion ``/logout`` machen. Hier werden dann die aktuellen Cookies der Website im Browser gelöscht, so dass sich der Benutzer erneut oder ein anderer Benutzer anmelden kann.


### Präsentationslogik Dienstnutzer

Die Präsentationslogik, welche zur Drastellung der Informationen von Benutzern, Animes, Referenzen und Genres verwendet und mit ihren Interaktionsmöglichkeiten implementiert, wurde mittels diverser Frameworks umgesetzt. Für das Dedsign, Styling und Layout unseres System wurde das Fronted-Framework Bootstrap verwendet. Seiteninformationen, die dynamisch verändert werden, wurden mittels der Template-Engine "EJS" dargestellt. Hier haben wir uns auf "EJS" geeirigt da dieses im Workshop vorgestellt wurde und ebenfalls passent für unsere Bedürfnisse war.

Alle wichtigen Funktionen haben wir mit Hilfe einer Menüleiste im Template eingebaut. So das der Benutzer diese nicht über einen Link anwählen muss, sondern eine optische Darstellung der Funktionen hat.

Die Vorschläge von Animes die der Benutzer bekommt haben wir auf den der Animes ausgegeben. Da wird dies für die sinnvollste Lösung empfanden.

## Probleme

* **Server Abstürze bei zu vielen Request** - Nach der Implemientierung des Dienstnutzers und den Formularen zur Eingabe der neuen Nutzer und Animes hatten wir das Problem, dass der Server des Dienstnutzers nach einigen Requests die ERROR-Meldung "Unexpected end of input" bekamen. Durch vielfaches debuggen fanden wir heraus, dass der Fehler beim Dienstgeber lag. Da dieser nach einigen Requests das JSON nicht mehr korrekt an den Dienstnutzer übergab, sondern hier nur noch das letze Zeichen (in userem Fall ein "}") an den Dienstnutzer übergab. Diesen Fehler haben wir beseitigt, in dem wir im Dienstgebener anstatt des send()-Befehls denn end()-Befehl verwendeten. Dadruch wird vom Dienstgeber sichergestellt, das die Response rechtmäßig beendet wird und somit nicht während des sendens der Response schon eine neue Anfrage geschickt eingeht.

**Vorher:**

```
var exReq = http.request(options, function(exRes){
  res.status(exRes.statusCode).type('json').send();
  res.end();
});
```
**Nachher:**

```
var exReq = http.request(options, function(exRes){
  res.status(exRes.statusCode).type('json').end();
});
```

* **Benutzer ID nach DELETE nicht mehr kontinuierlich** - Wenn ein Benutzer in der Datenbank (Redis) entfernt wird, werden seine Informationen zwar gelöscht, allerdings wird die UserID nicht dekrementiert, so dass wenn ein neuer User hinzugefügt wird dieser die nachfolgende UserID des letzten hinzugefügten Benutzers bekommt. Der Bentzuer bekommt also nciht die UserID des gelöschten Benutzers, wo hier theoretisch "ein freier Platz" für den neuen User entstanden ist. Somit ist die Durchgänigkeit der UserID nach einem DELETE nicht mehr gegeben. In unserem Fall haben wir das Problem so gelöst, das wir die Benutzer mit einem zusätzlichem Attribut ausgestattet haben. Dieses Attribut nennt sich "Active". Hier wird festgelegt ob der Benutzer noch aktiv ist. Ist der Benutzer also inaktiv, sprich würde man in aus dem System entfernen wollen, so setzen wir dieses Attribut auf "false", so dass der Benutzer zwar noch in der Liste vorhanden ist, aber nicht mehr relevant für das System ist. Somit wird kein Benutzer aus der Liste gelöscht und die kontinuietät der Benutzer IDs in der Liste bleibst weiterhin bestehend.

* **Anime Vorschläge asynchron abrufen** - Am Anfang unseres Projektes haben wir uns mit den wissenschaftlichen Mitarbeiter zusammen überlegt, dass wir dem Benutzer Vorschläge ausgeben wollen, anhand von Animes die andere Benutzer auch gesehen haben. Im späteren Verlauf haben wir beschlossen, dass diese Vorschlagsliste bei jedem herunterfahren des Server entleert wird, da so die Vorschläge die der Benutzer bekommt sich nur auf die aktuelle Server Sitzung bezieht und somit stehts aktuell ist. Diese Liste wollten wir durch einen asynchronen Aufruf ausgeben lassen, so das nicht jedes mal neu ein Request gesendet werden muss. Leider ist uns dies mit Hilfe von AJAX nicht gelungen. Deswegen haben wir ein Objekt erstellt in dem die Animes hinzugefügt werden und diese dann mit Hilfe der "Render-Methode" von EJS mit auf den Animeseiten ausgeben.

## Statuscodes

An Hand dieses Codes wird dem Client mitgeteilt, ob die Anfrage erfolgreich bearbeitet werden konnte oder falls nicht, welcher Fehler aufgetreten ist.
Wir haben uns darauf geeinigt das wir in unserem Projekt zur Zustandskommunikation HTTP Statuscodes verwenden.
Hier eine Übersicht der Statscodes die in unserem System zum Einsatz kommen und für welche Abfragen wir diese verwenden:


| Vorfall                                                | Statuscode                 | Semantik                                                                                                       |
| ------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Erfolgreiches Abrufen einer Repräsentation durch GET   | 200 - OK                   | Die Anfrage wurde erfolgreich bearbeitet und das Ergebnis der Anfrage wird in der Antwort übertragen.              |
| Erfolgreiches Ändern einer Ressource durch PUT         | 200 - OK                   | Die Anfrage wurde erfolgreich bearbeitet und das Ergebnis der Anfrage wird in der Antwort übertragen.              |
| Erfolgreiches Anlegen einer Ressource durch PUT        | 201 - CREATED              | Die Anfrage wurde erfolgreich bearbeitet. Die angeforderte Ressource wurde vor dem Senden der Antwort erstellt.    |
| Erfolgreiches Zugriff einer Ressource durch PUT        | 204 - NO CONTENT           | Die Anfrage wurde erfolgreich durchgeführt, die Antwort enthält jedoch bewusst keine Daten.                        |
| Unautorisierter Zugriff aud eine Ressource durch PUT   | 401 - UNAZTHORIZED         | Die Anfrage kann nicht ohne gültige Authentifizierung durchgeführt werden.                                         |
| Fehlerhafter Zugriff aud eine Ressource durch GET      | 404 - NOT FOUND            | Die angeforderte Ressource wurde nicht gefunden.                                                                   |
| Fehlerhafter Zugriff aud eine Ressource durch PUT      | 404 - NOT FOUND            | Die angeforderte Ressource wurde nicht gefunden.                                                                   |
| Fehlerhafter Zugriff aud eine Ressource durch DELETE   | 404 - NOT FOUND            | Die angeforderte Ressource wurde nicht gefunden.                                                                   |
| Erfolgreiches löschen eines Animes durch einen DELETE  | 410 - NO CONTENT           | Die angeforderte Ressource wird nicht länger bereitgestellt und wurde dauerhaft entfernt.                          |
| Fehlerhafter Zugriff auf einen Username durch GET      | 422 - UNPROCESSABLE ENTITY | Verwendet, wenn weder die Rückgabe von Statuscode 415 noch 400 gerechtfertigt wäre, eine Verarbeitung              |
| Erfolgreiches deaktvieren einen Benutzers durch DELETE | 423 - LOCKED               | Die angeforderte Ressource ist zurzeit gesperrt.                                                                   |



## Zeitbedingte Aussparungen

* **Cover des Animes** - Für die Animes haben wir uns am Anfang unseres Projekts überlegt, dass diese jeweils noch mit einem Cover versehen werden, so dass der Benutzer auch eine bildliche Vorschau bekommt. Da das Einfügen von Bildern jedoch keine Qualitätsverbesserung nach den Bewertungskriterien der Veranstaltung herbeigeführt hätte, wurde dies ebenfalls zunächst nicht implementiert.

* **Authentifizierung von Benutzern** - Im laufe des Projektfortschrittes ist uns aufgefallen, dass Benutzer theoretisch auch Zugriff auf Methoden wie PUT und DELETE haben. Allerdings fänden wir es sinnvoller, wenn nicht alle Benutzer Animes- und insbesondere auch Benuterdaten verändern und löschen können. Deswegen haben wir jedem Benutzer Attribut "Authority" hinzugefügt. Dieses Attribut bestimmt den Benutzertyp des Benutzers (Admin: 1 | Mod: 2 | User: 3). Somit sollte sichergestellt werden, das Benutzer mit der "Authority : 3" zwar neue Animes hinzufügen können, diese aber bevor Sie freigegeben werden erst von einem Admin oder Moderator auf Ihre validät überprüft werden. Ebenfalls sollte sichergestellt werden das nur Moderatoren und Administatoren Informationen von Animes nachträglich verändert werden können.


## Fazit

**REST-Prinzipen**

Einer von vielen wichtigen Grundpfeiler der REST-Spezifikation ist CRUD, was sich dadurch äußert, dass das Beschaffen/Ändern etc. von Informationen, über die standardisierten HTTP-Befehle GET, PUT, POST und DELETE erfolgt.
Am Anfang unseres Projektes verwendeten wir zum Ändern eines Produkts innerhalb der productscollection bislang POST-Befehle. Realativ schnell wurde uns aber bewusst das dies zur Folge hatte, dass das System seber entscheidet wie es URL Objekte nennt. Dies wollte wir allesdings selber bestimmen und haben uns so also auf die PUT-Methode geeinigt. Dadurch wird die REST-Konformität weiterhin gewährleistet.

Ein weiteres wichtiges Merkmal der REST-Architektur ist, dass eindeutige Identifizieren von Ressourcen durch URIs. Dies wird bei uns insbesonders auf der Abstraktionsebenen von Ressourcen deutlich. Damit wir dieser Anforderungen der REST-Architektur gerecht werden, wurden die Ressourcen noch explizieter schon innerhalb der URI von einander differerziert (z.B.: '/user/{uID}/stats').

Auch die Anforderung der statuslosen Kommunikation haben wir in unserem Projekt mit eingebunden. Da in unserem Fall eine Statisik (Watchlist) immer nur genau einem Benutzer zugeordnet werden soll haben wir uns dazu entschieden diese nicht in einigen collections auszulagern sondern jeweils in der Datenbank in einem JSON-Format pro Benutzer abzulegen.


**Was wurde erreicht?**

Dadaurch, dass das Projekt im Team bearbeitet werden sollte, wurde hier im laufe des Entstehungsprozess wichtige Erfahrungen für den weiteren Verlauf im Studium erziehlt. Dadruch wurde die Kommunikation auf der Teamebene verbessert. Durch die gute Kommunikation im Team wurde auch die Aufgabenverteilung besser ersichtlich, so dass Meilensteine leichter erreicht wurden. Wegen der Dokumentation, die nebenher immer weiterentwickelt wurde, war jedes Mitglied des Teams immer auf einem Stand, so dass hier die Kommunikation auf einer Ebene statt fand. Dies hat uns wiederum geholfen Systemarchitektur, Schnittstellen und Datenverarbeitung individuell zu verstehen und war ein Grundbaustein für eine reibungslosen Zusammenarbeit.

Zudem konnten wir viele neue praktische Erfahrungen im Umgang mit Node.js, ejs, JQuerry und weiteren Modulen von Node erlangen. Auch wurden unsere Fähigkeiten im debuggen auf die Probegestellt. Ebenfalls haben wir auch hier neue Erfahrungen im Umgang mit Problemlösungsfindung erlangt. Auch der Umgang mit Git und dem Git-Reposetory wurde noch intensiver erprobt als dies in vorangegangenen Modulen der Fall war. Hier konnten wir unsere Ergebnisse unseren Teammitgliedern zur Verfügung stellen. Aber auch die wissenschaftlichen Mitarbeiter hatten hier immer einen guten Überblick wie der aktuelle Stand unseres Teams war und konnte somit in den Termingespächen stehts auf unsere spezfischen Fragen eigehen.

Die HTTP-Verben sind auf dem Dienstgeber (bis auf vereinzelte Unsicherheiten) nach ihrer standardisierten Semantik von uns implementiert wurden.
Ebenfalls haben wir Statuscodes an vielen Stellen zur Zustandskommunikation verwendet. Hier zu haben wir auch im Dienstgeber sowie im Dienstnutzer anhand der StatusCodes eine Ausgabe im Server getätig, so dass der Administrator des Systems ebenfalls benarichtigt wird, falls ein Fehler auftritt.


Der angestrebte Funktionsumfang, der zuvor in den Ressourcen im Dienstnutzer sowie im Dienstgeber von uns spezifiziert wurde konnte zu fast allen Teilen erreicht werden. Leider haben wir es Zeitlich nicht mehr geschafft auf Dienstnutzer Seite die Funktion "Cover des Animes" zu implementieren. Alle Use Case sind aber mit aktuellen Funktionsumfang vollständig durchführbar.

**Was wurde verfehlt?**

Wie schon in dem orherigen Abschnitten erwähnt haben wir es bedauerlicher weise nicht geschaftt alle Funktionen mangels des uns zur Verfügung stehenden Zeit vollständig zu implementieren.

Wie bei dem Problemen schon erwähnt ist es uns leider nicht gelungen die Anime-Vorschlags-Liste mit einem asynchronen Aufruf auszugeben. Somit wird wenn man einen Anime anklickt dieser der Liste hinzugefügt, doch wenn man auf den Zurück-Button im Browser klickt dieser nicht in der Liste ausgeben, da die Seite nicht neu geladen wurde, sondern die vorherige Seite aufgeruft. Aktuallisiert man aber die Seite so wird ein neuer Request gesendet und der Anime rescheint in der Liste.



## Arbeitsmatrix


Beteiligte Personen: Bastian Fuchshofer (B) Niklas Fonseca-Luis (N) Christian Wolf (C)

Im Folgenden werden die Arbeitsanteile der drei beteiligten Personen an den durchgeführten Aktivitäten in der Reihenfolge

[B: x% , N: y% , C: %z]

aufgeführt.

### Aktivitäten:

**Planung**

* Definition der Ressourcen [alle]
* Planung mögicher Anwendungslogik [alle]
* Spezifikation der REST-API [alle]
* Verfassen der Use-Cases und Exposé [alle]

**Dienstgeber**

* Implementierung von der Redis-Datenbank und dessen Funktionen [B: 0% , N: 0% , C: 100%]

**Dienstnutzer**

* Implementierung von EJS und CSS [B: 0% , N: 100% , C: 0%]
* Implementierung von JQuerry anhand von Filteroptionen [B: 100% , N: 0% , C: 0%]

**Testing | Cleanup**

* Cleanup vom Dienstgeber [alle]
* Cleanup vom Dienstnutzer [alle]
* Testing des Systems und erstellen von Testdaten [alle]

**Dokumentation**

Dokumentation von Dienstnutzer & Dienstgeber Ressourcen [alle]
Verfassen der restliche Dokumentation [alle]
