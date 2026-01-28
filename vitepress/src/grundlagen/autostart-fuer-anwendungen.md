---
title: Autostart f&uuml;r Anwendungen einrichten
search:
  keywords:
    - Autostart
    - Thunderbird
    - Chromium
    - Kiosk
    - Raspberry Pi
    - Grundlagen
---

# Autostart f&uuml;r Anwendungen einrichten

In diesem Abschnitt wird beschrieben, wie Anwendungen auf dem **Raspberry Pi** automatisch beim Systemstart gestartet
werden.

Dies ist notwendig, um den **Einsatzmonitor** sowie das **E-Mail-Programm Thunderbird** ohne manuelle Eingriffe
bereitzustellen.

---

## Weiterf&uuml;hrende Informationen

Eine ausf&uuml;hrliche Anleitung zum Kiosk-Modus unter Raspberry Pi OS ist unter folgendem Link zu finden:

https://goneuland.de/raspberry-pi-chromium-kiosk-modus-aktivieren/

---

## Autostart-Konfiguration

Die Autostart-Konfiguration erfolgt &uuml;ber die LXDE-Autostart-Datei.

### Autostart-Datei bearbeiten

Terminal &ouml;ffnen und folgenden Befehl ausf&uuml;hren:

```bash
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

Nach Eingabe des Benutzerpassworts den folgenden Inhalt einf&uuml;gen oder erg&auml;nzen:

```ini
# Thunderbird in den Autostart
@thunderbird

# Chromium im Kiosk-Modus starten
@chromium-browser https://127.0.0.1/ --start-fullscreen --noerrdialogs --no-first-run
```

Datei speichern und den Editor schließen.

---

## Beschreibung der Anwendungen

### Thunderbird

Thunderbird wird automatisch gestartet, um:

- eingehende Alarm-Faxe zu empfangen
- E-Mail-Filter auszuf&uuml;hren
- Anh&auml;nge f&uuml;r die weitere Verarbeitung bereitzustellen

---

### Chromium (Dashboard)

Chromium wird im **Vollbild- bzw. Kiosk-Modus** gestartet und ruft automatisch die lokale Adresse des Einsatzmonitors
auf:

```
https://127.0.0.1/
```

Dadurch steht das Dashboard nach dem Booten sofort zur Verf&uuml;gung.

---

## Hinweis

Nach einem Neustart des Systems sollten beide Anwendungen automatisch gestartet werden.  
Ein manueller Eingriff ist nicht mehr erforderlich.
