---
title: Grundlegender Ablauf der einzelnen Funktionen
search:
  keywords:
    - Ablauf
    - Alarmierung
    - BOS
    - Bosmon
    - FME
    - Funkmeldeempf&auml;nger
    - Divera
    - Grundlagen
---

# Grundlegender Ablauf der einzelnen Funktionen

Um das System **vollumf&auml;nglich nutzen zu k&ouml;nnen**, sollten die folgenden Abl&auml;ufe und Zusammenh&auml;nge
bekannt sein.

Der derzeit realisierte **Standardablauf** sieht wie folgt aus:

---

## Ablauf der Alarmierung

1. Die **IRLS-Leitstelle** sendet eine Alarmmeldung an die **Funkmeldeempf&auml;nger (FME)**.

2. Ein Funkmeldeempf&auml;nger im **Ger&auml;tehaus** empf&auml;ngt die Alarmmeldung.

3. Die Software **Bosmon**, die auf einem **Windows-System** l&auml;uft (aktuell ausschließlich unter Windows
   verf&uuml;gbar), wertet die Alarmmeldung aus und f&uuml;hrt folgende Schritte aus:

    1. Weiterleitung der Alarmierung an die **Divera-API**, wodurch die Alarmierung an die **Smartphone-App** der
       Einsatzkr&auml;fte gesendet wird.
    2. Weiterleitung der Alarmierung an die **Fw-Operation-Display-API**, um die Einsatzdaten auf dem **Einsatzmonitor
       im Ger&auml;tehaus** darzustellen.

4. Parallel dazu sendet die **IRLS-Leitstelle** die Alarmierung zus&auml;tzlich als **Fax** an die hinterlegte Faxnummer
   des Ger&auml;tehauses.

5. Im Ger&auml;tehaus empf&auml;ngt eine **AVM FRITZ!Box** das Alarmfax und leitet dieses automatisch per **E-Mail** an
   eine definierte E-Mail-Adresse weiter.

6. Auf dem **Raspberry Pi** l&auml;uft im Hintergrund ein E-Mail-Client (z. B. **Thunderbird**), der:
    - die eingehende E-Mail verarbeitet
    - den Fax-Anhang extrahiert
    - und die enthaltene **PDF-Datei automatisch auf dem hinterlegten Drucker ausdruckt**

---

## Zusammenfassung

Durch diesen Ablauf werden:

- digitale Alarmierungen (Dashboard & Divera)
- sowie analoge Alarmierungen (Fax-Ausdruck)

parallel verarbeitet und im Ger&auml;tehaus bereitgestellt.  
Dadurch stehen den Einsatzkr&auml;ften **alle relevanten Informationen redundant und zuverl&auml;ssig** zur
Verf&uuml;gung.
