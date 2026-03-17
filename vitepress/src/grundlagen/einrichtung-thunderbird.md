---
title: Einrichtung und Konfiguration des Mail-Clients Thunderbird
search:
  keywords:
    - Thunderbird
    - Mail
    - Fax
    - Filtaquilla
    - Alarmfax
    - Grundlagen
---

# Einrichtung und Konfiguration des Mail-Clients Thunderbird

Dieser Abschnitt beschreibt die **Einrichtung und Konfiguration des Mail-Clients Thunderbird**, um eingehende *
*Alarm-Faxe automatisch zu verarbeiten und auszudrucken**.

---

## Installation des Plugins „Filtaquilla“

F&uuml;r die gew&uuml;nschte Funktionalit&auml;t wird das Thunderbird-Plugin **Filtaquilla** ben&ouml;tigt.

Dieses Plugin erweitert Thunderbird um zus&auml;tzliche Filteraktionen, unter anderem:

- externe Dateien oder Skripte ausf&uuml;hren
- Benachrichtigungen unterdr&uuml;cken
- E-Mails als gelesen oder ungelesen markieren
- Anh&auml;nge automatisiert verarbeiten
- Betreff oder Inhalte anpassen

### Download

https://addons.thunderbird.net/de/thunderbird/addon/filtaquilla/

---

## Ersteinrichtung von Thunderbird

1. Thunderbird starten
2. Die **Schritt-f&uuml;r-Schritt-Ersteinrichtung** durchf&uuml;hren (E-Mail-Konto einrichten)
3. Nach Abschluss der Einrichtung fortfahren

---

## Installation des Plugins „Filtaquilla“

1. Men&uuml; &ouml;ffnen (**drei Striche**)
2. **Add-ons und Themes** ausw&auml;hlen
3. Klick auf das **Zahnrad**
4. **Add-on aus Datei installieren**
5. Die zuvor heruntergeladene Datei des Plugins **Filtaquilla** ausw&auml;hlen

---

## Vorbereitung der Verzeichnisstruktur f&uuml;r Alarm-Faxe

### Verzeichnisse anlegen

```bash
cd ~
mkdir Print-Alert-Fax
cd Print-Alert-Fax
mkdir Printed-Alert-Fax
mkdir Incoming-Alert-Fax
mkdir Logs
mkdir Scripts
cd Scripts
```

---

## Erstellung des Druck-Skripts

### Visual Studio Code &ouml;ffnen

```bash
code .
```

### Skript anlegen

Datei: `action-incoming-mail.sh`

```sh
#!/bin/sh

#############
# Autor:       Marcel Junghans
# Feuerwehr:   Fw-Niederwiesa
#############

defaultFolderIncoming="/home/NAME-DES-USERS/Print-Alert-Fax/Incoming-Alert-Fax/"
defaultFolderPrinted="/home/NAME-DES-USERS/Print-Alert-Fax/Printed-Alert-Fax/"
defaultFolderLogs="/home/NAME-DES-USERS/Print-Alert-Fax/Logs/"

defaultQuantityOfSites=1
defaultPrinterName="Brother_HL_2030_series_printServer"
defaultTimeDelay=5

lastFileName=$(find $defaultFolderIncoming -newermt "1 min ago" -name "*.pdf")

ping 127.0.0.1 -w $defaultTimeDelay

lp -d $defaultPrinterName -n $defaultQuantityOfSites $lastFileName >> $defaultFolderLogs/Lp-Log-File.txt

echo "Folgende Datei wurde ausgedruckt: $lastFileName" >> $defaultFolderLogs/Log-File.txt

mv $lastFileName $defaultFolderPrinted
```

---

## Skript ausf&uuml;hrbar machen

```bash
chmod +x /home/NAME-DES-USERS/Print-Alert-Fax/Scripts/action-incoming-mail.sh
```

---

## Erstellen eines E-Mail-Filters in Thunderbird

1. Men&uuml; &ouml;ffnen (**drei Striche**)
2. **Extras**
3. **Filter**
4. **Neuer Filter**
5. Filtername frei w&auml;hlen

### Bedingungen

- Absender: FRITZ!Box
- Betreff: Fax

### Aktion

- **Anh&auml;nge speichern unter**
- Zielordner:
  ```
  /home/NAME-DES-USERS/Print-Alert-Fax/Incoming-Alert-Fax/
  ```

---

## Ergebnis

Eingehende Alarm-Faxe werden automatisch gespeichert, gedruckt und archiviert.
