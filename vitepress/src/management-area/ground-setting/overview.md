---
title: Grundeinstellung
search:
  keywords:
    - Grundeinstellung
    - Tabellenansicht
    - &uuml;bersicht
    - Einstellungen
    - Konfiguration
    - Dashboard
    - Suche
    - Sortierung
    - Pagination
---

# &Uuml;bersicht Grundeinstellung

![&uuml;bersicht der Grundeinstellung](/img/Ground-Setting/010-Ground-Setting-Overview.png)

In der &uuml;bersicht der **Grundeinstellungen** werden alle vorhandenen Eintr&auml;ge in Form einer Tabelle
dargestellt.

In der **Aktionsspalte** auf der rechten Seite kann jeder einzelne Eintrag bearbeitet werden.  
Ein L&ouml;schen der Eintr&auml;ge ist nicht m&ouml;glich, da die meisten Einstellungen f&uuml;r den fehlerfreien
Betrieb der Anwendung notwendig sind.

---

## Spaltenauswahl

Auf der **oberen linken Seite** befindet sich ein Dropdown-Men&uuml;, &uuml;ber das festgelegt werden kann, welche
Spalten in der Tabelle angezeigt werden sollen.

Folgende Spalten stehen zur Auswahl:

- **id** (UUID)
- **name** (Name)
- **value** (Wert)
- **comment** (Kommentar)
- **createdAt** (erstellt am)
- **updatedAt** (letzte Bearbeitung)

---

## Aktionen

Im **mittleren Bereich** befinden sich zwei Schaltfl&auml;chen:

- **Neuen Eintrag hinzuf&uuml;gen** (hier derzeit deaktiviert)
- **Mehrere Eintr&auml;ge l&ouml;schen** (hier ebenfalls deaktiviert)

Diese Funktionen sind bewusst deaktiviert, da die Grundeinstellungen systemrelevant sind.

---

## Suche & Filter

Auf der **rechten Seite** steht eine **globale Suche** zur Verf&uuml;gung, mit der die gesamte Tabelle bzw. Datenbank
nach Inhalten durchsucht werden kann.

Zus&auml;tzlich ist es m&ouml;glich, f&uuml;r jede einzelne Spalte eine **spaltenspezifische Suche** zu verwenden.

---

## Sortierung

Die Tabelle kann durch Klick auf die jeweilige Spalten&uuml;berschrift **auf- oder absteigend sortiert** werden.

Eine **Mehrfachsortierung** ist ebenfalls m&ouml;glich:

- **macOS:** durch Gedr&uuml;ckthalten der `Command`-Taste
- **Windows / Linux:** durch Gedr&uuml;ckthalten der `Strg`-Taste

---

## Pagination & Anzeigeoptionen

Am **unteren Rand** der Tabelle befinden sich die Navigations- und Anzeigeelemente:

- **Links:** Auswahl der Eintr&auml;ge pro Seite  
  Verf&uuml;gbare Optionen:
    - 1
    - 5
    - 10
    - 20
    - 25
    - 50
    - 75
    - 100
    - 500
    - 1000
    - 5000

- **Mitte:** klassische Seiten-Navigation (Pagination)

- **Rechts:** Anzeige der aktuellen Eintragsanzahl, z. B.  
  *„1 bis 10 von 19 Eintr&auml;gen“*
