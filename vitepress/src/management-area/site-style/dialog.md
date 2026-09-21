---
title: Seite Style
search:
  keywords:
    - Seite
    - Style
    - CSS
    - Design
    - Darstellung
---

# Dialog Darstellung CSS

![Dialog Darstellung CSS](/img/Site-Style/051-Site-Style-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende **Darstellungen (CSS)** bearbeitet oder –
sofern
freigegeben – neu angelegt werden k&ouml;nnen.

Einzelne Felder sind schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **name** (Name)
- **description** (Beschreibung)
- **htmlStyle** (Style / Inline-CSS)
- **htmlClass** (CSS-Klassen, z. B. Tailwind)
- **sorting** (Sortierung)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### Name

Der **Name** wird intern verwendet, um die jeweilige Darstellung eindeutig zu identifizieren und den zugeh&ouml;rigen
Stil im
Dashboard auszulesen.

Hier kann ein **einfacher String** eingegeben werden.

---

### Beschreibung

Die **Beschreibung** dient dazu, verst&auml;ndlich zu dokumentieren, um welches Element bzw. welchen Bereich der
Anwendung es
sich handelt.

---

### Style / Inline-CSS

In diesem Feld k&ouml;nnen **Inline-CSS-Styles** angegeben werden, zum Beispiel:

```css
font-size:

3
rem

;
color: red

;
```

---

### CSS-Klassen (z. B. Tailwind)

In diesem Feld k&ouml;nnen **CSS-Klassen**, z. B. aus **Tailwind CSS**, angegeben werden, um das Design anzupassen.

Beispiele:

- `mt-1`
- `pl-1`
- `text-center`
- `text-sm`

---

### Sortierung

&Uuml;ber die **Sortierung** kann festgelegt werden, in welcher Reihenfolge die Styles angewendet oder angezeigt werden.

Es kann ein **numerischer Wert** eingegeben werden.  
Die Sortierung erfolgt **aufsteigend** (beginnend bei `0`).

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur zus&auml;tzlichen Beschreibung oder internen Dokumentation der
Darstellung
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

## L&ouml;schen von Darstellungen (CSS)

Das L&ouml;schen von Darstellungen (CSS) ist grunds&auml;tzlich m&ouml;glich, jedoch eingeschr&auml;nkt.

### Einzelnes L&ouml;schen

![L&ouml;schdialog Darstellungen (CSS)](/img/Site-Style/053-Site-Style-Dialog-Delete.png)

Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

---

### Mehrfaches L&ouml;schen

![L&ouml;schdialog Darstellungen (CSS) Mehrfach](/img/Site-Style/054-Site-Style-Dialog-Delete-more.png)

&Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Darstellungen (CSS) gleichzeitig ausgew&auml;hlt
und gel&ouml;scht
werden.

---

### <Badge type="warning" text="Hinweis" />

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb der Anwendung sicherzustellen.
