<?php
declare(strict_types=1);

namespace App\Tests;

use Exception;
use Symfony\Component\Panther\Client;
use Symfony\Component\Panther\PantherTestCase;
use Symfony\Component\Panther\PantherTestCaseTrait;
use Symfony\Contracts\Translation\TranslatorInterface;

class SiteDisplayRaspberryPiTest extends PantherTestCase
{

    private TranslatorInterface $translator;


    /**
     * @param array $options see {@see $defaultOptions}
     * @param array $kernelOptions
     * @param array $managerOptions
     * @return Client
     */
    protected static function createPantherClient(array $options = [], array $kernelOptions = [], array $managerOptions = []): Client
    {
        $options['webServerHost'] = '127.0.0.1'; // Ersetzen Sie durch die IP-Adresse Ihres Vue.js-Containers
        $options['webServerPort'] = 1234; // Ersetzen Sie durch den Port Ihrer Vue.js-Anwendung

        return parent::createPantherClient($options, $kernelOptions, $managerOptions);
    }

    /**
     * @throws Exception
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Den Translator aus dem Service-Container abrufen
        $this->translator = self::getContainer()->get(TranslatorInterface::class);
    }

    public function testSiteTitle(): void
    {
        // Erstellung des Clients
        $client = self::createPantherClient();

        // Besuche die Website
        $client->request('GET', '/display-raspberry-pi');

        // Texte aus der Translation
        $title = $this->translator->trans('generals.siteTitleShort') . " - " . $this->translator->trans('menus.mainMenu.displayRaspberryPi.label');

        // Kontrolle des Seitentitels
        self::assertPageTitleContains($title);
    }

    public function testCheckHeadlineCome(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(0)->text();

        // Texte aus der Translation
        $text = $this->translator->trans('sites.diveraMonitor.come');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testCheckHeadlineDoNotCome(): void
    {
        // Erstellung des Clients
        $client = self::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(1)->text();

        // Texte aus der Translation
        $text = $this->translator->trans('sites.diveraMonitor.doNotCome');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testCheckHeadlineComeTenMinutesLater(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(2)->text();

        $text = $this->translator->trans('sites.diveraMonitor.comeTenMinutesLater');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testCheckHeadlineAlertMessage(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(3)->text();

        $text = $this->translator->trans('sites.displayView.alertMessage');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testCheckHeadlinePlaceOfUse(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(4)->text();

        $text = $this->translator->trans('sites.displayView.placeOfUse');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testCheckHeadlineMessage(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $pageContent = $crawler->filter('h2')->eq(5)->text();

        $text = $this->translator->trans('sites.displayView.messages');

        // Kontrolle des Inhaltes
        self::assertEquals($text, $pageContent);
    }

    public function testGoToManagementAreaMessage(): void
    {
        // Erstellung des Clients
        $client = static::createPantherClient();
        // Neu Starten des Clients
        $client->restart();

        // Besuche eine Webseite
        $crawler = $client->request('GET', '/display-raspberry-pi');

        // Greife auf den Seiteninhalt zu
        $crawler->filter('h2')->eq(5)->click();

        $title = $this->translator->trans('generals.siteTitleShort') . " - " . $this->translator->trans('menus.mainMenu.managementArea.children.messages.label');

        // Kontrolle des Seitentitels
        self::assertPageTitleContains($title);
    }
}
