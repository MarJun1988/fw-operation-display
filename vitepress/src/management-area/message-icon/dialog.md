---
title: Mitteilungsicon
search:
  keywords:
    - Mitteilungsicon
    - Icon
    - Dialog
    - Symbole
---

# Dialog Mitteilungsicon

![Dialog Mitteilungsicon](/img/Message-Icon/041-Message-Icon-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende Mitteilungsicons **bearbeitet** oder – sofern
freigegeben – **neu angelegt** werden k&ouml;nnen.

Einzelne Felder sind schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **name** (Bezeichnung)
- **path** (Dateipfad)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### Bezeichnung

Hier kann eine kurze und aussagekr&auml;ftige **Bezeichnung** f&uuml;r das Icon festgelegt werden.

Es kann ein **einfacher String** eingegeben werden.

---

### Dateipfad

Der **Dateipfad** enth&auml;lt den Speicherort des Icons.  
Dieser kann entweder auf einen **lokalen Pfad auf dem Server** oder auf eine **externe URL** verweisen.

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur zus&auml;tzlichen Beschreibung oder internen Dokumentation des Icons
hinterlegt werden.

---

### Erstellt am

Dieses Feld wird beim Anlegen des Eintrags automatisch von der Datenbank gesetzt und ist daher **deaktiviert**.

---

### Letzte Bearbeitung

Sobald eine &Auml;nderung am Datensatz vorgenommen wird, setzt die Datenbank automatisch Datum und Uhrzeit der letzten
Bearbeitung.  
Auch dieses Feld ist **deaktiviert** und nicht editierbar.

---

## L&ouml;schen von Mitteilungsicons

Das L&ouml;schen von Mitteilungsicons ist grunds&auml;tzlich m&ouml;glich.

### Einzelnes L&ouml;schen

![L&ouml;schdialog Mitteilungsicon](/img/Message-Icon/043-Message-Icon-Dialog-Delete.png)

Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

---

### Mehrfaches L&ouml;schen

![L&ouml;schdialog Mitteilungsicon Mehrfach](/img/Message-Icon/044-Message-Icon-Dialog-Delete-more.png)

&Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Mitteilungsicons gleichzeitig ausgew&auml;hlt
und gel&ouml;scht
werden.

---

### <Badge type="warning" text="Hinweis" />

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb der Anwendung sicherzustellen.
