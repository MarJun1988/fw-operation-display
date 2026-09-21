---
title: Alarmierung
search:
  keywords:
    - Alarmierung
    - Alarmierungsdialog
    - Incoming Alert
    - RIC
    - Alarmtext
    - Funkmeldeempf&auml;nger
    - Einsatz
---

# Dialog Alarmierung

![Dialog der Alarmierung](/img/Incoming-Alert/021-Incoming-Alert-Dialog-New.png)

Der Dialog stellt die Eingabemaske zur Verf&uuml;gung, mit der bestehende Alarmierungen **bearbeitet** oder – sofern
freigegeben – **neu angelegt** werden k&ouml;nnen.

Einzelne Felder sind schreibgesch&uuml;tzt, da diese automatisch durch die Datenbank verwaltet werden.

---

## Eingabefelder

Folgende Eingabefelder stehen im Dialog zur Verf&uuml;gung:

- **id** (UUID)
- **address** (RIC-Adresse)
- **text** (Alarmtext)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

### UUID

Die **UUID** wird automatisch von der Datenbank generiert.  
Dieses Feld ist daher **deaktiviert** und kann nicht manuell ver&auml;ndert werden.

---

### RIC-Adresse

In diesem Feld wird die **RIC-Adresse** der Alarmierung gespeichert.  
Diese dient unter anderem dazu, zuk&uuml;nftig weitere Aktionen oder Automatisierungen auszul&ouml;sen.

Es kann entweder ein **einfacher String** oder ein **numerischer Wert** eingegeben werden.

---

### Alarmtext

Der **Alarmtext** enth&auml;lt den originalen Text, der vom Funkmeldeempf&auml;nger &uuml;bertragen wird.  
Damit die Alarmierung korrekt verarbeitet werden kann, **muss dieses Format zwingend eingehalten werden**:

```text
{Nummer IRLS} {Stichwort kurz}/{Stichwort lang}/{Ort-Gemeinde} {Straße mit Hausnummer}/{Objekt bzw. Geb&auml;ude}/{Person bzw. Patient}/{Alarmtext}/{Alarmzeit}
```

Abweichungen von diesem Format k&ouml;nnen dazu f&uuml;hren, dass Inhalte nicht korrekt erkannt oder dargestellt werden.

---

### Kommentar

Im Feld **Kommentar** kann ein freier Text zur zus&auml;tzlichen Beschreibung oder internen Dokumentation der
Alarmierung
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

## L&ouml;schen von Alarmierungen

Das L&ouml;schen von Alarmierungen ist grunds&auml;tzlich m&ouml;glich.

### Einzelnes L&ouml;schen

![L&ouml;schdialog Alarmierung](/img/Incoming-Alert/023-Incoming-Alert-Dialog-Delete.png)

Ein einzelner Eintrag kann direkt &uuml;ber die entsprechende Aktion gel&ouml;scht werden.

---

### Mehrfaches L&ouml;schen

![L&ouml;schdialog Alarmierung Mehrfach](/img/Incoming-Alert/024-Incoming-Alert-Dialog-Delete-more.png)

&Uuml;ber die **Checkboxen in der Tabellenansicht** k&ouml;nnen mehrere Alarmierungen gleichzeitig ausgew&auml;hlt und
gel&ouml;scht werden.

---

### <Badge type="warning" text="Hinweis" />

> ⚠️ Hinweis: Je nach Eintragstyp und Systemrelevanz kann das L&ouml;schen eingeschr&auml;nkt oder deaktiviert sein, um
> den
> stabilen Betrieb der Anwendung sicherzustellen.
