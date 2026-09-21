---
title: Vorwort
search:
  keywords:
    - Vorwort
    - Anforderungen
    - Software
    - Hardware
    - Einsatzmonitor
    - Feuerwehr
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Einsatzmonitor Feuerwehr"
  text: "Der Einsatzmonitor ist ein webbasiertes Einsatz- und Informationsdashboard f&uuml;r Feuerwehren."
  actions:
    - theme: brand
---

## Was ist diese Web-Anwendung?

Der **Einsatzmonitor Feuerwehr** ist eine webbasierte Anwendung zur Anzeige von Einsatz- und Zusatzinformationen in
Feuerwehrh&auml;usern.

Die Anwendung ist speziell f&uuml;r den Einsatz in **Freiwilligen Feuerwehren** konzipiert und richtet sich an
Standorte, an
denen das **R&uuml;ckmeldesystem &uuml;ber Divera** genutzt wird.

Ziel der Anwendung ist es, alle relevanten Informationen zu einer Alarmierung **&uuml;bersichtlich, zentral und in
Echtzeit**
auf einem Bildschirm darzustellen.

---

## Anforderungen an Hardware und Software

### Hardware

Es bestehen **keine hohen Anforderungen an die Hardware**.  
Die Web-Anwendung nutzt ein **Docker-Container-System**, um alle Dienste und Services voneinander zu trennen und stabil
zu betreiben.

In der Praxis l&auml;uft der Einsatzmonitor erfolgreich auf:

- **Raspberry Pi 4** mit **8 GB RAM**

F&uuml;r eine optimale Darstellung wird empfohlen:

- ein **TV- oder Monitorger&auml;t**
- **Mindestgr&ouml;ße:** ca. **40 Zoll**
- **Aufl&ouml;sung:** **1920 × 1080 Pixel (Full HD)**

---

### Software

Die Einsatzdaten werden von einer separaten Software bereitgestellt, die auf einem **Windows-System** l&auml;uft und
die *
*BOS-Daten eines Funkmeldeempf&auml;ngers** verarbeitet.

Zus&auml;tzlich bietet der Einsatzmonitor eine **API**, &uuml;ber die Einsatzdaten:

- empfangen
- verarbeitet
- und angezeigt

werden k&ouml;nnen.

Dadurch ist es m&ouml;glich, neben Divera auch **weitere Datenquellen oder Schnittstellen** in das System einzubinden.
