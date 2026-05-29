---
title: Version
search:
  keywords:
    - Version
    - Dialog
    - Versionsverlauf
    - Changelog
---

# Dialog Version

![Dialog der Version](/img/Version/061-Version-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende Versionseintr&auml;ge **bearbeitet** oder –
sofern
freigegeben – **neu angelegt** werden k&ouml;nnen.

Je nach Eintrag sind einzelne Felder schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **versionNumber** (Versionsnummer)
- **description** (Beschreibung)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### Versionsnummer

Die **Versionsnummer** wird als fortlaufender Versionswert verwendet.

Es kann entweder ein **einfacher String** (z. B. `v1.2.0`) oder ein **numerischer Wert / Float** (z. B. `1.2`)
eingegeben werden.

---

### Beschreibung

Die **Beschreibung** dient dazu, kurz und verst&auml;ndlich zu dokumentieren, welche &Auml;nderungen oder Neuerungen mit
dieser
Version eingef&uuml;hrt wurden.

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur zus&auml;tzlichen Beschreibung oder internen Dokumentation der Version
hinterlegt werden.

---

### Erstellt am

Dieses Feld wird beim Anlegen des Eintrags automatisch von der Datenbank gesetzt und ist daher **deaktiviert**.

---

### Letzte Bearbeitung

Sobald ein Datensatz ge&auml;ndert wird, setzt die Datenbank automatisch Datum und Uhrzeit der letzten Bearbeitung.  
Auch dieses Feld ist **deaktiviert** und nicht editierbar.

---

## L&ouml;schen von Versionseintr&auml;gen

Das L&ouml;schen von Versionseintr&auml;gen ist grunds&auml;tzlich m&ouml;glich, jedoch eingeschr&auml;nkt.

### Einzelnes L&ouml;schen

![L&ouml;schdialog Version](/img/Version/063-Version-Dialog-Delete.png)

Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

---

### Mehrfaches L&ouml;schen

![L&ouml;schdialog Version Mehrfach](/img/Version/064-Version-Dialog-Delete-more.png)

&Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Versionseintr&auml;ge gleichzeitig
ausgew&auml;hlt und gel&ouml;scht
werden.

---

### <Badge type="warning" text="Hinweis" />

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb und die Nachvollziehbarkeit der Anwendung sicherzustellen.
