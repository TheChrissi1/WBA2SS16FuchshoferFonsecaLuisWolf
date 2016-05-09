**Spezifikation der HTTP Verben und ihrer Semantik**

| Ressource | Methode | Semantik | content-type (req) | content-type (res) |                                                        
| ---------------------- | ------ | ----------------------------------------------------------------------------------- | --------------- | --------------- |
| /anime                 | GET    | Gibt eine Liste sämtlicher Animes der DB aus.                                       | - | - |
| /anime/{name}          | GET    | Gibt einen bestehenden Anime mit all seinen Informationen aus.                      | - | - |
|                        | DELETE | Löscht einen bestehenden Anime.                                                     | - | - |
|                        | POST   | Erstellt einen neuen Anime.                                                         | - | - |
|                        | PUT    | Aktuallisiert einen bestehenden Anime.                                              | - | - |
| /benutzer              | GET    | Gibt sämmtliche bestehenden Nutzernamen (Alias) als Liste aus.                      | - | - |
| /benutzer/{id}         | GET    | Zeigt das Profil eines bestehenden Nutzers an.                                      | - | - |
|                        | DELETE | Löscht einen bestehenden Nutzer.                                                    | - | - |
|                        | POST   | Erstellt einen neuen Nutzer.                                                        | - | - |
|                        | PUT    | Ändert die Daten eines bestehenden Nutzers.                                         | - | - |
| /genre                 | GET    | Gibt eine Liste aller Genres aus (weiterleitung auf Liste mit zutreffenden Animes). | - | - |
| /ref                   | GET    | Gibt eine Liste aller referenzierenden Websites aus.                                | - | - |
| /ref/{id}              | GET    | Gibt Informationen einer referenzierenden Website aus.                              | - | - |
| /filter/{querry-param} | GET    | Gibt eine Filterung der DB anhand des Querry-Parameters aus.                        | - | - |


| /createAnime | 
| /login | 
| /anime/film |
| /anime/serie |

