---
title: Download der erforderlichen Software
search:
  keywords:
    - Erstinbetriebnahme
    - Software
    - Raspberry Pi
    - Docker
    - Thunderbird
    - Grundlagen
---

# Download der erforderlichen Software

Nachdem die **Grundinstallation von Raspberry Pi OS (Raspbian)** abgeschlossen ist, m&uuml;ssen weitere Softwarepakete
installiert werden, um den Betrieb des Einsatzmonitors vorzubereiten.

---

## 1. System aktualisieren

Zun&auml;chst sollte das System auf den aktuellen Stand gebracht werden.

1. Terminal &ouml;ffnen
2. Folgenden Befehl ausf&uuml;hren:
   ```bash
   sudo apt update && sudo apt upgrade
   ```
3. Eingabe des Passworts des aktuellen Benutzers best&auml;tigen

---

## 2. Installation zus&auml;tzlicher Software (GUI)

&Uuml;ber die grafische Oberfl&auml;che k&ouml;nnen weitere Programme installiert werden.

1. **Startmen&uuml; → Add / Remove Software**
2. Nach folgenden Programmen suchen und installieren:
    - **Thunderbird**
    - **Thunderbird – Deutsche Sprache**

Thunderbird wird sp&auml;ter f&uuml;r den automatischen Empfang und Ausdruck der Alarm-Faxe verwendet.

---

## 3. Installation von Docker und Docker Compose

F&uuml;r den Betrieb der Web-Anwendung wird **Docker** ben&ouml;tigt.

Bitte folgen Sie der offiziellen Installationsanleitung von Docker f&uuml;r Raspberry Pi OS:

https://docs.docker.com/engine/install/raspberry-pi-os

Diese Anleitung enth&auml;lt auch die Schritte zur Installation von **Docker Compose**.

---

## 4. Systemverwaltung mit Webmin (optional)

Zur vereinfachten Verwaltung des Systems wird die Nutzung von **Webmin** empfohlen.

Installationsanleitung:
https://webmin.com/download/

Webmin erm&ouml;glicht unter anderem:

- System&uuml;berwachung
- Benutzerverwaltung
- Netzwerk- und Dienstekonfiguration &uuml;ber das Webinterface

---

## 5. Installation eines Editors (optional)

Als Editor f&uuml;r Konfigurations- und Textdateien wird **Visual Studio Code** empfohlen.

1. Passende **`.deb`-Datei** herunterladen:
   https://code.visualstudio.com/download
2. Installation &uuml;ber das Paketmanagement oder per Doppelklick

Alternativ k&ouml;nnen auch andere Editoren wie `nano` oder `vim` verwendet werden.

---

## Hinweis

Nach Abschluss dieser Schritte ist das System bereit f&uuml;r die **Installation und Konfiguration der
Einsatzmonitor-Software**.
