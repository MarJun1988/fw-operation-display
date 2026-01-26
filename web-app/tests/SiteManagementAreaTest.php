<?php

namespace App\Tests;

use Exception;
use Symfony\Component\Panther\PantherTestCase;
use Symfony\Contracts\Translation\TranslatorInterface;

class SiteManagementAreaTest extends PantherTestCase
{

    private TranslatorInterface $translator;

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
        $client = static::createPantherClient();

        // Besuche die Website
        $client->request('GET', '/management-area');

        $title = $this->translator->trans('generals.siteTitleShort') . " - " . $this->translator->trans('menus.mainMenu.managementArea.children.groundSettings.label');
        // Kontrolle des Seitentitels
        self::assertPageTitleContains($title);
    }

}
