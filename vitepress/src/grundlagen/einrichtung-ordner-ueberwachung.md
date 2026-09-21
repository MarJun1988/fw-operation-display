---
title: Einrichtung und Konfiguration der Ordner&uuml;berwachung mit systemd
search:
  keywords:
    - systemd
    - Ordner&uuml;berwachung
    - Service
    - Fax
    - Druck
    - Grundlagen
---

# Einrichtung und Konfiguration der Ordner&uuml;berwachung mit systemd

In diesem Abschnitt wird beschrieben, wie mithilfe von **systemd** eine Ordner&uuml;berwachung eingerichtet wird, um
beim Eingang neuer Fax-Dateien automatisch ein Skript auszuf&uuml;hren.

Diese L&ouml;sung wird verwendet, um eingehende **Alarm-Faxe** automatisch zu verarbeiten und auszudrucken.

---

## Weiterf&uuml;hrende Informationen

Eine ausf&uuml;hrliche und allgemeine Einf&uuml;hrung in systemd-Services und -Paths ist unter folgendem Link zu finden:

https://www.howtoforge.com/securing-your-ispconfig-3-managed-mailserver-with-a-valid-lets-encrypt-certificate/

---

## Schritt-f&uuml;r-Schritt-Anleitung

### 1. Service-Datei anlegen

Terminal &ouml;ffnen und folgenden Befehl ausf&uuml;hren:

```bash
sudo nano /etc/systemd/system/print-alert-fax.service
```

Nach Eingabe des Benutzerpassworts folgenden Inhalt einf&uuml;gen:

```ini
[Unit]
Description=Run Script when a new File is Created

[Service]
ExecStart=/home/feuerwehr-niederwiesa/Print-Alert-Fax/Scripts/action-incoming-mail.sh
```

Datei speichern und Editor schließen.

---

### 2. Path-Datei anlegen

Nun wird die &Uuml;berwachung des Eingangsordners eingerichtet:

```bash
sudo nano /etc/systemd/system/print-alert-fax.path
```

Folgenden Inhalt einf&uuml;gen:

```ini
[Unit]
Description=Print the Incoming Fax from the Alert Center

[Path]
PathModified=/home/feuerwehr-niederwiesa/Print-Alert-Fax/Incoming-Alert-Fax
Unit=print-alert-fax.service

[Install]
WantedBy=multi-user.target
```

Datei speichern und Editor schließen.

---

## 3. Service starten und aktivieren

### Service neu starten

```bash
sudo systemctl restart print-alert-fax.path
```

### Automatischen Start beim Boot aktivieren

```bash
sudo systemctl enable print-alert-fax.path
```

---

## Ergebnis

Ab sofort &uuml;berwacht systemd den Ordner f&uuml;r eingehende Alarm-Faxe.
Sobald eine neue Datei erkannt wird, wird automatisch das hinterlegte Skript ausgef&uuml;hrt und das Fax verarbeitet.

Damit ist die Ordner&uuml;berwachung erfolgreich eingerichtet.
