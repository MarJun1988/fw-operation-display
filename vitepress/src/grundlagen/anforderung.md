---
title: Anforderungen an Software und Nutzung
search:
  keywords:
    - Anforderungen
    - Betriebssystem
    - Linux
    - Unix
    - Hardware
    - Software
    - Grundlagen
---

# Anforderungen an Hardware und Software

Dieser Abschnitt beschreibt die grundlegenden Anforderungen f&uuml;r den Betrieb des Einsatzmonitors und ist der
Kategorie *
*Grundlagen** zugeordnet.

---

## Hardware

Es bestehen **keine besonderen Anforderungen an die Hardware**.

Die Web-Anwendung nutzt ein **Docker-Container-System**, um alle Dienste und Services sauber voneinander zu trennen und
stabil zu betreiben.

Der Einsatzmonitor l&auml;uft in der Praxis unter anderem auf:

- **Raspberry Pi 4** mit **8 GB RAM**

F&uuml;r eine optimale Darstellung wird empfohlen:

- ein **TV- oder Monitorger&auml;t**
- **Mindest-Bildschirmdiagonale:** ca. **40 Zoll**
- **Aufl&ouml;sung:** **1920 × 1080 Pixel (Full HD)**

---

## Software

Die Einsatzdaten werden von einer separaten Software bereitgestellt, die auf einem **externen Windows-System**
l&auml;uft.  
Diese Software verarbeitet die **BOS-Daten eines Funkmeldeempf&auml;ngers** und stellt sie f&uuml;r den Einsatzmonitor
bereit.

Zus&auml;tzlich bietet die Web-Anwendung eine **API**, &uuml;ber die Einsatzdaten:

- empfangen
- verarbeitet
- und angezeigt

werden k&ouml;nnen.

Dadurch ist es m&ouml;glich, neben der beschriebenen Windows-Software auch **weitere Schnittstellen oder Datenquellen**
in
das System einzubinden.
