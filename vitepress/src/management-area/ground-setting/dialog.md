---
title: Grundeinstellung
search:
  keywords:
    - Grundeinstellung
    - Dialog
    - Einstellungen
    - Konfiguration
    - Formular
    - UUID
    - Dashboard
---

# Dialog Grundeinstellung

![Dialog der Grundeinstellung](/img/Ground-Setting/011-Ground-Setting-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende Eintr&auml;ge **bearbeitet** oder – sofern
freigegeben –
**neu angelegt** werden k&ouml;nnen.

Je nach Eintrag sind einzelne Felder schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **name** (Name)
- **value** (Wert)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### Name

Der **Name** wird intern verwendet, um die jeweilige Einstellung eindeutig zu identifizieren und den zugeh&ouml;rigen
Wert im
Dashboard auszulesen.

Hier kann ein **einfacher String** eingegeben werden.

---

### Wert

Der **Wert** bestimmt das Verhalten der Anwendung bzw. die Darstellung im Dashboard.

Je nach Einstellung kann der Wert unterschiedliche Typen annehmen, zum Beispiel:

- **Boolescher Wert** → `true` / `false`  
  *(z. B. Anzeigen oder Ausblenden eines Elements)*
- **Numerischer Wert** → Zahl  
  *(z. B. Standard-Zoomstufe der Einsatzkarte)*
- **String** → Text  
  *(z. B. Bezeichnungen oder einfache Inhalte)*

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur Beschreibung oder Dokumentation der jeweiligen Einstellung hinterlegt
werden.

---

### Erstellt am

Dieses Feld wird beim Anlegen des Eintrags automatisch von der Datenbank gesetzt und ist daher **deaktiviert**.

---

### Letzte Bearbeitung

Sobald ein Datensatz ge&auml;ndert wird, setzt die Datenbank automatisch Datum und Uhrzeit der letzten Bearbeitung.  
Auch dieses Feld ist **deaktiviert** und nicht editierbar.

---

## L&ouml;schen von Eintr&auml;gen

Das L&ouml;schen von Eintr&auml;gen ist grunds&auml;tzlich m&ouml;glich, jedoch eingeschr&auml;nkt:

#### **Einzelnes L&ouml;schen**

  ![&uuml;bersicht der Grundeinstellung](/img/Ground-Setting/013-Ground-Setting-Dialog-Delete.png)
  Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

#### **Mehrfaches &ouml;schen**

  ![&uuml;bersicht der Grundeinstellung](/img/Ground-Setting/014-Ground-Setting-Dialog-Delete-More.png)
  &Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Eintr&auml;ge gleichzeitig ausgew&auml;hlt und
  gel&ouml;scht werden.

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb der Anwendung sicherzustellen.
