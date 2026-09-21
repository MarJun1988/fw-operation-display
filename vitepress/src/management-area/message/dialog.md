---
title: Mitteilungen
search:
  keywords:
    - Mitteilungen
    - Meldungen
    - Dialog
    - Hinweise
---

# Dialog Mitteilungen

![Dialog Mitteilungen](/img/Message/031-Message-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende Mitteilungen **bearbeitet** oder – sofern
freigegeben – **neu angelegt** werden k&ouml;nnen.

Einzelne Felder sind schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **headline** (&Uuml;berschrift)
- **message** (Mitteilung)
- **iconId** (ID des Icons)
- **icon** (Icon-Objekt)
- **icon.path** (Icon-Vorschau)
- **sorting** (Sortierung)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### &Uuml;berschrift

Hier kann eine kurze und aussagekr&auml;ftige **&Uuml;berschrift** f&uuml;r die Mitteilung festgelegt werden.

Es kann ein **einfacher String** eingegeben werden.

---

### Mitteilung

Die **Mitteilung** enth&auml;lt den eigentlichen, wichtigen Informationstext,  
z. B. Hinweise zu Straßensperrungen, Verkehrsf&uuml;hrungen oder besonderen Ereignissen.

---

### Icon

Hier wird das **Icon** f&uuml;r die Mitteilung ausgew&auml;hlt.  
Es stehen zahlreiche, an die **StVO** angelehnte Symbole zur Verf&uuml;gung, um die Mitteilung visuell zu
unterst&uuml;tzen.

---

### Sortierung

&Uuml;ber die **Sortierung** wird festgelegt, in welcher Reihenfolge die Mitteilungen im Dashboard angezeigt werden.

Die Sortierung erfolgt **aufsteigend**, beginnend bei `0`.

Es kann ein **numerischer Wert** eingegeben werden.

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur zus&auml;tzlichen Beschreibung oder internen Dokumentation der Mitteilung
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

## L&ouml;schen von Mitteilungen

Das L&ouml;schen von Mitteilungen ist grunds&auml;tzlich m&ouml;glich.

### Einzelnes L&ouml;schen

![L&ouml;schdialog Mitteilung](/img/Message/033-Message-Dialog-Delete.png)

Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

---

### Mehrfaches L&ouml;schen

![L&ouml;schdialog Mitteilung Mehrfach](/img/Message/034-Message-Dialog-Delete-more.png)

&Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Mitteilungen gleichzeitig ausgew&auml;hlt und
gel&ouml;scht werden.

---

### <Badge type="warning" text="Hinweis" />

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb der Anwendung sicherzustellen.
