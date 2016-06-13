**Spezifikation der HTTP Verben und ihrer Semantik**

| Ressource                    | Methode | Semantik                                                                            | content-type (req) | content-type (res) | 
| -----------------------------| ------- | ----------------------------------------------------------------------------------- | ------------------ | ------------------ |
| /anime                       | GET     | Gibt eine Liste sämtlicher Animes der DB aus.                                       | -                  | application/json   |
|                              | PUT     | Erstellt einen neuen Anime.                                                         | application/json   | application/json   |
| /anime/{name}                | GET     | Gibt einen bestehenden Anime mit all seinen Informationen aus.                      | -                  | application/json   |
|                              | DELETE  | Löscht einen bestehenden Anime.                                                     | -                  | -                  |
|                              | PUT     | Aktuallisiert einen bestehenden Anime.                                              | application/json   | application/json   |
| /benutzer                    | GET     | Gibt sämmtliche bestehenden Nutzernamen (Alias) als Liste aus.                      | -                  | application/json   |
|                              | PUT     | Erstellt einen neuen Nutzer.                                                        | application/json   | application/json   |
| /benutzer/{uID}              | GET     | Zeigt das Profil eines bestehenden Nutzers an.                                      | -                  | application/json   |
|                              | DELETE  | Löscht einen bestehenden Nutzer.                                                    | -                  | -                  |
|                              | PUT     | Ändert die Daten eines bestehenden Nutzers.                                         | application/json   | application/json   |
| /benutzer/{uID}/stats        | GET     | Zeigt eine Liste aller angesehenen Folgen.                                          | -                  | application/json   |
|                              | PUT     | Aktuallisiert die Statistik eines Benutzers.                                        | application/json   | application/json   |
| /genre                       | GET     | Gibt eine Liste aller Genres aus (weiterleitung auf Liste mit zutreffenden Animes). | -                  | application/json   |
| /ref                         | GET     | Gibt eine Liste aller referenzierenden Websites aus.                                | -                  | application/json   |
| /anime/filter/{querry-param} | GET     | Gibt eine Filterung der DB anhand des Querry-Parameters aus.                        | -                  | -                  |


| /login |
| /anime/film |
| /anime/serie |


